package pl.krakow.up.vote.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.krakow.up.vote.model.Role;
import pl.krakow.up.vote.model.User;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(String name);
}
