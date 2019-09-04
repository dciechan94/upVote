package pl.krakow.up.vote.api.reflections;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import pl.krakow.up.vote.api.model.annotations.BGField;
import pl.krakow.up.vote.api.model.annotations.BGType;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.Getter;

@Component
public class ReflectionManager {

    private Reflections ref;

    @Autowired
    private ObjectMapper objectMapper;

    @Getter
    private Map<String, AnnotatedClass> annotatedClasses;

    @SuppressFBWarnings({ "DP"})
    public void setFieldValue(Field field, Object object, String value) throws Exception {
        Class<?> fieldClass = field.getType();
        Object newValue = objectMapper.readValue(value, fieldClass);
        field.setAccessible(true);
        field.set(object, newValue);
    }

    public AnnotatedClass fromClazz(Class<?> clazz) {
        for (AnnotatedClass ac : annotatedClasses.values()) {
            if (ac.getClazz().equals(clazz)) {
                return ac;
            }
        }
        return null;
    }

    @PostConstruct
    private void init() {
        ref = new Reflections("pl.krakow.up.vote.api.model");
        annotatedClasses = new HashMap<>();
        for (Class<?> clazz : ref.getTypesAnnotatedWith(BGType.class)) {
            BGType type = clazz.getAnnotation(BGType.class);
            AnnotatedClass ac = new AnnotatedClass();
            ac.setClazz(clazz);
            Map<String, Field> fields = new HashMap<>();
            for (Field f : getAllClassFields(clazz)) {
                BGField bgField = f.getAnnotation(BGField.class);
                if (null != bgField) {
                    fields.put(bgField.name(), f);
                }
            }
            ac.setFields(fields);
            annotatedClasses.put(type.name(), ac);
        }
    }

    private List<Field> getAllClassFields(Class<?> clazz) {
        List<Field> fields = new ArrayList<>();
        while (clazz != Object.class) {
            fields.addAll(Arrays.asList(clazz.getDeclaredFields()));
            clazz = clazz.getSuperclass();
        }
        return fields;
    }
}
