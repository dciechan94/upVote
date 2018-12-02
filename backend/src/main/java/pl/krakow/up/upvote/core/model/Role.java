package pl.krakow.up.upvote.core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "EV_Role")
public class Role implements Persistable {

    @Id
    @GeneratedValue
    protected Long id;

    @Column(name = "name", unique = true)
    protected String name;

    @Override
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
