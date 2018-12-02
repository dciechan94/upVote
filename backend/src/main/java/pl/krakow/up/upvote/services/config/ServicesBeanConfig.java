package pl.krakow.up.upvote.services.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import pl.krakow.up.upvote.core.config.CoreConfigConstants;
import pl.krakow.up.upvote.services.ActionCodesManagementService;
import pl.krakow.up.upvote.services.PermissionService;
import pl.krakow.up.upvote.services.UserManagementService;
import pl.krakow.up.upvote.services.VotePollManagementService;

@Configuration
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
public class ServicesBeanConfig {

    @Bean(name = "userManagementService")
    public UserManagementService userManagementService() {
        UserManagementService userManagementService = new UserManagementService();
        return userManagementService;
    }

    @Bean(name = "actionCodesManagementService")
    public ActionCodesManagementService actionCodesManagementService() {
        ActionCodesManagementService actionCodesManagementService = new ActionCodesManagementService();
        return actionCodesManagementService;
    }

    @Bean(name = "votePollManagementService")
    public VotePollManagementService votePollManagementService() {
        VotePollManagementService votePollManagementService = new VotePollManagementService();
        return votePollManagementService;
    }

    @Bean(name = "permissionService")
    public PermissionService permissionService() {
        PermissionService permissionService = new PermissionService();
        return permissionService;
    }

}
