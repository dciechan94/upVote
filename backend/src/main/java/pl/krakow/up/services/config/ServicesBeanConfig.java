package pl.krakow.up.services.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import pl.krakow.up.core.config.CoreConfigConstants;

@Configuration
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
public class ServicesBeanConfig {

}
