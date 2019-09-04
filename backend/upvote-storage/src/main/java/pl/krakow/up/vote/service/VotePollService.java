package pl.krakow.up.vote.service;

import pl.krakow.up.vote.model.Vote;
import pl.krakow.up.vote.model.VotePoll;

import java.util.List;

public interface VotePollService {

    List<VotePoll> findAll();
    Long create(VotePoll votePoll);
    VotePoll findById(Long id);
    void deleteById(Long id);
    Long edit(VotePoll votePoll);

    Long vote(Vote vote);
}