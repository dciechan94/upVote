package pl.krakow.up.vote.api.model.converter;

import java.util.Map;

import pl.krakow.up.vote.model.AbstractObject;
import pl.krakow.up.vote.api.model.CoreObject;

public interface ApiObjectConverter<T extends CoreObject, K extends AbstractObject> {

    T toApiObject(K modelEntity, Map<Long, CoreObject> internalApiCache);

    K toModelObject(T apiEntity, Map<Long, AbstractObject> internalModelCache);

}
