package pl.krakow.up.upvote.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import pl.krakow.up.upvote.core.model.dao.UserDAO;
import pl.krakow.up.upvote.core.model.dao.UserDAOImpl;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@Configuration
@ComponentScan(basePackages = CoreConfigConstants.COMPONENT_SCAN_SCOPE)
public class ModelDAOConfiguration {
    private static final Logger LOGGER = LogManager.getLogger(ModelDAOConfiguration.class);

    @Bean
    public EntityManager entityManager() {
        LOGGER.info("Creating 'entityManager' bean");
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory( "persistenceUnitName" );
        return entityManagerFactory.createEntityManager();
    }

    @Bean
    public UserDAO userDAO() {
        LOGGER.info("Creating 'userDAO' bean");
        return new UserDAOImpl();
    }
}
