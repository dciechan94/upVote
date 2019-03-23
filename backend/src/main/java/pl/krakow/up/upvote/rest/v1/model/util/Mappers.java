package pl.krakow.up.upvote.rest.v1.model.util;


import pl.krakow.up.upvote.core.model.RegistrationCode;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.VotePoll;
import pl.krakow.up.upvote.core.model.Voteable;
import pl.krakow.up.upvote.rest.v1.model.dto.CodeDTO;
import pl.krakow.up.upvote.rest.v1.model.dto.UserDTO;
import pl.krakow.up.upvote.rest.v1.model.dto.VotePollDTO;
import pl.krakow.up.upvote.rest.v1.model.dto.VoteableDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class Mappers {

    public static final User USER_FROM_DTO_MAPPER(UserDTO userDto) {
        User user = new User();

        user.setUserName(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPasswordHash(userDto.getPasswordHash());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());

        return user;
    }

    public static final UserDTO USER_TO_DTO_MAPPER(User user) {
        return USER_TO_DTO_MAPPER(user, false);
    }

    public static final UserDTO USER_TO_DTO_MAPPER(User user, boolean presentationOnly) {
        if(user == null) {
            return null;
        }

        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUserName());

        if(!presentationOnly) {
            userDto.setEmail(user.getEmail());
            userDto.setFirstName(user.getFirstName());
            userDto.setLastName(user.getLastName());
            userDto.setRoles(user.getRoles().stream().map(role -> role.getName()).collect(Collectors.toList()));
        }

        return userDto;
    }

    public static final VotePoll VOTE_POLL_FROM_DTO_MAPPER(VotePollDTO votePollDto) {
        VotePoll votePoll = new VotePoll();

        votePoll.setName(votePollDto.getName());
        votePoll.setShortDescription(votePollDto.getShortDescription());
        votePoll.setLongDescription(votePollDto.getLongDescription());

        votePoll.setCreatedBy(Mappers.USER_FROM_DTO_MAPPER(votePollDto.getCreatedBy()));

        votePoll.setCreateDate(new Date(votePollDto.getCreateDate()));
        votePoll.setAnnounceDate(new Date(votePollDto.getAnnounceDate()));
        votePoll.setVoteStartDate(new Date(votePollDto.getVoteStartDate()));
        votePoll.setVoteEndDate(new Date(votePollDto.getVoteEndDate()));
        votePoll.setPublishResultDate(new Date(votePollDto.getPublishResultDate()));

        List<Voteable> voteables = new ArrayList<>();
        //for(VoteableDTO voteableDTO : votePollDto.getVoteables()) {
//            VoteOption voteOption = new VoteOption();
//            voteOption.setName(voteableDTO.getName());
//            voteOptions.add(voteOption);
       // }
        votePoll.setVoteables(voteables);

        return votePoll;
    }

    public static final VotePollDTO VOTE_POLL_TO_DTO_MAPPER(VotePoll votePoll) {
        return VOTE_POLL_TO_DTO_MAPPER(votePoll, false, false);
    }

    public static final VotePollDTO VOTE_POLL_TO_DTO_MAPPER(VotePoll votePoll, boolean presentationOnly, boolean expandReferences) {
        if(votePoll == null) {
            return null;
        }

        VotePollDTO votePollDto = new VotePollDTO();

        votePollDto.setId(votePoll.getId());
        votePollDto.setName(votePoll.getName());
        votePollDto.setShortDescription(votePoll.getShortDescription());

        votePollDto.setCreateDate(votePoll.getCreateDate().getTime());
        votePollDto.setAnnounceDate(votePoll.getAnnounceDate().getTime());
        votePollDto.setVoteStartDate(votePoll.getVoteStartDate().getTime());
        votePollDto.setVoteEndDate(votePoll.getVoteEndDate().getTime());
        votePollDto.setPublishResultDate(votePoll.getPublishResultDate().getTime());

        if(!presentationOnly) {
            votePollDto.setLongDescription(votePoll.getLongDescription());
            votePollDto.setCreatedBy(Mappers.USER_TO_DTO_MAPPER(votePoll.getCreatedBy(), !expandReferences));

            List<VoteableDTO> voteableDtos = new ArrayList<>();
            for(Voteable voteable : votePoll.getVoteables()) {
                //VoteableDTO voteableDto = Mappers.VOTE_POLL_TO_DTO_MAPPER(voteable);
                //voteableDto.setId(voteable.getId());
                //voteableDto.setValue(voteable.getValue());
                //voteableDto.setUserReference(Mappers.USER_TO_DTO_MAPPER(voteable.getUserReference(), !expandReferences));
                voteableDtos.add(Mappers.VOTE_POLL_TO_DTO_MAPPER(voteable));
            }
            votePollDto.setVotables(voteableDtos);

            List<UserDTO> invitedDtos = new ArrayList<>();
            for(User invitedUser : votePoll.getInvitedVoters()) {
                invitedDtos.add(Mappers.USER_TO_DTO_MAPPER(invitedUser, !expandReferences));
            }
            votePollDto.setInvited(invitedDtos);
        }

        return votePollDto;
    }

    public static final VoteableDTO VOTE_POLL_TO_DTO_MAPPER(Voteable voteable) {
        return VOTEABLE_TO_DTO_MAPPER(voteable, false, false);
    }

    public static final VoteableDTO VOTEABLE_TO_DTO_MAPPER(Voteable voteable, boolean presentationOnly, boolean expandReferences) {
        VoteableDTO voteableDto = new VoteableDTO();
        voteableDto.setId(voteable.getId());
        voteableDto.setValue(voteable.getValue());
        voteableDto.setUserReference(Mappers.USER_TO_DTO_MAPPER(voteable.getUserReference(), !expandReferences));
        return voteableDto;
    }

    public static final CodeDTO CODE_TO_DTO_MAPPER(RegistrationCode code) {
        CodeDTO codeDto = new CodeDTO();
        codeDto.setId(code.getId());
        codeDto.setCode(code.getCode());
        codeDto.setValidUntil(code.getValidUntil().getTime());

        return codeDto;
    }
}
