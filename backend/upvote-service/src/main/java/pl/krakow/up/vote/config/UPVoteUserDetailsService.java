package pl.krakow.up.vote.config;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.repository.UserRepository;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Component
@Primary
public class UPVoteUserDetailsService implements UserDetailsService {

    @NonNull
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String emailOrLogin) throws UsernameNotFoundException {
        log.info("Authentication attempt for {}", emailOrLogin);
        UserDetails userDetails = null;
        Optional<User> user = userRepository.findByLoginOrEmail(emailOrLogin, emailOrLogin);

        if (user.isPresent()) {
            log.info("Authentication attempt for {} - valid user email/login", emailOrLogin);
            userDetails = new UPVoteUserDetails(user.get());
        } else {
            log.info("Authentication attempt for {} - user entry not found", emailOrLogin);
            throw new UsernameNotFoundException("User with credential: " + emailOrLogin + " not found.");
        }
        return userDetails;
    }
}


