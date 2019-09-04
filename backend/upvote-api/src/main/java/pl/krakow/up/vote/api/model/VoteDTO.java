package pl.krakow.up.vote.api.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class VoteDTO extends CoreObject {

    private Long id;
    private Long voter;
    private Long voteTargetId;
    private Long parentPollId;

    public VoteDTO() {
        super(ObjectType.vote);
    }
}
