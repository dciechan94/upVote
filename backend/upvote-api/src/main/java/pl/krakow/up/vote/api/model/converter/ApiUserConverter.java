package pl.krakow.up.vote.api.model.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.krakow.up.vote.api.model.CoreObject;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.api.util.APIAuthorizationUtils;
import pl.krakow.up.vote.api.util.APIUtils;
import pl.krakow.up.vote.model.AbstractObject;
import pl.krakow.up.vote.model.Role;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.repository.RoleRepository;

import java.net.URI;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ApiUserConverter extends ApiBasicConverter
        implements ApiObjectConverter<UserDTO, User> {

    public final static String CONTROLLER_URL = "/users";

    @Autowired
    private GenericConverter converter;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private APIAuthorizationUtils authUtils;


    @Override
    public UserDTO toApiObject(User modelEntity, Map<Long, CoreObject> internalApiCache) {

        UserDTO userDto = new UserDTO();
        copyBasicProperties(modelEntity, userDto);
        userDto.setEmail(modelEntity.getEmail());
        userDto.setLogin(modelEntity.getLogin());
        userDto.setFirstName(modelEntity.getFirstName());
        userDto.setLastName(modelEntity.getLastName());
        userDto.setRoles(modelEntity.getRoles().stream().map(role -> role.getName()).collect(Collectors.toList()));

        internalApiCache.put(userDto.getId(), userDto);
        return userDto;
    }

    @Override
    public User toModelObject(UserDTO apiEntity,
                              Map<Long, AbstractObject> internalModelCache) {
        User user = new User();

        copyBasicProperties(apiEntity, user);
        user.setFirstName(apiEntity.getFirstName());
        user.setLastName(apiEntity.getLastName());
        user.setEmail(apiEntity.getEmail());
        user.setLogin(apiEntity.getLogin()==null || apiEntity.getLogin().isEmpty() ? apiEntity.getEmail() : apiEntity.getLogin());

        if (apiEntity.getPasswordHash().startsWith("{bcrypt}")) {
            user.setPasswordHash(apiEntity.getPasswordHash());
        } else {
            if (apiEntity.getPasswordHash().isEmpty()) {
                user.setPasswordHash(null);
            } else {
                user.setPasswordHash("{bcrypt}" + new BCryptPasswordEncoder().encode(apiEntity.getPasswordHash()));
            }
        }

        if (apiEntity.getRoles() != null && !apiEntity.getRoles().isEmpty()) {
            List<Role> roles = apiEntity.getRoles().stream().map(r -> roleRepository.findByName(r))
                    .filter(o -> o.isPresent())
                    .collect(Collectors.toList()).stream()
                    .map(o -> o.get()).collect(Collectors.toList());
            user.setRoles(roles);
        } else {
            Optional<Role> userRoleOpt = roleRepository.findByName("UPV_User");
            if (userRoleOpt.isPresent()) {
                user.setRoles(Arrays.asList(userRoleOpt.get()));
            } else {
                throw new RuntimeException("Cannot find UPV_User role to assign");
            }
        }

        internalModelCache.put(user.getId(), user);
        return user;
    }

    @Override
    public URI getBaseUri() {
        ServletUriComponentsBuilder servletUriComponentsBuilder = ServletUriComponentsBuilder.fromCurrentContextPath();
        return servletUriComponentsBuilder.path(CONTROLLER_URL).build().toUri();
    }

}
