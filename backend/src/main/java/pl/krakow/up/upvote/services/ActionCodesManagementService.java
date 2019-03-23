package pl.krakow.up.upvote.services;

import org.apache.commons.text.CharacterPredicates;
import org.apache.commons.text.RandomStringGenerator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import pl.krakow.up.upvote.core.model.RegistrationCode;
import pl.krakow.up.upvote.core.model.dao.RegistrationCodeDAO;
import pl.krakow.up.upvote.core.model.exceptions.ServiceRuntimeException;

import java.util.Date;
import java.util.List;

public class ActionCodesManagementService {

    private static final Logger LOGGER = LogManager.getLogger(ActionCodesManagementService.class);
    private static final int REGISTRATION_CODE_LENGTH = 8;

    @Autowired
    private RegistrationCodeDAO registrationCodeDb;


    public Long createRegistrationCode() {
        Long id = tryCreateRegistrationCode();
        if(id == null) {
            throw new ServiceRuntimeException("TODO ERROR");
        }

        return id;
    }

    public void deleteRegistrationCode(String code) {
        RegistrationCode codeObj = registrationCodeDb.findByCode(code);
        if(codeObj == null) {
            throw new ServiceRuntimeException("TODO ERROR");
        }
        registrationCodeDb.remove(codeObj.getId());
    }

    public void deleteRegistrationCodeById(Long id) {
        RegistrationCode codeObj = registrationCodeDb.findById(id);
        if(codeObj == null) {
            throw new ServiceRuntimeException("TODO ERROR");
        }
        registrationCodeDb.remove(codeObj.getId());
    }

    public RegistrationCode findRegistrationCode(String code) {
        return registrationCodeDb.findByCode(code);
    }

    public List<RegistrationCode> getRegistrationCodes() {
        return registrationCodeDb.findAll();
    }

    private Long tryCreateRegistrationCode() {
        try {
            RegistrationCode code = new RegistrationCode();
            code.setCode(generateRandomString(REGISTRATION_CODE_LENGTH));
            code.setValidUntil(new Date(System.currentTimeMillis()));
            Long id = registrationCodeDb.persist(code);
            return id;
        } catch (Exception e) {
            LOGGER.error("Cannot persist registration code", e);
            throw new ServiceRuntimeException("TODO ERROR", e);
        }
    }

    private String generateRandomString(int length) {
        RandomStringGenerator randomStringGenerator =
                new RandomStringGenerator.Builder()
                        .withinRange('0', 'z')
                        .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
                        .build();
        return randomStringGenerator.generate(length);
    }

}
