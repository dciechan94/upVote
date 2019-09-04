package pl.krakow.up.vote.api.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import pl.krakow.up.vote.api.model.annotations.BGField;
import pl.krakow.up.vote.api.model.annotations.BGType;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@BGType(name = ObjectType.Constants.ROLE)
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class RoleDTO extends CoreObject {

    @NotNull
    @NotEmpty
    @BGField(name = "name", type = String.class)
    String name;

    public RoleDTO() {
        super(ObjectType.role);
    }
}
