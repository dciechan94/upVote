package pl.krakow.up.vote.api.model.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.krakow.up.vote.api.model.CoreObject;
import pl.krakow.up.vote.api.model.RoleDTO;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.model.AbstractObject;
import pl.krakow.up.vote.model.Role;
import pl.krakow.up.vote.model.User;

import java.net.URI;
import java.util.Map;

@Component
public class ApiRoleConverter extends ApiBasicConverter
        implements ApiObjectConverter<RoleDTO, Role> {

    public final static String CONTROLLER_URL = "/v1/user";

    @Autowired
    GenericConverter converter;

    @Override
    public RoleDTO toApiObject(Role modelEntity, Map<Long, CoreObject> internalApiCache) {

        RoleDTO roleDto = new RoleDTO();
        copyBasicProperties(modelEntity, roleDto);
        roleDto.setName(modelEntity.getName());

        internalApiCache.put(roleDto.getId(), roleDto);
        return roleDto;
    }

    @Override
    public Role toModelObject(RoleDTO apiEntity,
                              Map<Long, AbstractObject> internalModelCache) {
        Role role = new Role();

        copyBasicProperties(apiEntity, role);
        role.setName(apiEntity.getName());

        internalModelCache.put(role.getId(), role);
        return role;
    }

    @Override
    public URI getBaseUri() {
        ServletUriComponentsBuilder servletUriComponentsBuilder = ServletUriComponentsBuilder.fromCurrentContextPath();
        return servletUriComponentsBuilder.path(CONTROLLER_URL).build().toUri();
    }

}
