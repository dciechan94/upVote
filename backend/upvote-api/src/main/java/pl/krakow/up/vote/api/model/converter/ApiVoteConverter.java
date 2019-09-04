package pl.krakow.up.vote.api.model.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.krakow.up.vote.api.model.CoreObject;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.api.model.VoteDTO;
import pl.krakow.up.vote.model.AbstractObject;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.model.Vote;
import pl.krakow.up.vote.model.VotePoll;
import pl.krakow.up.vote.repository.RoleRepository;
import pl.krakow.up.vote.repository.UserRepository;
import pl.krakow.up.vote.repository.VotePollRepository;
import pl.krakow.up.vote.repository.VoteRepository;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@Component
public class ApiVoteConverter extends ApiBasicConverter
        implements ApiObjectConverter<VoteDTO, Vote> {

    public final static String CONTROLLER_URL = "/polls/[id]/votes";

    @Autowired
    private VotePollRepository pollRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    GenericConverter converter;

    @Override
    public VoteDTO toApiObject(Vote modelEntity, Map<Long, CoreObject> internalApiCache) {

        VoteDTO voteDto = new VoteDTO();
        copyBasicProperties(modelEntity, voteDto);

        internalApiCache.put(voteDto.getId(), voteDto);
        return voteDto;
    }

    @Override
    public Vote toModelObject(VoteDTO apiEntity,
                              Map<Long, AbstractObject> internalModelCache) {
        Vote vote = new Vote();
        copyBasicProperties(apiEntity, vote);

        Optional<User> targetUser = userRepository.findById(apiEntity.getVoteTargetId());
        if (!targetUser.isPresent()) {
            throw new RuntimeException("User to be voted on not found");
        }

        Optional<VotePoll> parentPoll = pollRepository.findById(apiEntity.getParentPollId());
        if (!parentPoll.isPresent()) {
            throw new RuntimeException("Vote poll for this voting not found");
        }

        Optional<User> voter = userRepository.findById(apiEntity.getVoter());
        if (!voter.isPresent()) {
            throw new RuntimeException("Current user not found");
        }

        vote.setVoter(voter.get());
        vote.setVoteOption(targetUser.get());
        vote.setParentVotePoll(parentPoll.get());

        internalModelCache.put(vote.getId(), vote);
        return vote;
    }

    @Override
    public URI getBaseUri() {
        ServletUriComponentsBuilder servletUriComponentsBuilder = ServletUriComponentsBuilder.fromCurrentContextPath();
        return servletUriComponentsBuilder.path(CONTROLLER_URL).build().toUri();
    }

}
