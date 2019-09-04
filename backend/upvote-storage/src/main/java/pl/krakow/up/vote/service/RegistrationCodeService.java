package pl.krakow.up.vote.service;

import java.util.List;
import java.util.Optional;

import pl.krakow.up.vote.model.RegistrationCode;

public interface RegistrationCodeService {

    Optional<RegistrationCode> findByCode(String code);

    List<RegistrationCode> findAll();
    Long create(int validDays);
    RegistrationCode findById(Long id);
    void deleteById(Long id);
}