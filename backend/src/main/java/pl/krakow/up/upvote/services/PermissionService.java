package pl.krakow.up.upvote.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import pl.krakow.up.upvote.core.model.Role;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.dao.UserDAO;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

public class PermissionService {

    private static final Logger LOGGER = LogManager.getLogger(PermissionService.class);

    @Autowired
    private UserDAO userdb;

    private static final String UPV_ADMINISTRATOR = "UPV_Administrator";
    private static final String UPV_USER = "UPV_Administrator";

    public boolean hasAdministratorRole(Principal principal) {
        if(principal == null) {
            return false;
        }

        User user = userdb.findByEmail(principal.getName());
        if(user != null) {
            List<Role> roles = user.getRoles();
            List<String> filteredRoles = roles.stream()
                    .map(role -> role.getName())
                    .filter(roleName -> roleName.equals(UPV_ADMINISTRATOR))
                    .collect(Collectors.toList());
            return (filteredRoles.size() > 0);
        }
        return false;
    }

    public boolean hasUserRole(Principal principal) {
        if(principal == null) {
            return false;
        }

        User user = userdb.findByEmail(principal.getName());
        if(user != null) {
            List<Role> roles = user.getRoles();
            List<String> filteredRoles = roles.stream()
                    .map(role -> role.getName())
                    .filter(roleName -> roleName.equals(UPV_USER))
                    .collect(Collectors.toList());
            return (filteredRoles.size() > 0);
        }
        return false;
    }
}
