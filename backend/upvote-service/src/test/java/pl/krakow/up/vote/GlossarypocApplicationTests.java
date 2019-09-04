package pl.krakow.up.vote;

import java.util.Properties;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import pl.krakow.up.vote.common.Constants;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@ConfigurationProperties()
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = { Constants.SPRING_LOCAL_PROFILE })
@Slf4j
public class GlossarypocApplicationTests {

    @Getter
    @Setter
    private Properties spring = new Properties();

    @Autowired
    private Environment env;

    @Test
    public void contextLoads() {
        // should not fail

        log.info("Properties: " + spring);
        log.info("Env: " + env);
    }
}
