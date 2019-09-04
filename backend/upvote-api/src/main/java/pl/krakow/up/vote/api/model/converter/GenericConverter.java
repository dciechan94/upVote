package pl.krakow.up.vote.api.model.converter;

import pl.krakow.up.vote.api.model.CoreObject;
import pl.krakow.up.vote.model.AbstractObject;

import java.util.Map;

public interface GenericConverter {

    AbstractObject toModelObject(CoreObject apiObject,
                                 Map<Long, AbstractObject> internalModelCache);

    CoreObject toApiObject(AbstractObject modelObject, Map<Long, CoreObject> internalApiCache);
}
