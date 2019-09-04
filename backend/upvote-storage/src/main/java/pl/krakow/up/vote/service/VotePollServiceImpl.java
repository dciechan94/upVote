package pl.krakow.up.vote.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.model.Vote;
import pl.krakow.up.vote.model.VotePoll;
import pl.krakow.up.vote.repository.UserRepository;
import pl.krakow.up.vote.repository.VotePollRepository;
import pl.krakow.up.vote.repository.VoteRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VotePollServiceImpl implements VotePollService {

    @Autowired
    private VotePollRepository votePollRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Override
    public List<VotePoll> findAll() {
        List<VotePoll> result = new ArrayList<>();
        for (VotePoll poll : votePollRepository.findAll()) {
            result.add(poll);
        }
        return result;
    }

    @Override
    public Long create(VotePoll poll) {
        return votePollRepository.save(poll).getId();
    }

    @Override
    public VotePoll findById(Long id) {
        Optional<VotePoll> pollOptional = votePollRepository.findById(id);
        return pollOptional.isPresent() ? pollOptional.get() : null;
    }

    @Override
    public void deleteById(Long id) {
        votePollRepository.deleteById(id);
    }

    @Override
    public Long edit(VotePoll votePoll) {
        Optional<VotePoll> originalPollOpt = votePollRepository.findById(votePoll.getId());
        if (!originalPollOpt.isPresent()) {
            throw new RuntimeException("Vote does not exist");
        }

        VotePoll originalPoll = originalPollOpt.get();
        Date now = new Date();

        if (!now.before(originalPoll.getVoteStartDate())) {
            throw new RuntimeException("Vote poll cannot be edited after start date");
        }

        originalPoll.setModified(now);
        originalPoll.setModifier(votePoll.getModifier());
        originalPoll.setName(votePoll.getName());
        originalPoll.setDescription(votePoll.getDescription());
        originalPoll.setVoteStartDate(votePoll.getVoteStartDate());
        originalPoll.setVoteEndDate(votePoll.getVoteEndDate());
        originalPoll.setPublishResultDate(votePoll.getPublishResultDate());
        originalPoll.setCandidates(votePoll.getCandidates());

        VotePoll edited = votePollRepository.save(originalPoll);
        return edited.getId();
    }

    @Override
    public Long vote(Vote vote) {

        Date now = new Date();
        Date startVoting = vote.getParentVotePoll().getVoteStartDate();
        Date endVoting = vote.getParentVotePoll().getVoteEndDate();

        if (now.before(startVoting) || now.after(endVoting)) {
            throw new RuntimeException("Vote cannot be submitted right now");
        }

        Optional<Vote> existingVote = voteRepository.findByVoter_idAndParentVotePoll_id(vote.getVoter().getId(),
                vote.getParentVotePoll().getId());

        if (existingVote.isPresent()) {
            throw new RuntimeException("User already voted");
        }

        return voteRepository.save(vote).getId();
    }

}
