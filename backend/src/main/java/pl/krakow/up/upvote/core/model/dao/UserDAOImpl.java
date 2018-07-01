package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.User;

public class UserDAOImpl extends GenericDAOImpl<User, Long>
        implements UserDAO {

    public UserDAOImpl() {
        super(User.class);
    }

}