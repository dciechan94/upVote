package pl.krakow.up.vote;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collections;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import pl.krakow.up.vote.common.Constants;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, properties = { Constants.SPRING_LOCAL_PROFILE })
@Transactional
public class RelationshipTest {

//    @Autowired
//    RelationshipTermHasARepository relRepository;
//
//    @Autowired
//    TermRepository termRepository;
//
//    @Test
//    public void basicTest() {
//        pl.krakow.up.vote.model.Term t1 = new pl.krakow.up.vote.model.Term();
//        termRepository.save(t1);
//        pl.krakow.up.vote.model.Term t2 = new pl.krakow.up.vote.model.Term();
//        t2.setHasA(Collections.singleton(t1));
//        termRepository.save(t2);
//
//        RelationshipTermHasA rel1 = new RelationshipTermHasA();
//        final String description = "my relationship";
//        rel1.setDescription(description);
//        rel1.setSourceEntity(123l);
//        rel1.setTargetEntity(456l);
//        rel1.setSourceEntity(t2.getId());
//        rel1.setTargetEntity(t1.getId());
//        rel1 = relRepository.save(rel1);
//
//        RelationshipTermHasA rel2 = relRepository.findById(rel1.getId()).get();
//
//        assertTrue(description.equals(rel2.getDescription()));
//    }
}
