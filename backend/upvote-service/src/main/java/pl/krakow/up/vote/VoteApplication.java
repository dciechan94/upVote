package pl.krakow.up.vote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import pl.krakow.up.vote.config.PersistenceConfig;

@Import(PersistenceConfig.class)
@SpringBootApplication(scanBasePackages = {
    "pl.krakow.up.vote", "pl.krakow.up.vote.api"
})
public class VoteApplication {

    public static void main(String[] args) {
        SpringApplication.run(VoteApplication.class, args);
    }

}
