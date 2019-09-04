package pl.krakow.up.vote.common;

public class Constants {
    /**
     * Local override properties lookup location for spring boot application.
     */
    public static final String SPRING_LOCAL_PROPERTIES = "classpath:application-local.properties";
    
    /**
     * Activate local profile for SpringBootTest
     */
    public static final String SPRING_LOCAL_PROFILE = "spring.profiles.active=local";
}
