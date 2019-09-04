package pl.krakow.up.vote.service;

import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();
    Long create(User user, RegistrationCode code);
    User findById(Long id);
    User findByEmail(String email);
    void deleteById(Long id);
    Long edit(User user);
}