package pl.krakow.up.upvote.services.util;

import pl.krakow.up.upvote.core.model.User;

public class ValuesMapper {

    public static final User USER_DATA_FILLER(User originUser, User updatedUser, boolean overwriteNotNullOnly) {
        if(shouldOverwriteValue(updatedUser.getUserName(), overwriteNotNullOnly)) {
            originUser.setUserName(updatedUser.getUserName());
        }
        if(shouldOverwriteValue(updatedUser.getEmail(), overwriteNotNullOnly)) {
            originUser.setEmail(updatedUser.getEmail());
        }
        if(shouldOverwriteValue(updatedUser.getPasswordHash(), overwriteNotNullOnly)) {
            originUser.setPasswordHash(updatedUser.getPasswordHash());
        }
        if(shouldOverwriteValue(updatedUser.getFirstName(), overwriteNotNullOnly)) {
            originUser.setFirstName(updatedUser.getFirstName());
        }
        if(shouldOverwriteValue(updatedUser.getLastName(), overwriteNotNullOnly)) {
            originUser.setLastName(updatedUser.getLastName());
        }
        return originUser;
    }

    private static final boolean shouldOverwriteValue(Object updatedValue, boolean overwriteNotNullOnly) {
        return overwriteNotNullOnly && updatedValue != null;
    }
}
