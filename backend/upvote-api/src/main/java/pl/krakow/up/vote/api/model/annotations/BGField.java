package pl.krakow.up.vote.api.model.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface BGField {

    public class None {
    };

    String name();

    Mode[] mode() default { Mode.EDIT, Mode.VIEW, Mode.CREATE };

    Class<?> type();

    Class<?> collectionOf() default None.class;
}
