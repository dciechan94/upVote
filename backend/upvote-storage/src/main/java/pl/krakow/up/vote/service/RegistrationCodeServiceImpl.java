package pl.krakow.up.vote.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.text.CharacterPredicates;
import org.apache.commons.text.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.repository.RegistrationCodeRepository;

@Service
public class RegistrationCodeServiceImpl implements RegistrationCodeService {
	
	private static final int REGISTRATION_CODE_LENGTH = 8;

    @Autowired
    private RegistrationCodeRepository codeRepository;


    @Override
    public Optional<RegistrationCode> findByCode(String code) {
        return codeRepository.findByCode(code);
    }

    @Override
    public List<RegistrationCode> findAll() {
        List<RegistrationCode> result = new ArrayList<>();
        for (RegistrationCode code : codeRepository.findAll()) {
            result.add(code);
        }
        return result;
    }

    @Override
    public Long create(int validDays) {
    	RegistrationCode code = new RegistrationCode();
    	code.setCode(generateRandomString(REGISTRATION_CODE_LENGTH));
    	code.setValidDays(validDays);
    	code = codeRepository.save(code);
    	return code.getId();
    }

    @Override
    public RegistrationCode findById(Long id) {
        Optional<RegistrationCode> codeOptional = codeRepository.findById(id);
        return codeOptional.isPresent() ? codeOptional.get() : null;
    }

    @Override
    public void deleteById(Long id) {
    	codeRepository.deleteById(id);
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
