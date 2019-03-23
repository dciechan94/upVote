package pl.krakow.up.upvote.core.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "EV_VotePoll")
@Table(indexes ={
        @Index(name = "index-name",  columnList="name", unique = true)
})
public class VotePoll implements Persistable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "name", unique = true)
    protected String name;
    protected String shortDescription;
    protected String longDescription;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="creator_id")
    protected User createdBy;

    protected Date createDate;
    protected Date announceDate;
    protected Date voteStartDate;
    protected Date voteEndDate;
    protected Date publishResultDate;

    @OneToMany(mappedBy = "belongsToVotepoll")
    protected List<Voteable> voteables;

    @ManyToMany
    @JoinTable(name = "EV_users_invitedIn_votePoll",
            joinColumns = @JoinColumn(name = "votepoll_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    protected List<User> invitedVoters;


    public VotePoll() {
    }

    @PreRemove
    private void preRemoveAction() {
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getAnnounceDate() {
        return announceDate;
    }

    public void setAnnounceDate(Date announceDate) {
        this.announceDate = announceDate;
    }

    public Date getVoteStartDate() {
        return voteStartDate;
    }

    public void setVoteStartDate(Date voteStartDate) {
        this.voteStartDate = voteStartDate;
    }

    public Date getVoteEndDate() {
        return voteEndDate;
    }

    public void setVoteEndDate(Date voteEndDate) {
        this.voteEndDate = voteEndDate;
    }

    public Date getPublishResultDate() {
        return publishResultDate;
    }

    public void setPublishResultDate(Date publishResultDate) {
        this.publishResultDate = publishResultDate;
    }

    public List<Voteable> getVoteables() {
        return voteables;
    }

    public void setVoteables(List<Voteable> voteables) {
        this.voteables = voteables;
    }

    public List<User> getInvitedVoters() {
        return invitedVoters;
    }

    public void setInvitedVoters(List<User> invitedVoters) {
        this.invitedVoters = invitedVoters;
    }
}
