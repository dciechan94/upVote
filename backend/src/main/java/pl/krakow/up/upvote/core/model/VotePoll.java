package pl.krakow.up.upvote.core.model;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity(name = "EV_VotePoll")
@Table(indexes ={
        @Index(name = "index-name",  columnList="name", unique = true)
})
public class VotePoll implements Persistable {

    @Id
    @GeneratedValue
    protected Long id;

    @Column(name = "name", unique = true)
    protected String name;
    protected String shortDescription;
    protected String longDescription;

    protected Instant creationDate;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="creator_id")
    protected User creator;

    @OneToMany(fetch = FetchType.LAZY)
    List<User> invitedUsers;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    List<VoteOption> voteOptions;

    protected Instant publishDate;
    protected Instant startVotingDate;
    protected Instant finishVotingDate;
    protected Instant resultDate;


    public VotePoll() {
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Instant getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Instant publishDate) {
        this.publishDate = publishDate;
    }

    public Instant getStartVotingDate() {
        return startVotingDate;
    }

    public void setStartVotingDate(Instant startVotingDate) {
        this.startVotingDate = startVotingDate;
    }

    public Instant getFinishVotingDate() {
        return finishVotingDate;
    }

    public void setFinishVotingDate(Instant finishVotingDate) {
        this.finishVotingDate = finishVotingDate;
    }

    public Instant getResultDate() {
        return resultDate;
    }

    public void setResultDate(Instant resultDate) {
        this.resultDate = resultDate;
    }

    public List<User> getInvitedUsers() {
        return invitedUsers;
    }

    public void setInvitedUsers(List<User> invitedUsers) {
        this.invitedUsers = invitedUsers;
    }

    public List<VoteOption> getVoteOptions() {
        return voteOptions;
    }

    public void setVoteOptions(List<VoteOption> voteOptions) {
        this.voteOptions = voteOptions;
    }
}
