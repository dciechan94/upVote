package pl.krakow.up.upvote.core.model;

import javax.persistence.*;
import java.util.List;

@Entity(name = "EV_VoteOption")
public class VoteOption {

    @Id
    @GeneratedValue
    protected Long id;

    @OneToMany(fetch=FetchType.EAGER)
    protected List<User> votedBy;

    protected String name;


    public Long getId() {
        return id;
    }

    public List<User> getVotedBy() {
        return votedBy;
    }

    public void setVotedBy(List<User> votedBy) {
        this.votedBy = votedBy;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
