package pl.krakow.up.vote.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@Table(name = "ROLE")
public class Role extends AbstractObject {

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private List<User> users;

    @PreRemove
    protected void preRemoveAction() {
        for (User user : users) {
            if(user.getRoles() != null) {
                user.getRoles().remove(this);
            }
        }
    }
}

