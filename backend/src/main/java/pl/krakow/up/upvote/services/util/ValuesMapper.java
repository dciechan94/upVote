package pl.krakow.up.upvote.services.util;

import pl.krakow.up.upvote.core.model.User;

public class ValuesMapper {

    public static final User USER_DATA_FILLER(User originUser, User updatedUser) {
        originUser.setUserName(updatedUser.getUserName());
        originUser.setEmail(updatedUser.getEmail());
        originUser.setPasswordHash(updatedUser.getPasswordHash());
        originUser.setFirstName(updatedUser.getFirstName());
        originUser.setLastName(updatedUser.getLastName());

        return originUser;
    }
}
