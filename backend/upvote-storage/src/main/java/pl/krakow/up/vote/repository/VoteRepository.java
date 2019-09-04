package pl.krakow.up.vote.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.krakow.up.vote.model.Vote;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends CrudRepository<Vote, Long> {

    Optional<Vote> findByVoter_idAndParentVotePoll_id(Long voterId, Long parentVotePollId);
    List<Vote> findByParentVotePoll_id(Long parentVotePollId);
}
