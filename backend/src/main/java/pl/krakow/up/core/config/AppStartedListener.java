package pl.krakow.up.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class AppStartedListener implements ApplicationListener<ContextRefreshedEvent> {
    private static final Logger LOGGER = LogManager.getLogger(AppStartedListener.class);


    @Override
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        LOGGER.info("Executing custom onApplicationStart actions");
    }
}