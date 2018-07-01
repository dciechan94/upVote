package pl.krakow.up.upvote.core.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.stereotype.Component;

@Component
public class AppClosedListener implements ApplicationListener<ContextClosedEvent> {
    private static final Logger LOGGER = LogManager.getLogger(AppStartedListener.class);

    @Override
    public void onApplicationEvent(final ContextClosedEvent event) {
        LOGGER.info("Executing custom onApplicationClose actions");
    }
}
