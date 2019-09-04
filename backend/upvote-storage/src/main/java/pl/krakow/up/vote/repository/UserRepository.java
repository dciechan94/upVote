package pl.krakow.up.vote.repository;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;
import pl.krakow.up.vote.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByLogin(String login);
    Optional<User> findByLoginOrEmail(String login, String email);
}
