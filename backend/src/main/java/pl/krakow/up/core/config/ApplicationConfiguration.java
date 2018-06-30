package pl.krakow.up.core.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@EnableAutoConfiguration
@EntityScan(basePackages = "pl.krakow.up")
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
@PropertySource("classpath:application.properties")
//@EnableJpaRepositories  // Required because of @EnableProjectA
public class ApplicationConfiguration {
}
