package pl.krakow.up.vote.api.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import pl.krakow.up.vote.api.model.annotations.BGField;
import pl.krakow.up.vote.api.model.annotations.BGType;

import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Map;

@BGType(name = ObjectType.Constants.VOTE_POLL)
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class VotePollDTO extends CoreObject {

    private String name;
    private String description;
    private Long startDate;
    private Long endDate;
    private Long publishDate;
    private List<UserDTO> candidates;
    private Map<Long, Long> results;

    public VotePollDTO() {
        super(ObjectType.vote_poll);
    }
}
