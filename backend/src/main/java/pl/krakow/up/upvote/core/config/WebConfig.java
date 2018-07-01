package pl.krakow.up.upvote.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    private static final Logger LOGGER = LogManager.getLogger(WebMvcConfigurerAdapter.class);

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        LOGGER.info("Adding CORS mapping - path: \"/**\" allowedMethods: GET, POST, PUT, DELETE, OPTIONS");
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }

}
