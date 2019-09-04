package pl.krakow.up.vote;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

// Using data.sql spring preload behaved differently on different db configurations.  
@Component
public class DataPreloader {
    
    @PostConstruct
    private void initData() {
        //storeDefaultRoles();
        //storeAssetType(1, "TERM");
        //storeAssetType(2, "CATEGORY");
        //storeAssetType(3, "data_class");
        //storeAssetType(4, "steward");
    }
    
    private void storeAssetType(long id, String name) {
//        AssetType assetType = new AssetType();
//        assetType.setId(id);
//        assetType.setName(name);
//        customAttributeService.storeAssetType(assetType);
    }

    private void storeDefaultRoles() {

    }
}
