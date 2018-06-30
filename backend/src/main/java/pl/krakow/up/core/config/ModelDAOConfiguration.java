package pl.krakow.up.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
public class ModelDAOConfiguration {
    private static final Logger LOGGER = LogManager.getLogger(ModelDAOConfiguration.class);
}
