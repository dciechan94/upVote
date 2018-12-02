package pl.krakow.up.upvote.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import pl.krakow.up.upvote.core.model.Role;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.dao.RoleDAO;
import pl.krakow.up.upvote.core.model.dao.UserDAO;

@Component
public class AppStartedListener implements ApplicationListener<ContextRefreshedEvent> {
    private static final Logger LOGGER = LogManager.getLogger(AppStartedListener.class);

    @Autowired
    UserDAO userdb;

    @Autowired
    RoleDAO roledb;

    Role adminRole = new Role();
    Role userRole = new Role();

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        LOGGER.info("Executing custom onApplicationStart actions");

        createRoles();
        createAdminUser();
        createTestData();
    }

    private void createRoles() {
        adminRole.setName("UPV_Administrator");
        userRole.setName("UPV_User");

        roledb.persist(adminRole);
        roledb.persist(userRole);
    }

    private void createAdminUser() {
        LOGGER.info("Creating Administrator user");

        User admin = new User();
        admin.setEmail("admin@admin.com");
        admin.setFirstName("Admin");
        admin.setLastName("Admin");
        admin.setUserName("admin");
        admin.setPasswordHash("1q2w3e");
        admin.getRoles().add(adminRole);
        admin.getRoles().add(userRole);
        userdb.persist(admin);
    }

    private void createTestData() {
        createUsers(5);
    }

    private void createUsers(int count) {
        for(int i = 0; i < count; i++) {
            LOGGER.info("Creating user {}", i);
            User user = new User();
            user.setEmail(i + "@"+ i + ".pl");
            user.setFirstName(Integer.toString(i)+ "Name");
            user.setLastName(Integer.toString(i)+ "Name");
            user.setUserName(Integer.toString(i)+ "Name");
            user.setPasswordHash("1q2w3e");
            user.getRoles().add(userRole);
            userdb.persist(user);
        }
    }

}