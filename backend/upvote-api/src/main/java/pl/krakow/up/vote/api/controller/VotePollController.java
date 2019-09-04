package pl.krakow.up.vote.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.api.model.VoteDTO;
import pl.krakow.up.vote.api.model.VotePollDTO;
import pl.krakow.up.vote.api.model.converter.Converter;
import pl.krakow.up.vote.api.reflections.ReflectionManager;
import pl.krakow.up.vote.api.util.APIAuthorizationUtils;
import pl.krakow.up.vote.api.util.APIUtils;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.model.VotePoll;
import pl.krakow.up.vote.repository.UserRepository;
import pl.krakow.up.vote.service.VotePollService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/polls")
@Api(value = "CRUD for polls")
public class VotePollController {

    @Autowired
    private VotePollService votePollService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReflectionManager refManager;

    @Autowired
    private APIAuthorizationUtils authUtils;

    @Autowired
    private Converter converter;

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<VotePollDTO> getPollById(@PathVariable Long id, Principal principal) {

        VotePoll poll = votePollService.findById(id);
        if (poll == null) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Entity not found");
        }

        Date now = new Date();
        if(now.before(poll.getVoteStartDate()) && !authUtils.hasAdministratorRole(principal) ) {
            poll.setCandidates(new ArrayList<>());
        }

        return ResponseEntity.ok(converter.toApiObject(poll));
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Long> createVotePoll(@RequestBody VotePollDTO votePollDTO, Principal principal) {
        log.debug("POST /polls, body={}", votePollDTO);

        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        try {
            Long pollId = votePollService.create(converter.toModelObject(votePollDTO));
            return ResponseEntity.ok(pollId);
        } catch (Exception e) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Long> editVotePoll(@PathVariable Long id, @RequestBody VotePollDTO votePollDTO, Principal principal) {
        log.debug("PUT /polls/{}, body={}", votePollDTO);

        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        votePollDTO.setId(id);

        try {
            Long pollId = votePollService.edit(converter.toModelObject(votePollDTO));
            return ResponseEntity.ok(pollId);
        } catch (Exception e) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
        log.debug("DELETE /polls/{}", id);

        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        try {
            votePollService.deleteById(id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(e.getMessage());
        }
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<VotePollDTO>> getPolls(Principal principal) {
        List<VotePollDTO> pollsDto = new ArrayList<>();

        votePollService.findAll().forEach(poll -> pollsDto.add(converter.toApiObject(poll)));

        return ResponseEntity.ok(pollsDto);
    }

    @PostMapping(value = "/{id}/votes/", consumes = "application/json", produces = "application/json")
    public ResponseEntity saveVote(@PathVariable Long id, @RequestBody VoteDTO voteDTO, Principal principal) {
        log.debug("POST /polls/{}/votes/, body={}", id, voteDTO);

        try {
            Optional<User> sessionUser = userRepository.findByLoginOrEmail(principal.getName(), principal.getName());
            if (!sessionUser.isPresent()) {
                throw new RuntimeException("Current user not found");
            }
            voteDTO.setVoter(sessionUser.get().getId());

            Long voteId = votePollService.vote(converter.toModelObject(voteDTO));
            return ResponseEntity.ok(voteId);
        } catch (Exception e) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
