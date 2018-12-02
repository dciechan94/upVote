package pl.krakow.up.upvote.rest.v1.model.util;


import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.VoteOption;
import pl.krakow.up.upvote.core.model.VotePoll;
import pl.krakow.up.upvote.rest.v1.model.dto.UserDTO;
import pl.krakow.up.upvote.rest.v1.model.dto.VoteOptionDTO;
import pl.krakow.up.upvote.rest.v1.model.dto.VotePollDTO;

import java.time.Instant;
import java.util.ArrayList;
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
        UserDTO userDto = new UserDTO();

        userDto.setId(user.getId());
        userDto.setUsername(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRoles(user.getRoles().stream().map(role -> role.getName()).collect(Collectors.toList()));

        return userDto;
    }

    public static final VotePoll VOTE_POLL_FROM_DTO_MAPPER(VotePollDTO votePollDto) {
        VotePoll votePoll = new VotePoll();

        votePoll.setName(votePollDto.getName());
        votePoll.setShortDescription(votePollDto.getShortDescription());
        votePoll.setLongDescription(votePollDto.getLongDescription());
        //votePoll.setCreator();
        votePoll.setCreationDate(Instant.now());
        votePoll.setPublishDate(Instant.ofEpochSecond(votePollDto.getPublishDate()));
        votePoll.setStartVotingDate(Instant.ofEpochSecond(votePollDto.getStartVotingDate()));
        votePoll.setFinishVotingDate(Instant.ofEpochSecond(votePollDto.getFinishVotingDate()));
        votePoll.setResultDate(Instant.ofEpochSecond(votePollDto.getResultDate()));

        List<VoteOption> voteOptions = new ArrayList<>();
        for(VoteOptionDTO voteOptionDTO : votePollDto.getOptions()) {
            VoteOption voteOption = new VoteOption();
            voteOption.setName(voteOptionDTO.getName());
            voteOptions.add(voteOption);
        }
        votePoll.setVoteOptions(voteOptions);

        return votePoll;
    }

    public static final VotePollDTO VOTE_POLL_TO_DTO_MAPPER(VotePoll votePoll) {
        VotePollDTO votePollDto = new VotePollDTO();

        votePollDto.setId(votePoll.getId());
        votePollDto.setName(votePoll.getName());
        votePollDto.setShortDescription(votePoll.getShortDescription());
        votePollDto.setLongDescription(votePoll.getLongDescription());
        //votePoll.setCreator();
        votePollDto.setCreationDate(votePoll.getCreationDate().getEpochSecond());
        votePollDto.setPublishDate(votePoll.getPublishDate().getEpochSecond());
        votePollDto.setStartVotingDate(votePoll.getStartVotingDate().getEpochSecond());
        votePollDto.setFinishVotingDate(votePoll.getFinishVotingDate().getEpochSecond());
        votePollDto.setResultDate(votePoll.getResultDate().getEpochSecond());

        List<VoteOptionDTO> voteOptionDtos = new ArrayList<>();
        for(VoteOption voteOption : votePoll.getVoteOptions()) {
            VoteOptionDTO voteOptionDto = new VoteOptionDTO();
            voteOptionDto.setId(voteOption.getId());
            voteOptionDto.setName(voteOption.getName());
            voteOptionDtos.add(voteOptionDto);
        }
        votePollDto.setOptions(voteOptionDtos);

        return votePollDto;
    }
}
