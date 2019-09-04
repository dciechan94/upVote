package pl.krakow.up.vote.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@Table(name = "USER")
public class User extends AbstractObject {

    @Column(unique = true)
    private String login;

    @Column(unique = true)
    private String email;

    private String firstName;
    private String lastName;
    private String passwordHash;

    @ManyToMany
    @JoinTable(name = "USERS_ROLES",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false, updatable = false)
    )
    private List<Role> roles;

    @OneToMany(mappedBy = "voteOption")
    private List<Vote> receivedVotes;

//    @ManyToMany(mappedBy = "invitedVoters")
//    private List<VotePoll> invitedToVotePolls;

    @ManyToMany(mappedBy = "candidates")
    private List<VotePoll> candidateInPolls;

    @OneToMany(mappedBy = "owner")
    private List<VotePoll> createdVotePolls;

    @OneToMany(mappedBy = "voter")
    private List<Vote> madeVotes;


    @PreRemove
    private void preRemoveAction() {
//        for (Role role : roles) {
//            role.getUsers().remove(this);
//        }
//        for (VotePoll votePoll : createdVotePolls) {
//            votePoll.setOwner(null);
//        }
//        for (Vote vote : madeVotes) {
//            vote.setVoter(null);
//        }
    }
}
