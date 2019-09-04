package pl.krakow.up.vote.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@Table(name = "VOTE_POLL")
public class VotePoll extends AbstractObject {

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User owner;


    private Date announceDate;
    private Date voteStartDate;
    private Date voteEndDate;
    private Date publishResultDate;

    @ManyToMany
    @JoinTable(name = "USERS_CANDIDATES_IN_VOTE_POLL",
            joinColumns = @JoinColumn(name = "vote_poll_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> candidates;

    @OneToMany(mappedBy = "parentVotePoll")
    private List<Vote> votes;

//    @ManyToMany
//    @JoinTable(name = "USERS_INVITED_IN_VOTE_POLL",
//            joinColumns = @JoinColumn(name = "vote_poll_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id")
//    )
//    private List<User> invitedVoters;


    @PreRemove
    private void preRemoveAction() {
    }

    public Date getAnnounceDate() {
        if (this.announceDate != null) {
            return new Date(this.announceDate.getTime());
        }
        return null;
    }

    public Date getVoteStartDate() {
        if (this.voteStartDate != null) {
            return new Date(this.voteStartDate.getTime());
        }
        return null;
    }

    public Date getVoteEndDate() {
        if (this.voteEndDate != null) {
            return new Date(this.voteEndDate.getTime());
        }
        return null;
    }

    public Date getPublishResultDate() {
        if (this.publishResultDate != null) {
            return new Date(this.publishResultDate.getTime());
        }
        return null;
    }
}
