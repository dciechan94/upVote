//package pl.krakow.up.vote.imp;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//import java.io.InputStream;
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.List;
//import java.util.Set;
//
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import pl.krakow.up.vote.common.Constants;
//import pl.krakow.up.vote.imp.store.CADefinitionsRecoder;
//import pl.krakow.up.vote.DataPreloader;
//import pl.krakow.up.vote.GlossarypocApplication;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, properties = { 
//    Constants.SPRING_LOCAL_PROFILE, "import.batch_size = 1000"})
//@ContextConfiguration(inheritLocations = false, classes = {
//    Importer.class,
//    ImportProperties.class,
//    DataPreloader.class,
//    CADefinitionsRecoder.class,
//    CustomAttributeServiceImpl.class,
//    EntityServiceImpl.class,
//    GlossarypocApplication.class
//})
//public class ImportWithPersistenceBatch1000Test {
//
//    @Autowired
//    protected Importer importer;
//
//    @Autowired
//    private ImportService importService;
//
//    @Autowired
//    private CustomAttributeService caService;
//
//    @AfterEach
//    protected void deleteData() {
//        importService.deleteAll();
//        caService.deleteAll();
//    }
//
//    @Test
//    public void testBasicImport() throws Exception {
//        InputStream is = getClass().getClassLoader().getResourceAsStream("terms_with_ca.xml");
//        importer.importXml(is);
//
//        List<Term> terms = importService.getAllTermsCascade();
//        assertEquals(3, terms.size());
//        Term t1 = getTermByName(terms, "Term1");
//        assertEquals(2, t1.getCustomAttrs().size());
//        assertEquals("6662c0f2.e1b1ec6c.ji26haavj.g4hf8aq.9nt8h3.ppaa7f1ntjc6celi0ftc7", t1.getNativeId());
//        
//        CustomAttribute caEnum = getCAByName(t1.getCustomAttrs(), "CAEnum");
//        assertEquals(1, caEnum.getValues().size());
//        assertEquals("V2", caEnum.getValues().iterator().next().getEnumValue().getName());
//
//        CustomAttribute txtEnum = getCAByName(t1.getCustomAttrs(), "CAText");
//        assertEquals(2, txtEnum.getValues().size());
//        assertTrue(txtEnum.getValues().stream().anyMatch(v -> v.getTextValue().equals("Text1")));
//        assertTrue(txtEnum.getValues().stream().anyMatch(v -> v.getTextValue().equals("Text2")));
//        
//        //check relations
//        Term t2 = getTermByName(terms, "Term2");
//        Term t3 = getTermByName(terms, "Term3");
//        assertRelations(t1.getIsTypeOf(), "Term2");
//        assertRelations(t1.getHasTypes(), "Term3");
//
//        assertEquals(1, t2.getHasTypes().size());
//        assertEquals(1, t2.getIsTypeOf().size());
//
//        assertEquals(1, t3.getHasTypes().size());
//        assertEquals(1, t3.getIsTypeOf().size());
//        
//        List<RelationshipTermHasTypes> fcRelations = importService.getAllRelations();
//        assertEquals(3, fcRelations.size());
//        fcRelations.forEach(r -> assertTrue(!r.getPlaceholder()));
//    }
//    
//    @Test
//    public void caDefChangeWithNativeId() throws Exception {
//        InputStream is = getClass().getClassLoader().getResourceAsStream("terms_with_ca.xml");
//        importer.importXml(is);
//        is = getClass().getClassLoader().getResourceAsStream("ca_update.xml");
//        importer.importXml(is);
//        
//        List<CustomAttributeDefinition> definitions = caService.getAllDefinitions();
//        assertEquals(2, definitions.size());
//        CustomAttributeDefinition enumDef = definitions.stream().filter(d -> d.getName().equals("CAEnum")).findFirst().get();
//        Set<CustomAttributeDefElement> elements = enumDef.getElements();
//        assertEquals(3, elements.size());
//        assertTrue(elements.stream().anyMatch(e -> e.getName().equals("V1")));
//        assertTrue(elements.stream().anyMatch(e -> e.getName().equals("V3")));
//        assertTrue(elements.stream().anyMatch(e -> e.getName().equals("V4")));
//        
//        List<Term> terms = importService.getAllTermsCascade();
//        //Term t1 = getTermByName(terms, "Term1");
//        //assertEquals(1, t1.getCustomAttrs().size());
//        Term t3 = getTermByName(terms, "Term3");
//        CustomAttribute caEnum = getCAByName(t3.getCustomAttrs(), "CAEnum");
//        assertEquals(1, caEnum.getValues().size());
//        assertEquals("V1", caEnum.getValues().iterator().next().getEnumValue().getName());
//    }
//    
//    @Test
//    public void caDefChangeWithName() throws Exception {
//        InputStream is = getClass().getClassLoader().getResourceAsStream("ca_update1.xml");
//        importer.importXml(is);
//        is = getClass().getClassLoader().getResourceAsStream("ca_update2.xml");
//        importer.importXml(is);
//        
//        List<CustomAttributeDefinition> definitions = caService.getAllDefinitions();
//        assertEquals(3, definitions.size());
//        assertTrue(definitions.stream().anyMatch(d -> d.getName().equals("External Document Reference")));
//        assertTrue(definitions.stream().anyMatch(d -> d.getName().equals("Decomposition")));
//        CustomAttributeDefinition enumDef = definitions.stream().filter(d -> d.getName().equals("Formula")).findFirst().get();
//        assertEquals("Calculation expression details.", enumDef.getDescription());
//    }
//
//    @Test
//    public void testImportOtherFormat() throws Exception {
//        InputStream is = getClass().getClassLoader().getResourceAsStream("terms_with_ca2.xml");
//        importer.importXml(is);
//
//        List<Term> terms = importService.getAllTermsCascade();
//        assertEquals(2, terms.size());
//        Term t1 = getTermByName(terms, "Net increase funds sold & repurchase agreements");
//        assertEquals("A measure that identifies income earned by the Financial Institution from the sale of cash to other "
//            + "Financial Institutions and the sale of securities to investors with the express intention to buy back.",
//            t1.getDescription());
//        assertEquals(2, t1.getCustomAttrs().size());
//        assertEquals("6662c0f2.e1b1ec6c.16932bf7.383c3e38-a79b-4b8a.9043.937ac493433a", t1.getNativeId());
//
//        CustomAttribute ca = getCAByName(t1.getCustomAttrs(), "Formula");
//        assertEquals(1, ca.getValues().size());
//        assertTrue(ca.getValues().stream().anyMatch(v -> v.getTextValue().equals("\"Common Stock Repurchased\" + \"Funds Sold\"")));
//
//        ca = getCAByName(t1.getCustomAttrs(), "Decomposition");
//        assertEquals(1, ca.getValues().size());
//        assertTrue(ca.getValues().stream().anyMatch(v -> v.getTextValue().equals("- Net Increase Funds Sold & Repurchase Agreements")));
//    }
//    
//    @Test
//    public void testMergeSimpleRelations() throws Exception {
//        InputStream is = getClass().getClassLoader().getResourceAsStream("terms_with_rels_simple1.xml");
//        importer.importXml(is);
//        is = getClass().getClassLoader().getResourceAsStream("terms_with_rels_simple2.xml");
//        importer.importXml(is);
//
//        List<Term> terms = importService.getAllTermsCascade();
//        assertEquals(2, terms.size());
//        Term t1 = getTermByName(terms, "Term1");
//        Term t2 = getTermByName(terms, "Term2");
//        
//        assertRelations(t1.getIsTypeOf());
//        assertRelations(t2.getIsTypeOf(), "Term1");
//        
//        assertRelations(t1.getHasTypes(), "Term2");
//        assertRelations(t2.getHasTypes());
//    }
//    
//    @Test
//    public void testMergeRelations() throws Exception {
//        InputStream is = getClass().getClassLoader().getResourceAsStream("terms_with_rels1.xml");
//        importer.importXml(is);
//        is = getClass().getClassLoader().getResourceAsStream("terms_with_rels2.xml");
//        importer.importXml(is);
//
//        List<Term> terms = importService.getAllTermsCascade();
//        assertEquals(4, terms.size());
//        Term t1 = getTermByName(terms, "Term1");
//        Term t2 = getTermByName(terms, "Term2");
//        Term t3 = getTermByName(terms, "Term3");
//        Term t4 = getTermByName(terms, "Term4");
//        
//        assertRelations(t1.getIsTypeOf(), "Term2", "Term4");
//        assertRelations(t2.getIsTypeOf(), "Term3");
//        assertRelations(t3.getIsTypeOf(), "Term1", "Term2");
//        assertRelations(t4.getIsTypeOf());
//        
//        assertRelations(t1.getHasTypes(), "Term3");
//        assertRelations(t2.getHasTypes(), "Term1", "Term3");
//        assertRelations(t3.getHasTypes(), "Term2");
//        assertRelations(t4.getHasTypes(), "Term1");
//    }
//
//    private void assertRelations(Set<Term> relatedTerms, String... relatedTermNames) {
//        assertEquals(relatedTermNames.length, relatedTerms == null ? 0 : relatedTerms.size());
//        Arrays.stream(relatedTermNames).forEach(n -> assertTrue(relatedTerms.stream().anyMatch(t -> t.getName().equals(n)), 
//            "relation to " + n + " not found"));
//    }
//    
//    private Term getTermByName(List<Term> terms, String name) {
//        return terms.stream().map(e -> (Term) e).filter(t -> t.getName().equals(name)).findFirst().get();
//    }
//
//    private CustomAttribute getCAByName(Collection<CustomAttribute> cas, String name) {
//        return cas.stream().filter(ca -> ca.getDefinition().getName().equals(name)).findFirst().get();
//    }
//}
