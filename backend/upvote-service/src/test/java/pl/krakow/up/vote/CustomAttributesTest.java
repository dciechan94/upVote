package pl.krakow.up.vote;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import pl.krakow.up.vote.common.Constants;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, properties = { Constants.SPRING_LOCAL_PROFILE })
public class CustomAttributesTest {
//    @Autowired
//    private CustomAttributeService service;
//    
//    @Autowired
//    private AssetTypeRepository assetTypeRepo;
//
//    @Test
//    public void basicTest() {
//        AssetType type = assetTypeRepo.findByName("TERM");
//
//        pl.krakow.up.vote.model.CustomAttributeDefinition def = new pl.krakow.up.vote.model.CustomAttributeDefinition();
//        def.setName("testDef1");
//        def.setDescription("desc1");
//        def.setType(CustomAttributeType.TEXT);
//        def.setAssetTypes(Collections.singleton(type));
//        service.storeDefinition(def);
//
//        def = new pl.krakow.up.vote.model.CustomAttributeDefinition();
//        def.setName("testDef2");
//        def.setDescription("desc2");
//        def.setType(CustomAttributeType.ENUM);
//        service.storeDefinition(def);
//
//        List<pl.krakow.up.vote.model.CustomAttributeDefinition> definitions = service.getAllDefinitions();
//        assertEquals(2, definitions.size());
//        def = definitions.stream().filter(d -> d.getName().equals("testDef1")).findAny().get();
//        assertEquals(CustomAttributeType.TEXT, def.getType());
//        assertEquals(1, def.getAssetTypes().size());
//        assertEquals("TERM", def.getAssetTypes().iterator().next().getName());
//    }
}
