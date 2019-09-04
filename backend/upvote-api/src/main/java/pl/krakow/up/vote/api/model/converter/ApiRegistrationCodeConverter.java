package pl.krakow.up.vote.api.model.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.krakow.up.vote.api.model.CoreObject;
import pl.krakow.up.vote.api.model.RegistrationCodeDTO;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.model.AbstractObject;
import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.model.User;

import java.net.URI;
import java.util.Map;

@Component
public class ApiRegistrationCodeConverter extends ApiBasicConverter
        implements ApiObjectConverter<RegistrationCodeDTO, RegistrationCode> {

    public final static String CONTROLLER_URL = "/v1/user";

    @Autowired
    GenericConverter converter;

    @Override
    public RegistrationCodeDTO toApiObject(RegistrationCode modelEntity, Map<Long, CoreObject> internalApiCache) {

        RegistrationCodeDTO registrationCodeDto = new RegistrationCodeDTO();
        copyBasicProperties(modelEntity, registrationCodeDto);
        
        registrationCodeDto.setCode(modelEntity.getCode());
        registrationCodeDto.setValidDays(Long.valueOf(modelEntity.getValidDays()));

        internalApiCache.put(registrationCodeDto.getId(), registrationCodeDto);
        return registrationCodeDto;
    }

    @Override
    public RegistrationCode toModelObject(RegistrationCodeDTO apiEntity,
                              Map<Long, AbstractObject> internalModelCache) {
        RegistrationCode registrationCode = new RegistrationCode();

        copyBasicProperties(apiEntity, registrationCode);

        internalModelCache.put(registrationCode.getId(), registrationCode);
        return registrationCode;
    }

    @Override
    public URI getBaseUri() {
        ServletUriComponentsBuilder servletUriComponentsBuilder = ServletUriComponentsBuilder.fromCurrentContextPath();
        return servletUriComponentsBuilder.path(CONTROLLER_URL).build().toUri();
    }

}
