package pl.krakow.up.upvote.core.model;

import org.hibernate.validator.constraints.Email;
import pl.krakow.up.upvote.core.model.exceptions.UserConstants;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "EV_User")
@Table(indexes ={
        @Index(name = "index-email",  columnList="email", unique = true)
})
public class User implements Persistable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @NotNull(message = UserConstants.ERROR_USER_USERNAME_NULL)
    @Size(
            min = 2,
            max = 255,
            message = UserConstants.ERROR_USER_USERNAME_INVALID_LENGTH
    )
    protected String userName;

    @NotNull(message = UserConstants.ERROR_USER_EMAIL_NULL)
    @Email(message = UserConstants.ERROR_USER_EMAIL_INVALID_FORMAT)
    @Column(name = "email", unique = true)
    protected String email;

    @NotNull(message = UserConstants.ERROR_USER_PASSWORD_HASH_NULL)
    protected String passwordHash;

    @NotNull(message = UserConstants.ERROR_USER_FIRST_NAME_NULL)
    @Size(
            min = 2,
            max = 255,
            message = UserConstants.ERROR_USER_FIRST_NAME_INVALID_LENGTH
    )
    protected String firstName;

    @NotNull(message = UserConstants.ERROR_USER_LAST_NAME_NULL)
    @Size(
            min = 2,
            max = 255,
            message = UserConstants.ERROR_USER_LAST_NAME_INVALID_LENGTH
    )
    protected String lastName;


    @ManyToMany(targetEntity = Role.class)
    @JoinTable(name = "EV_users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false, updatable = false)
    )
    protected final List<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy= "userReference", fetch = FetchType.LAZY)
    protected final List<Voteable> referencedInVoteables = new ArrayList<>();

    @ManyToMany(mappedBy = "invitedVoters", fetch = FetchType.LAZY)
    protected final List<VotePoll> invitedToVotepolls = new ArrayList<>();

    @OneToMany(mappedBy = "createdBy", fetch = FetchType.LAZY)
    protected final List<VotePoll> createdVotePolls = new ArrayList<>();

    @OneToMany(mappedBy = "voter", fetch = FetchType.LAZY)
    protected final List<Vote> madeVotes = new ArrayList<>();


    public User() {
    }

    @PreRemove
    private void preRemoveAction() {
        for(Role role : roles) {
            role.getUsers().remove(this);
        }
        for(Voteable voteable : referencedInVoteables) {
            voteable.setUserReference(null);
        }
        for(VotePoll votePoll : createdVotePolls) {
            votePoll.setCreatedBy(null);
        }
        for(VotePoll votePoll : invitedToVotepolls) {
            votePoll.getInvitedVoters().remove(this);
        }
        for(Vote vote : madeVotes) {
            vote.setVoter(null);
        }
    }

    public Long getId() { // Optional but useful
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public List<Voteable> getReferencedInVoteables() {
        return referencedInVoteables;
    }

    public List<VotePoll> getInvitedToVotepolls() {
        return invitedToVotepolls;
    }

    public List<VotePoll> getCreatedVotePolls() {
        return createdVotePolls;
    }

    public List<Vote> getMadeVotes() {
        return madeVotes;
    }

    @Override
    public String toString() {
        return "Id: " + getId() + ", username: " + getUserName();
    }
}
