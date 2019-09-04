package pl.krakow.up.vote.api.model.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.krakow.up.vote.api.model.CoreObject;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.api.model.VotePollDTO;
import pl.krakow.up.vote.model.AbstractObject;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.model.Vote;
import pl.krakow.up.vote.model.VotePoll;
import pl.krakow.up.vote.repository.RoleRepository;
import pl.krakow.up.vote.repository.UserRepository;
import pl.krakow.up.vote.repository.VoteRepository;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ApiVotePollConverter extends ApiBasicConverter
        implements ApiObjectConverter<VotePollDTO, VotePoll> {

    public final static String CONTROLLER_URL = "/polls";

    @Autowired
    GenericConverter converter;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Override
    public VotePollDTO toApiObject(VotePoll modelEntity, Map<Long, CoreObject> internalApiCache) {

        VotePollDTO votePollDto = new VotePollDTO();
        copyBasicProperties(modelEntity, votePollDto);
        votePollDto.setName(modelEntity.getName());
        votePollDto.setDescription(modelEntity.getDescription());
        votePollDto.setStartDate(modelEntity.getVoteStartDate().getTime());
        votePollDto.setEndDate(modelEntity.getVoteEndDate().getTime());

        Date publishDate = modelEntity.getPublishResultDate();
        votePollDto.setPublishDate(publishDate.getTime());

        List<UserDTO> candidates = modelEntity.getCandidates().stream().map(entity -> {
            UserDTO dto = new UserDTO();
            dto.setId(entity.getId());
            dto.setFirstName(entity.getFirstName());
            dto.setLastName(entity.getLastName());
            dto.setEmail(entity.getEmail());
            return dto;
        }).collect(Collectors.toList());
        votePollDto.setCandidates(candidates);

        Date now = new Date();
        if (now.after(publishDate)) {
            Map<Long, Long> candidateToVotes = new HashMap<>();
            candidates.forEach(candidate -> candidateToVotes.put(candidate.getId(), Long.valueOf(0)));
            List<Vote> votes = voteRepository.findByParentVotePoll_id(modelEntity.getId());
            votes.forEach(vote -> {
                Long candidateId = vote.getVoteOption().getId();
                if (!candidateToVotes.containsKey(candidateId)) {
                    throw new RuntimeException("Invalid state - vote assigned for user who is not a candidate");
                }
                Long actualValue = candidateToVotes.get(candidateId);
                candidateToVotes.put(candidateId, Long.sum(actualValue, 1));
            });
            votePollDto.setResults(candidateToVotes);
        }

        internalApiCache.put(votePollDto.getId(), votePollDto);
        return votePollDto;
    }

    @Override
    public VotePoll toModelObject(VotePollDTO apiEntity,
                              Map<Long, AbstractObject> internalModelCache) {
        VotePoll votePoll = new VotePoll();
        copyBasicProperties(apiEntity, votePoll);

        votePoll.setName(apiEntity.getName());
        votePoll.setDescription(apiEntity.getDescription());
        votePoll.setVoteStartDate(new Date(apiEntity.getStartDate()));
        votePoll.setVoteEndDate(new Date(apiEntity.getEndDate()));
        votePoll.setPublishResultDate(new Date(apiEntity.getPublishDate()));

        List<User> candidates = apiEntity.getCandidates().stream().map(api -> {
            if (api.getId() == null) {
                throw new RuntimeException("Candidate id not populated.");
            }
            Optional<User> optUser = userRepository.findById(api.getId());

            if (!optUser.isPresent()) {
                throw new RuntimeException("Candidate with id " + api.getId() + " not found.");
            }
            return optUser.get();
        }).collect(Collectors.toList());
        votePoll.setCandidates(candidates);

        internalModelCache.put(votePoll.getId(), votePoll);
        return votePoll;
    }

    @Override
    public URI getBaseUri() {
        ServletUriComponentsBuilder servletUriComponentsBuilder = ServletUriComponentsBuilder.fromCurrentContextPath();
        return servletUriComponentsBuilder.path(CONTROLLER_URL).build().toUri();
    }

}
