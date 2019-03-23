package pl.krakow.up.upvote.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import pl.krakow.up.upvote.core.model.*;
import pl.krakow.up.upvote.core.model.dao.RegistrationCodeDAO;
import pl.krakow.up.upvote.core.model.dao.RoleDAO;
import pl.krakow.up.upvote.core.model.dao.UserDAO;
import pl.krakow.up.upvote.core.model.dao.VotePollDAO;

import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.Date;
import java.util.concurrent.Executors;

@Component
public class AppStartedListener implements ApplicationListener<ContextRefreshedEvent> {
    private static final Logger LOGGER = LogManager.getLogger(AppStartedListener.class);

    @Autowired
    UserDAO userdb;

    @Autowired
    RoleDAO roledb;

    @Autowired
    VotePollDAO votePollDb;

    @Autowired
    RegistrationCodeDAO codesDb;

    @Autowired
    protected EntityManager em;


    Role adminRole = new Role();
    Role userRole = new Role();

    User adminUser = null;
    User basicUser = null;

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        LOGGER.info("Executing custom onApplicationStart actions");

        Executors.newSingleThreadExecutor().execute(new Runnable() {
            @Override
            public void run() {
                while(em.isOpen()) {
                    LOGGER.info("Refreshing db connection");
                    em.createNativeQuery("SELECT 1").getFirstResult();
                    try {
                        Thread.sleep(1000*60*60);
                    } catch (InterruptedException e) {
                        LOGGER.error("Interrupted", e);
                    }
                }
                LOGGER.info("Db connection closed");
            }
        });

        removeEverything();

        createCodes();
        createRoles();
        adminUser = createAdminUser();
        basicUser = createBasicUser();
        createTestData();
        createVotePoll(basicUser);
        createVotePoll(adminUser);

        LOGGER.info("Removing all roles");
        roledb.findAll().stream().forEach(roleInDb -> roledb.remove(roleInDb.getId()));
        userdb.remove(adminUser.getId());
        votePollDb.findAll().stream().forEach(votePollInDb -> votePollDb.remove(votePollInDb.getId()));
    }

    private void removeEverything() {
        roledb.removeAll();
        userdb.findAll().stream().forEach(userInDb -> userdb.remove(userInDb.getId()));
        votePollDb.findAll().stream().forEach(votePollInDb -> votePollDb.remove(votePollInDb.getId()));
    }

    private void createCodes() {
        RegistrationCode code = new RegistrationCode();
        code.setCode("1qaz2wsx");
        code.setValidUntil(new Date());
        codesDb.persist(code);
    }

    private void createRoles() {
        adminRole.setName("UPV_Administrator");
        userRole.setName("UPV_User");

        roledb.persist(adminRole);
        roledb.persist(userRole);
    }

    private User createAdminUser() {
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
        return admin;
    }

    private User createBasicUser() {
        LOGGER.info("Creating Basic user");

        User basic = new User();
        basic.setEmail("basic@basic.com");
        basic.setFirstName("basic");
        basic.setLastName("basic");
        basic.setUserName("basic");
        basic.setPasswordHash("1q2w3e");

        userdb.addRole(basic, userRole);

        userdb.persist(basic);
        return basic;
    }

    private void createVotePoll(User user) {
        VotePoll votePoll = new VotePoll();

        votePoll.setCreatedBy(user);
        votePoll.setShortDescription("Short");
        votePoll.setLongDescription("Long");
        votePoll.setCreateDate(new Date(0));
        votePoll.setAnnounceDate(new Date(1));
        votePoll.setVoteStartDate(new Date(2));
        votePoll.setVoteEndDate(new Date(3));
        votePoll.setPublishResultDate(new Date(4));

        Voteable vot1 = new Voteable();
        vot1.setValue("Value1 no reference");

        Voteable vot2 = new Voteable();
        vot2.setValue(adminUser.getFirstName() + " " + adminUser.getLastName());
        vot2.setUserReference(adminUser);

        votePoll.setVoteables(Arrays.asList(vot1, vot2));

        votePollDb.persist(votePoll);
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