//package pl.krakow.up.vote.imp;
//
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import pl.krakow.up.vote.common.Constants;
//
//import pl.krakow.up.vote.DataPreloader;
//import pl.krakow.up.vote.GlossarypocApplication;
//import pl.krakow.up.vote.imp.store.CADefinitionsRecoder;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, properties = { 
//    Constants.SPRING_LOCAL_PROFILE, "import.batch_size = 1"})
//@ContextConfiguration(inheritLocations = false, classes = {
//    Importer.class,
//    ImportProperties.class,
//    DataPreloader.class,
//    CADefinitionsRecoder.class,
//    CustomAttributeServiceImpl.class,
//    EntityServiceImpl.class,
//    GlossarypocApplication.class
//})
//public class ImportWithPersistenceBatch1Test extends ImportWithPersistenceBatch1000Test {
//}
