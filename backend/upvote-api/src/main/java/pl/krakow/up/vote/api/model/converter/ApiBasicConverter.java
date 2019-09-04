package pl.krakow.up.vote.api.model.converter;

import java.net.URI;
import java.util.Date;

import org.springframework.web.util.UriComponentsBuilder;

import pl.krakow.up.vote.model.AbstractObject;
import pl.krakow.up.vote.api.model.CoreObject;

public abstract class ApiBasicConverter {

    public abstract URI getBaseUri();

    public void copyBasicProperties(CoreObject from, AbstractObject to) {
        if (from.getId() != null) {
            to.setId(from.getId());
        }
        to.setModified(new Date());
        if (from.getModifier() != null) {
            to.setModifier(from.getModifier());
        }
    }

    public void copyBasicProperties(AbstractObject from, CoreObject to) {
        to.setId(from.getId());
        to.setCreated(from.getCreated());
        to.setCreator(from.getCreator());
        to.setModified(from.getModified());
        to.setModifier(from.getModifier());
        to.setUri(buildUrl(to.getId()));
    }

    private URI buildUrl(Long id) {
        URI uri = getBaseUri();
        if (uri != null) {
            uri = UriComponentsBuilder.fromUri(getBaseUri()).path("/").path(id.toString()).build().toUri();
        }
        return uri;
    }
}
