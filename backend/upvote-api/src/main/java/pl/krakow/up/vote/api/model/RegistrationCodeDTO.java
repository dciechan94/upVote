package pl.krakow.up.vote.api.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Getter;
import lombok.Setter;
import pl.krakow.up.vote.api.model.annotations.BGField;
import pl.krakow.up.vote.api.model.annotations.BGType;

@BGType(name = ObjectType.Constants.REGISTRATION_CODE)
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class RegistrationCodeDTO extends CoreObject {

    @BGField(name = "code", type = String.class)
    private String code;

    @BGField(name = "validDays", type = Long.class)
    private Long validDays;

    @BGField(name = "count", type = Long.class)
    private String count;

    public RegistrationCodeDTO() {
        super(ObjectType.registration_code);
    }
}
