package pl.krakow.up.upvote.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.dao.UserDAO;
import pl.krakow.up.upvote.core.model.exceptions.ServiceRuntimeException;

import javax.validation.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserManagementService {

    private static final Logger LOGGER = LogManager.getLogger(UserManagementService.class);

    @Autowired
    private UserDAO userDb;


    public Long createUser(User user) {
        validateUser(user);

        Long id = trySave(user);
        if(id == null) {
            throw new ServiceRuntimeException("ERROR_CREATE_USER_FAILURE");
        }

        return id;
    }

    public void deleteUser(Long id) {
        if(userDb.findById(id) == null) {
            throw new ServiceRuntimeException("ERROR_DELETE_USER_NOT_EXIST");
        }
        userDb.remove(id);
    }

    private Long trySave(User user) {
        try {
            Long id = userDb.save(user);
            return id;
        } catch (Exception e) {
            LOGGER.error("Cannot save user", e);
            throw new ServiceRuntimeException("ERROR_CREATE_USER_FAILURE");
        }
    }

    private void validateUser(User user) {
        try {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();

            Set<ConstraintViolation<User>> violations = validator.validate(user);
            if(!violations.isEmpty()) {
                List<String> violationMessages = violations.stream().map(v -> v.getMessage()).collect(Collectors.toList());
                throw new ServiceRuntimeException(violationMessages.toArray(new String[]{}));
            }

            if(userDb.findByEmail(user.getEmail()) != null) {
                throw new ServiceRuntimeException("ERROR_CREATE_USER_ALREADY_EXISTS");
            }

        } catch(IllegalArgumentException e) {
            LOGGER.error("User object cannot be null");
            throw new ServiceRuntimeException("ERROR_CREATE_USER_FAILURE", e);
        } catch(ValidationException e) {
            LOGGER.error("Input data failed on validation: " + e.getMessage());
            throw new ServiceRuntimeException(e.getMessage(), e);
        }
    }
}
