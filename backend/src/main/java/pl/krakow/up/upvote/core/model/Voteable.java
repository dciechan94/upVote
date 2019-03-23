package pl.krakow.up.upvote.core.model;

import javax.persistence.*;

@Entity(name = "EV_Voteable")
public class Voteable implements Persistable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected String value;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "user_reference_id", foreignKey = @ForeignKey(name = "fk_user_reference_id"))
    protected User userReference;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "votepoll_parent_id", foreignKey = @ForeignKey(name = "fk_votepoll_parent_id"))
    protected VotePoll belongsToVotepoll;


    @PreRemove
    private void preRemoveAction() {
        userReference.getReferencedInVoteables().remove(this);
        belongsToVotepoll.getVoteables().remove(this);
    }

    @Override
    public Long getId() {
        return id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public User getUserReference() {
        return userReference;
    }

    public void setUserReference(User userReference) {
        this.userReference = userReference;
    }

    public VotePoll getBelongsToVotepoll() {
        return belongsToVotepoll;
    }

    public void setBelongsToVotepoll(VotePoll belongsToVotepoll) {
        this.belongsToVotepoll = belongsToVotepoll;
    }
}
