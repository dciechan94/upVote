package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.User;

public interface UserDAO extends GenericDAO<User, Long> {
    //User getUserByEmail(String email);

    User findByEmail(String email);
}