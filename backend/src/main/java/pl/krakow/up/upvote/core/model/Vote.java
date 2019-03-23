package pl.krakow.up.upvote.core.model;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "EV_Vote")
public class Vote implements Persistable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    protected User voter;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="voteable_id")
    protected Voteable voteable;

    protected Date date;


    @Override
    public Long getId() {
        return id;
    }

    public User getVoter() {
        return voter;
    }

    public void setVoter(User voter) {
        this.voter = voter;
    }

    public Voteable getVoteable() {
        return voteable;
    }

    public void setVoteable(Voteable voteable) {
        this.voteable = voteable;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
