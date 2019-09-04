package pl.krakow.up.vote.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.model.Role;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.model.VotePoll;
import pl.krakow.up.vote.repository.RegistrationCodeRepository;
import pl.krakow.up.vote.repository.RoleRepository;
import pl.krakow.up.vote.repository.UserRepository;
import pl.krakow.up.vote.repository.VotePollRepository;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Component
public class AppStartedListener implements ApplicationListener<ContextRefreshedEvent> {

    public static final String UPV_ADMIN_ROLE_NAME = "UPV_Administrator";
    public static final String UPV_USER_ROLE_NAME = "UPV_User";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private VotePollRepository votePollRepository;

    @Autowired
    private RegistrationCodeRepository registrationCodeRepository;



    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        log.info("Executing custom onApplicationStart actions");

        checkOrCreateDefaultUPVoteRoles();
        checkOrCreateAdminUser();


        // temp
        checkOrCreateStandardUser();
        checkOrCreateRegistrationCode();
        checkORCreateExampleVotingPolls();

        //createVotePoll(basicUser);
        //createVotePoll(adminUser);

//        log.info("Removing all roles");
//        roleRepository.deleteAll();
//        log.info("Removing adminUser");
//        userRepository.delete(userRepository.findById(adminUser.getId()).get());
//        log.info("Removing all votePolls");
//        votePollRepository.deleteAll();
    }

//    private void removeEverything() {
//        roleRepository.deleteAll();
//        userRepository.deleteAll();
//        votePollRepository.deleteAll();
//        registrationCodeRepository.deleteAll();
//    }

//    private void createCodes() {
//        RegistrationCode code = new RegistrationCode();
//        code.setCode("1qaz2wsx");
//        code.setValidDays(3);
//        registrationCodeRepository.save(code);
//    }

    private void checkOrCreateDefaultUPVoteRoles() {
        log.info("Checking if database populated with default user roles...");

        Optional<Role> role = roleRepository.findByName(UPV_ADMIN_ROLE_NAME);
        if(!role.isPresent()) {
            log.info("{} role not found. Creating new entry.", UPV_ADMIN_ROLE_NAME);
            Role adminRole = new Role();
            adminRole.setName(UPV_ADMIN_ROLE_NAME);
            roleRepository.save(adminRole);
        }

        role = roleRepository.findByName(UPV_USER_ROLE_NAME);
        if(!role.isPresent()) {
            log.info("{} role not found. Creating new entry.", UPV_USER_ROLE_NAME);
            Role userRole = new Role();
            userRole.setName(UPV_USER_ROLE_NAME);
            roleRepository.save(userRole);
        }
    }

    private void checkOrCreateAdminUser() {
        log.info("Checking if database populated with default administrator user...");

        String administratorLogin="Administrator";
        String administratorEmail="admin@upvote.com";
        String administratorPassword="Zaq123edc";
        Optional<User> result = userRepository.findByLogin(administratorLogin);

        if(!result.isPresent()) {
            log.info("Administrator not found. Creating a default one...");

            Optional<Role> adminRole = roleRepository.findByName(UPV_ADMIN_ROLE_NAME);
            Optional<Role> userRole = roleRepository.findByName(UPV_USER_ROLE_NAME);

            User admin = new User();
            admin.setEmail(administratorEmail);
            admin.setFirstName("Admin");
            admin.setLastName("Admin");
            admin.setLogin(administratorLogin);
            admin.setPasswordHash("{bcrypt}" + new BCryptPasswordEncoder().encode(administratorPassword));
            admin.setRoles(Arrays.asList(adminRole.get(), userRole.get()));
            userRepository.save(admin);

            log.info("Administrator created. Login: {}, email: {}, password: {}", administratorLogin, administratorEmail, administratorPassword);
        }
    }

    private void checkOrCreateStandardUser() {
        log.info("Checking if database populated with default standard user...");

        String userLogin="User";
        String userEmail="user@upvote.com";
        String userPassword="Zaq123edc";
        Optional<User> result = userRepository.findByLogin(userLogin);

        if(!result.isPresent()) {
            log.info("Standard user not found. Creating a default one...");

            Optional<Role> userRole = roleRepository.findByName(UPV_USER_ROLE_NAME);

            User admin = new User();
            admin.setEmail(userEmail);
            admin.setFirstName("User");
            admin.setLastName("User");
            admin.setLogin(userLogin);
            admin.setPasswordHash("{bcrypt}" + new BCryptPasswordEncoder().encode(userPassword));
            admin.setRoles(Arrays.asList(userRole.get()));
            userRepository.save(admin);

            log.info("Standard user created. Login: {}, email: {}, password: {}", userLogin, userEmail, userPassword);
        }
    }

    private void checkOrCreateRegistrationCode() {
        log.info("Checking if database populated with default registration code...");

        String defaultCode = "Zaq123edc";
        int validFor = 7;
        Optional<RegistrationCode> result = registrationCodeRepository.findByCode(defaultCode);

        if(!result.isPresent()) {
            log.info("Registration code not found. Creating a default one...");

            RegistrationCode code = new RegistrationCode();
            code.setCode(defaultCode);
            code.setValidDays(validFor);
            registrationCodeRepository.save(code);

            log.info("Registration code created. Code: {}, valid for: {} days", defaultCode, validFor);
        }
    }


    private void checkORCreateExampleVotingPolls() {
        log.info("Checking if database populated with default vote polls...");



        if(!votePollRepository.findAll().iterator().hasNext()) {
            log.info("Registration code not found. Creating a default one...");

            for(long i = 0; i < 8; i++) {
                VotePoll poll = new VotePoll();
                poll.setName("Wybory Marszałka Sejmu" + i);
                poll.setDescription("Wybory na stanowisko Marszałka Sejmu 2019");

                poll.setVoteStartDate(new Date(Long.sum(Long.valueOf(1565344800000L), i*Long.valueOf(86400000L))));
                poll.setVoteEndDate(new Date(Long.sum(Long.valueOf(1565348400000L), i*Long.valueOf(86400000L))));
                poll.setPublishResultDate(new Date(Long.sum(Long.valueOf(1565352000000L), i*Long.valueOf(86400000L))));
                poll.setCandidates(StreamSupport.stream(userRepository.findAll().spliterator(), false)
                        .collect(Collectors.toList()));
                votePollRepository.save(poll);
            }

            VotePoll poll = new VotePoll();
            poll.setName("Wybory Marszałka Sejmu");
            poll.setDescription("Wybory na stanowisko Marszałka Sejmu 2019");

            poll.setVoteStartDate(new Date());
            poll.setVoteEndDate(new Date(Long.sum(new Date().getTime(), 1*Long.valueOf(86400000L))));
            poll.setPublishResultDate(new Date(Long.sum(new Date().getTime(), 2*Long.valueOf(86400000L))));
            poll.setCandidates(StreamSupport.stream(userRepository.findAll().spliterator(), false)
                    .collect(Collectors.toList()));
            votePollRepository.save(poll);

            log.info("Vote polls created(9).");
        }
    }



//    private User createBasicUser() {
//        log.info("Creating Basic user");
//
//        User basic = new User();
//        basic.setEmail("basic@basic.com");
//        basic.setFirstName("basic");
//        basic.setLastName("basic");
//        basic.setLogin("basic");
//        basic.setPasswordHash("{bcrypt}" + new BCryptPasswordEncoder().encode("1q2w3e"));
//        basic.setRoles(Arrays.asList(userRole));
//
//        return userRepository.save(basic);
//    }

//    private void createVotePoll(User user) {
//        VotePoll votePoll = new VotePoll();
//
//        votePoll.setOwner(user);
//        votePoll.setShortDescription("Short");
//        votePoll.setLongDescription("Long");
//        votePoll.setAnnounceDate(new Date(1));
//        votePoll.setVoteStartDate(new Date(2));
//        votePoll.setVoteEndDate(new Date(3));
//        votePoll.setPublishResultDate(new Date(4));
//
//        Voteable vot1 = new Voteable();
//        vot1.setValue("Value1 no reference");
//
//        Voteable vot2 = new Voteable();
//        vot2.setValue(adminUser.getFirstName() + " " + adminUser.getLastName());
//        vot2.setUserReference(adminUser);
//
//        votePoll.setVoteables(Arrays.asList(vot1, vot2));
//
//        votePollRepository.save(votePoll);
//    }

//    private void createTestUsers() {
//        createUsers(5);
//    }
//
//    private void createUsers(int count) {
//        for (int i = 0; i < count; i++) {
//            log.info("Creating user {}", i);
//            User user = new User();
//            user.setEmail(i + "@" + i + ".pl");
//            user.setFirstName(Integer.toString(i) + "Name");
//            user.setLastName(Integer.toString(i) + "Name");
//            user.setLogin(Integer.toString(i) + "Name");
//            user.setPasswordHash("{bcrypt}" + new BCryptPasswordEncoder().encode("1q2w3e"));
//            user.setRoles(Arrays.asList(userRole));
//            userRepository.save(user);
//        }
//    }
}
