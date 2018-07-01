package pl.krakow.up.upvote.services.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import pl.krakow.up.upvote.core.config.CoreConfigConstants;

@Configuration
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
public class ServicesBeanConfig {

}
