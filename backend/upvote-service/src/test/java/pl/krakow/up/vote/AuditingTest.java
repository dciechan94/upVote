package pl.krakow.up.vote;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import pl.krakow.up.vote.common.Constants;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.repository.UserRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, properties = { Constants.SPRING_LOCAL_PROFILE })
public class AuditingTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EntityManager entityManager;

    @SuppressWarnings("static-access")
    @Test
    @Transactional
    public void basicTest() throws InterruptedException {

        User user = new User();
        user.setLogin("ow123");
        user = userRepository.save(user);
        entityManager.flush();

        Date created = user.getCreated();
        assertTrue(user.getModified().compareTo(user.getCreated()) == 0);
        assertTrue(user.getCreated().compareTo(new Date()) < 0);
        assertNotNull(user.getModifier());
        assertNotNull(user.getCreator());

        Thread.currentThread().sleep(1000);

        User userToModify = userRepository.findById(user.getId()).get();
        //userToModify.setDescription("ddd");
        userToModify = userRepository.save(userToModify);
        entityManager.flush();

        assertTrue(userToModify.getModified().compareTo(userToModify.getCreated()) > 0);
        assertTrue(userToModify.getCreated().compareTo(created) == 0);
    }
}
