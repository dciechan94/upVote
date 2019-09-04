package pl.krakow.up.vote.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.model.VotePoll;
import pl.krakow.up.vote.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        List<User> result = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            result.add(user);
        }
        return result;
    }

    @Override
    public Long create(User user, RegistrationCode code) {
        Optional<User> alreadyExisting = userRepository.findByLoginOrEmail(user.getLogin(), user.getEmail());
        if (alreadyExisting.isPresent()) {
            throw new RuntimeException("User already exists: " + user.getLogin() + " " + user.getEmail());
        }

        return userRepository.save(user).getId();
    }

    @Override
    public User findById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.isPresent() ? userOptional.get() : null;
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Long edit(User user) {
        Optional<User> originalUserOpt = userRepository.findById(user.getId());
        if (!originalUserOpt.isPresent()) {
            throw new RuntimeException("User does not exist");
        }
        User originalUser = originalUserOpt.get();

        user.setEmail(originalUser.getEmail());

        if (user.getLogin() == null || user.getLogin().isEmpty()) {
            user.setLogin(originalUser.getLogin());
        }

        if (user.getPasswordHash() == null || user.getPasswordHash().isEmpty()) {
            user.setPasswordHash(originalUser.getPasswordHash());
        }

        user.setCreated(originalUser.getCreated());
        user.setCreator(originalUser.getCreator());
        user.setRoles(originalUser.getRoles());
        user.setCandidateInPolls(originalUser.getCandidateInPolls());
        user.setMadeVotes(originalUser.getMadeVotes());
        user.setReceivedVotes(originalUser.getReceivedVotes());

        User edited = userRepository.save(user);
        return edited.getId();
    }

    @Override
    public User findByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.isPresent() ? userOptional.get() : null;
    }
}
