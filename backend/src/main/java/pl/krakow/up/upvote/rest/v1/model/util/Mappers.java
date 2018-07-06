package pl.krakow.up.upvote.rest.v1.model.util;


import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.rest.v1.model.dto.UserDTO;

public class Mappers {

    public static final User USER_TO_DTO_MAPPER(UserDTO userDto) {
        User user = new User();

        user.setUserName(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPasswordHash(userDto.getPasswordHash());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());

        return user;
    }

}
