package pl.krakow.up.vote.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.model.User;

import java.util.Optional;

@Repository
public interface RegistrationCodeRepository extends CrudRepository<RegistrationCode, Long> {

    Optional<RegistrationCode> findByCode(String code);
}
