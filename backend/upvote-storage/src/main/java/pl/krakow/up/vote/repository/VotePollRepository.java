package pl.krakow.up.vote.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.model.VotePoll;

@Repository
public interface VotePollRepository extends CrudRepository<VotePoll, Long> {
}
