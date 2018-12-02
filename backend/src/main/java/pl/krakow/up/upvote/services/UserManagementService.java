package pl.krakow.up.upvote.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.dao.UserDAO;
import pl.krakow.up.upvote.core.model.exceptions.ServiceRuntimeException;
import pl.krakow.up.upvote.core.model.exceptions.UserConstants;
import pl.krakow.up.upvote.services.util.ValuesMapper;

import javax.validation.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserManagementService {

    private static final Logger LOGGER = LogManager.getLogger(UserManagementService.class);

    @Autowired
    private UserDAO userDb;

    @Autowired
    private ActionCodesManagementService codesDb;

    public Long createUser(User user, String registrationCode) {
        validateRegistrationCode(registrationCode);
        validateUser(user);

        Long id = trySave(user);
        if(id == null) {
            throw new ServiceRuntimeException(UserConstants.ERROR_CREATE_USER_FAILURE);
        }
        codesDb.deleteRegistrationCode(registrationCode);

        return id;
    }

    public void deleteUser(Long id) {
        if(userDb.findById(id) == null) {
            throw new ServiceRuntimeException(UserConstants.ERROR_USER_NOT_EXIST);
        }

        userDb.remove(id);
    }

    public User findUser(Long id) {
        return userDb.findById(id);
    }

    public User findUser(String principalName) {
        return userDb.findByEmail(principalName);
    }

    public void updateUser(Long id, User updatedUserData) {
        updateOrPatchUser(id, updatedUserData, false);
    }

    public void patchUser(Long id, User updatedUserData) {
        updateOrPatchUser(id, updatedUserData, true);
    }

    private void updateOrPatchUser(Long id, User updatedUserData, boolean patchOnly) {
        validateBasicModelConstraints(updatedUserData);

        User existingUser = userDb.findById(id);
        if(existingUser == null) {
            throw new ServiceRuntimeException(UserConstants.ERROR_USER_NOT_EXIST);
        }

        if(!updatedUserData.getEmail().equals(existingUser.getEmail())) {
            if(userDb.findByEmail(updatedUserData.getEmail()) != null) {
                throw new ServiceRuntimeException(UserConstants.ERROR_USER_EMAIL_ALREADY_EXISTS);
            }
        }
        existingUser = ValuesMapper.USER_DATA_FILLER(existingUser, updatedUserData, patchOnly);

        tryUpdate(existingUser);
    }

    private void tryUpdate(User user) {
        try {
            userDb.makePersistent(user);
        } catch (Exception e) {
            LOGGER.error("Cannot update user", e);
            throw new ServiceRuntimeException(UserConstants.ERROR_UPDATE_USER_FAILURE);
        }
    }

    private Long trySave(User user) {
        try {
            Long id = userDb.persist(user);
            return id;
        } catch (Exception e) {
            LOGGER.error("Cannot persist user", e);
            throw new ServiceRuntimeException(UserConstants.ERROR_CREATE_USER_FAILURE);
        }
    }

    private void validateRegistrationCode(String registrationCode) {
        if (registrationCode == null || registrationCode.isEmpty()) {
            throw new ServiceRuntimeException(UserConstants.ERROR_CREATE_USER_INVALID_REGISTRATION_CODE);
        }
        if (codesDb.findRegistrationCode(registrationCode) == null) {
            throw new ServiceRuntimeException(UserConstants.ERROR_CREATE_USER_INVALID_REGISTRATION_CODE);
        }
    }

    private void validateUser(User user) {
        validateBasicModelConstraints(user);

        if(userDb.findByEmail(user.getEmail()) != null) {
            throw new ServiceRuntimeException(UserConstants.ERROR_USER_EMAIL_ALREADY_EXISTS);
        }
    }

    private void validateBasicModelConstraints(User user) {
        try {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();

            Set<ConstraintViolation<User>> violations = validator.validate(user);
            if(!violations.isEmpty()) {
                List<String> violationMessages = violations.stream().map(v -> v.getMessage()).collect(Collectors.toList());
                throw new ServiceRuntimeException(violationMessages.toArray(new String[]{}));
            }
        } catch(IllegalArgumentException e) {
            LOGGER.error("User object cannot be null");
            throw new ServiceRuntimeException(UserConstants.ERROR_USER_VALIDATION_FAILURE, e);
        } catch(ValidationException e) {
            LOGGER.error("Input data failed on validation: " + e.getMessage());
            throw new ServiceRuntimeException(UserConstants.ERROR_USER_VALIDATION_FAILURE, e);
        }
    }
}
