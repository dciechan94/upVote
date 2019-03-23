package pl.krakow.up.upvote.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import pl.krakow.up.upvote.core.model.dao.*;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@Configuration
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
public class ModelDAOConfiguration {
    private static final Logger LOGGER = LogManager.getLogger(ModelDAOConfiguration.class);

//    @Bean
//    @RequestScope(proxyMode = ScopedProxyMode.TARGET_CLASS)
//    public EntityManager entityManager() {
//        LOGGER.info("Creating 'entityManager' bean");
//        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory( "persistenceUnitName" );
//        return entityManagerFactory.createEntityManager();
//    }

    @Bean
    public EntityManagerFactory entityManagerFactory() {
        LOGGER.info("Creating 'entityManagerFactory' bean");
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory( "persistenceUnitName" );
        return entityManagerFactory;
    }

    @Bean
    @DependsOn("entityManagerFactory")
    public RoleDAO roleDAO() {
        LOGGER.info("Create 'roleDAO' bean");
        return new RoleDAOImpl();
    }

    @Bean
    @DependsOn("entityManagerFactory")
    public UserDAO userDAO() {
        LOGGER.info("Creating 'userDAO' bean");
        return new UserDAOImpl();
    }

    @Bean
    public RegistrationCodeDAO registrationCodeDAO() {
        LOGGER.info("Creating 'registrationCodeDAO' bean");
        return new RegistrationCodeDAOImpl();
    }

    @Bean
    public VotePollDAO votePollDAO() {
        LOGGER.info("Creating 'votePollDAO' bean");
        return new VotePollDAOImpl();
    }

    @Bean
    public VoteDAO voteDAO() {
        LOGGER.info("Creating 'voteDAO' bean");
        return new VoteDAOImpl();
    }

}
