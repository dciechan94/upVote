package pl.krakow.up.vote.api.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import pl.krakow.up.vote.api.model.annotations.BGField;
import pl.krakow.up.vote.api.model.annotations.BGType;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@BGType(name = ObjectType.Constants.USER)
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class UserDTO extends CoreObject {

    private String firstName;
    private String lastName;
    private String email;
    private String login;
    private String passwordHash;
    private List<String> roles;


    public UserDTO() {
        super(ObjectType.user);
    }
}
