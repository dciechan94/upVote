package pl.krakow.up.upvote.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import pl.krakow.up.upvote.core.model.VotePoll;
import pl.krakow.up.upvote.core.model.dao.VotePollDAO;
import pl.krakow.up.upvote.core.model.exceptions.ServiceRuntimeException;
import pl.krakow.up.upvote.core.model.exceptions.UserConstants;
import pl.krakow.up.upvote.core.model.exceptions.VotePollConstants;

import javax.validation.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class VotePollManagementService {

    private static final Logger LOGGER = LogManager.getLogger(VotePollManagementService.class);

    @Autowired
    private VotePollDAO votePollDb;

    public Long createVotePoll(VotePoll votePoll) {
        validateVotePoll(votePoll);

        Long id = trySave(votePoll);
        if(id == null) {
            throw new ServiceRuntimeException(VotePollConstants.ERROR_CREATE_VOTE_POLL_FAILURE);
        }

        return id;
    }

    public void deleteVotePoll(Long id) {
        if(votePollDb.findById(id) == null) {
            throw new ServiceRuntimeException(UserConstants.ERROR_USER_NOT_EXIST);
        }
        votePollDb.remove(id);
    }

    public VotePoll findVotePoll(Long id) {
        return votePollDb.findById(id);
    }

    public List<VotePoll> getVotePolls() {
        return votePollDb.findAll();
    }

    public void updateVotePoll(Long id, VotePoll updatedUserData) {
        updateOrPatchVotePoll(id, updatedUserData, false);
    }

    public void patchUser(Long id, VotePoll updatedUserData) {
        updateOrPatchVotePoll(id, updatedUserData, true);
    }

    private void updateOrPatchVotePoll(Long id, VotePoll updatedVotePollData, boolean patchOnly) {
        validateBasicModelConstraints(updatedVotePollData);
//
//        VotePoll existingUser = votePollDb.findById(id);
//        if(existingUser == null) {
//            throw new ServiceRuntimeException(UserConstants.ERROR_USER_NOT_EXIST);
//        }
//
//        if(!updatedUserData.getEmail().equals(existingUser.getEmail())) {
//            if(userDb.findByEmail(updatedUserData.getEmail()) != null) {
//                throw new ServiceRuntimeException(UserConstants.ERROR_USER_EMAIL_ALREADY_EXISTS);
//            }
//        }
//        existingUser = ValuesMapper.USER_DATA_FILLER(existingUser, updatedUserData, patchOnly);
//
//        tryUpdate(existingUser);
    }

    private void tryUpdate(VotePoll votePoll) {
        try {
            votePollDb.makePersistent(votePoll);
        } catch (Exception e) {
            LOGGER.error("Cannot update user", e);
            throw new ServiceRuntimeException(VotePollConstants.ERROR_UPDATE_VOTE_POLL_FAILURE);
        }
    }

    private Long trySave(VotePoll votePoll) {
        try {
            Long id = votePollDb.persist(votePoll);
            return id;
        } catch (Exception e) {
            LOGGER.error("Cannot persist vote poll", e);
            throw new ServiceRuntimeException(VotePollConstants.ERROR_CREATE_VOTE_POLL_FAILURE);
        }
    }

    private void validateVotePoll(VotePoll votePoll) {
        validateBasicModelConstraints(votePoll);
    }

    private void validateBasicModelConstraints(VotePoll votePoll) {
        try {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();

            Set<ConstraintViolation<VotePoll>> violations = validator.validate(votePoll);
            if(!violations.isEmpty()) {
                List<String> violationMessages = violations.stream().map(v -> v.getMessage()).collect(Collectors.toList());
                throw new ServiceRuntimeException(violationMessages.toArray(new String[]{}));
            }
        } catch(IllegalArgumentException e) {
            LOGGER.error("VotePoll object cannot be null");
            throw new ServiceRuntimeException(VotePollConstants.ERROR_VOTE_POLL_VALIDATION_FAILURE, e);
        } catch(ValidationException e) {
            LOGGER.error("Input data failed on validation: " + e.getMessage());
            throw new ServiceRuntimeException(VotePollConstants.ERROR_VOTE_POLL_VALIDATION_FAILURE, e);
        }
    }
}
