package pl.krakow.up.vote.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@Table(name = "VOTE")
public class Vote extends AbstractObject {

    @ManyToOne(fetch = FetchType.EAGER)
    protected User voter;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vote_poll_parent_id", foreignKey = @ForeignKey(name = "fk_vote_poll_parent_id"))
    protected VotePoll parentVotePoll;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="option_user_id")
    protected User voteOption;

}
