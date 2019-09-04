package pl.krakow.up.vote.api.reflections;

import java.lang.reflect.Field;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnnotatedClass {

    private Class<?> clazz;
    private Map<String, Field> fields;

}
