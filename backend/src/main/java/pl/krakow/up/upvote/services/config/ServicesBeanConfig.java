package pl.krakow.up.upvote.services.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import pl.krakow.up.upvote.core.config.CoreConfigConstants;
import pl.krakow.up.upvote.services.UserManagementService;

@Configuration
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
public class ServicesBeanConfig {

    @Bean(name = "userManagementService")
    public UserManagementService userManagementService() {
        UserManagementService userManagementService = new UserManagementService();
        return userManagementService;
    }

}
