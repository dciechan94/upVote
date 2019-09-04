package pl.krakow.up.vote.api.controller;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.vote.api.model.annotations.BGField;
import pl.krakow.up.vote.api.model.annotations.BGField.None;
import pl.krakow.up.vote.api.model.annotations.Mode;
import pl.krakow.up.vote.api.reflections.AnnotatedClass;
import pl.krakow.up.vote.api.reflections.ReflectionManager;

import javax.validation.constraints.*;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/types")
public class TypesController {

    @Data
    @AllArgsConstructor
    @JsonInclude(Include.NON_NULL)
    static class FieldInfo {
        String clazz;
        String collectionOf;
        Boolean notNull;
        Boolean notEmpty;
        Long min;
        Long max;
        Integer sizeMin;
        Integer sizeMaX;
        String pattern;
    }

    @Autowired
    ReflectionManager refManager;

    @GetMapping(produces = "application/json")
    public ResponseEntity<Collection<String>> getTypes() {
        return ResponseEntity.ok(refManager.getAnnotatedClasses().keySet());
    }

    @GetMapping(value = "/{type}", produces = "application/json")
    public ResponseEntity<?> getType(@PathVariable String type, @RequestParam Mode mode) {
        if (!refManager.getAnnotatedClasses().keySet().contains(type)) {
            return new ResponseEntity<>("Unknown type: " + type, HttpStatus.BAD_REQUEST);
        } else {
            Map<String, FieldInfo> fields = new HashMap<>();
            // List<String> fields = new ArrayList<>();
            AnnotatedClass ac = refManager.getAnnotatedClasses().get(type);
            for (Field f : ac.getFields().values()) {
                BGField bgField = f.getAnnotation(BGField.class);
                NotNull notNull = f.getAnnotation(NotNull.class);
                NotEmpty notEmpty = f.getAnnotation(NotEmpty.class);
                Min min = f.getAnnotation(Min.class);
                Max max = f.getAnnotation(Max.class);
                Size size = f.getAnnotation(Size.class);
                Pattern pattern = f.getAnnotation(Pattern.class);
                if (null != bgField && Arrays.asList(bgField.mode()).contains(mode)) {
                    fields.put(bgField.name(),
                            new FieldInfo(
                                    bgField.type().getSimpleName(),
                                    !bgField.collectionOf().equals(None.class) ? bgField.collectionOf().getSimpleName() : null,
                                    notNull != null ? Boolean.TRUE : null,
                                    notEmpty != null ? Boolean.TRUE : null,
                                    min != null ? Long.valueOf(min.value()) : null,
                                    max != null ? Long.valueOf(max.value()) : null,
                                    size != null ? Integer.valueOf(size.min()) : null,
                                    size != null ? Integer.valueOf(size.max()) : null,
                                    pattern != null ? pattern.regexp() : null
                            )
                    );
                }
            }
            return ResponseEntity.ok(fields);
        }
    }
}
