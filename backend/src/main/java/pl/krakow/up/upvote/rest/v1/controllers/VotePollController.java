package pl.krakow.up.upvote.rest.v1.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.Vote;
import pl.krakow.up.upvote.core.model.VotePoll;
import pl.krakow.up.upvote.core.model.exceptions.ServiceRuntimeException;
import pl.krakow.up.upvote.rest.util.APIUtils;
import pl.krakow.up.upvote.rest.v1.model.dto.VotePollDTO;
import pl.krakow.up.upvote.rest.v1.model.util.Mappers;
import pl.krakow.up.upvote.services.PermissionService;
import pl.krakow.up.upvote.services.UserManagementService;
import pl.krakow.up.upvote.services.VotePollManagementService;
import pl.krakow.up.upvote.services.util.VotePollUtil;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping(value = "/polls")
public class VotePollController {

    private static final Logger LOGGER = LogManager.getLogger(VotePollController.class);

    @Autowired
    private VotePollManagementService votePollManagementService;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private UserManagementService userService;


    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity createVotePoll(
            @RequestBody VotePollDTO votePollDto,
            Principal principal) {
        LOGGER.debug("POST /polls body={}", votePollDto);

        if (!permissionService.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        User currentUser = userService.findUser(principal.getName());
        if (currentUser == null) {
            return APIUtils.createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Fail");
        }

        VotePoll votePoll = Mappers.VOTE_POLL_FROM_DTO_MAPPER(votePollDto);
        votePoll.setCreatedBy(currentUser);

        try {
            Long id = votePollManagementService.createVotePoll(votePoll);
            return ResponseEntity.ok().body(id);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to create vote poll: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot create vote poll", e.getErrorCodes());
        }

    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity deleteVotePoll(
            @PathVariable(name = "id", required = true) Long id,
            Principal principal) {
        LOGGER.debug("DELETE /polls/{}", id);

        if (!permissionService.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        try {
            votePollManagementService.deleteVotePoll(id);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to delete vote poll: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot delete vote poll", e.getErrorCodes());
        }
        return ResponseEntity.ok().body(null);
    }

//    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
//    @ResponseBody
//    public ResponseEntity updateVotePoll(
//            @PathVariable(name = "id", required = false) Long id,
//            @RequestBody VotePollDTO votePollDto) {
//
//        try {
//            VotePoll updatedVotePoll = Mappers.VOTE_POLL_FROM_DTO_MAPPER(votePollDto);
//            votePollManagementService.updateVotePoll(id, updatedVotePoll);
//        } catch (ServiceRuntimeException e) {
//            LOGGER.error("Failed to update vote poll: {}", e.getCustomMessage(), e);
//            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot update vote poll", e.getErrorCodes());
//        }
//
//        return ResponseEntity.ok().body(null);
//    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getVotePoll(
            @PathVariable(name = "id") Long id,
            Principal principal) {

        VotePollDTO votePollDto = null;
        try {
            VotePoll votePoll = votePollManagementService.findVotePoll(id);
            if (votePoll == null) {
                return APIUtils.createErrorResponse(HttpStatus.NOT_FOUND, "Resource does not exist");
            }

            if (!canViewPoll(votePoll, principal)) {
                return APIUtils.createErrorResponse(HttpStatus.NOT_FOUND, "Resource does not exist");
            }

            votePollDto = Mappers.VOTE_POLL_TO_DTO_MAPPER(votePoll);

            Map<String, Object> metadata = new HashMap<>();
            if (permissionService.hasAdministratorRole(principal)) {
                if(VotePollUtil.isDuringVotingPhase(votePoll) || VotePollUtil.isVotePublished(votePoll)) {
                    metadata.put("editable", false);
                } else {
                    metadata.put("editable", true);
                }
                metadata.put("deletable", true);
            } else {
                metadata.put("editable", false);
                metadata.put("deletable", false);
            }
            votePollDto.setMetadata(metadata);

            if(VotePollUtil.isVotePublished(votePoll)) {
                Map<String, Object> results = new HashMap<>();

                Map<String, Object> data = new HashMap<>();

                Map<Long, List<Vote>> votes = votePollManagementService.getVotesForVoteables(votePoll.getVoteables());
                for(Long voteableId: votes.keySet()) {
                    data.put(voteableId.toString(), votes.get(voteableId).size());
                }
                results.put("data", data);

                votePollDto.setRestults(results);
            }

        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to get vote poll: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot get vote poll", e.getErrorCodes());
        }

        return ResponseEntity.ok().body(votePollDto);
    }

//    @RequestMapping(path = "/{id}/votes/{optionId}", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity voteOn(
//            @PathVariable(name = "id") Long id,
//            @PathVariable(name = "optionId") Long optionId,
//            Principal principal) {
//        try {
//            VotePoll votePoll = votePollManagementService.findVotePoll(id);
//            if(votePoll == null) {
//                return APIUtils.createErrorResponse(HttpStatus.NOT_FOUND, "Resource does not exist");
//            }
//
//            List<Voteable> voteOptions = votePoll.getVoteables().stream()
//                    .filter(option -> option.getId().equals(optionId))
//                    .collect(Collectors.toList());
//            if(voteOptions.isEmpty()) {
//                return APIUtils.createErrorResponse(HttpStatus.NOT_FOUND, "Resource does not exist");
//            }
//
//
//
//            List<User> votedBy = voteOptions.get(0).getVotedBy();
//            List<User> filtered = votedBy.stream()
//                    .filter(user -> user.getEmail().equals(principal))
//                    .collect(Collectors.toList());
//            if (!filtered.isEmpty()) {
//                return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Already voted");
//            }
//
//            User currentUser = userService.findUser(principal.getName());
//            if(currentUser == null) {
//                return APIUtils.createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Fail");
//            }
//            votedBy.add(currentUser);
//
//        } catch (ServiceRuntimeException e) {
//            LOGGER.error("Failed to get vote poll: {}", e.getCustomMessage(), e);
//            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot get vote poll", e.getErrorCodes());
//        }
//
//        return ResponseEntity.ok().body(null);
//    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getVotePolls(@RequestParam(value = "archived", defaultValue = "false") String archivedStr,
                                       @RequestParam(value = "actual", defaultValue = "false") String actualStr,
                                       Principal principal) {
        List<VotePollDTO> votePollDtos = new ArrayList<>();
        try {
            boolean archivedOnly = Boolean.valueOf(archivedStr);
            boolean actualOnly = Boolean.valueOf(actualStr);

            List<VotePoll> votePolls = votePollManagementService.getVotePolls();
            for (VotePoll votePoll : votePolls) {

                if (!canViewPoll(votePoll, principal)) {
                    continue;
                }

                if (archivedOnly && !VotePollUtil.isVotePollArchived(votePoll)) {
                    continue;
                }
                if (actualOnly && !VotePollUtil.isVotePollActual(votePoll)) {
                    continue;
                }

                VotePollDTO votePollDTO = Mappers.VOTE_POLL_TO_DTO_MAPPER(votePoll, true, false);

                Map<String, Object> metadata = new HashMap<>();
                if (permissionService.hasAdministratorRole(principal)) {
                    metadata.put("editable", true);
                    metadata.put("deletable", true);
                } else {
                    metadata.put("editable", false);
                    metadata.put("deletable", false);
                }
                votePollDTO.setMetadata(metadata);

                votePollDtos.add(votePollDTO);
            }
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to get vote poll: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot get vote poll", e.getErrorCodes());
        }

        return ResponseEntity.ok().body(votePollDtos);
    }

    private boolean canViewPoll(VotePoll poll, Principal principal) {
        return permissionService.hasAdministratorRole(principal) || VotePollUtil.isVotePollAnnounced(poll);
    }
}
