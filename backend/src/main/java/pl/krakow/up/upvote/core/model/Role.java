package pl.krakow.up.upvote.core.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "EV_Role")
public class Role implements Persistable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "name", unique = true)
    protected String name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    protected final List<User> users = new ArrayList<>();


    @PreRemove
    protected void preRemoveAction() {
        for (User user : users) {
            user.getRoles().remove(this);
        }
    }

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

    public void setId(Long id) {
        this.id = id;
    }

    public List<User> getUsers() {
        return users;
    }
}
