package pl.krakow.up.vote.api.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.krakow.up.vote.model.Role;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.repository.UserRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class APIAuthorizationUtils {
    private static final String UPV_ADMINISTRATOR = "UPV_Administrator";
    private static final String UPV_USER = "UPV_User";

    @Autowired
    private UserRepository userRepository;


    public boolean hasAdministratorRole(Principal principal) {
        return hasRole(principal, UPV_ADMINISTRATOR);
    }

    public boolean hasUserRole(Principal principal) {
        return hasRole(principal, UPV_USER);
    }

    private boolean hasRole(Principal principal, String roleToCheck) {
        if(principal == null) {
            return false;
        }

        Optional<User> user = userRepository.findByLoginOrEmail(principal.getName(), principal.getName());
        if(user.isPresent()) {
            List<Role> roles = user.get().getRoles();
            List<String> filteredRoles = roles.stream()
                    .map(role -> role.getName())
                    .filter(roleName -> roleName.equals(roleToCheck))
                    .collect(Collectors.toList());
            return (filteredRoles.size() > 0);
        }
        return false;
    }
}
