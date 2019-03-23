package pl.krakow.up.upvote.core.model.dao;

import org.springframework.security.core.userdetails.UserDetailsService;
import pl.krakow.up.upvote.core.model.Role;
import pl.krakow.up.upvote.core.model.User;

public interface UserDAO extends GenericDAO<User, Long>, UserDetailsService {
    //User getUserByEmail(String email);

    User findByEmail(String email);

    void remove(Long id);
    void removeAll();

    void addRole(User user, Role role);
}