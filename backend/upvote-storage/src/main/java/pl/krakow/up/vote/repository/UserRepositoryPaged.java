package pl.krakow.up.vote.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import org.springframework.stereotype.Repository;
import pl.krakow.up.vote.model.User;

@Repository
public interface UserRepositoryPaged extends PagingAndSortingRepository<User, Long> {
}
