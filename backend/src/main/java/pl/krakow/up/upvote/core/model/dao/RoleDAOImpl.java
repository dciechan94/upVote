package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.Role;
import pl.krakow.up.upvote.core.model.User;

import java.util.List;

public class RoleDAOImpl extends GenericDAOImpl<Role, Long>
        implements RoleDAO {

    public RoleDAOImpl() {
        super(Role.class);
    }

    @Override
    public void removeAll() {
        em.getTransaction().begin();
        List<Role> roles = findAll();

        for(Role role : roles) {
            List<User> usersWithRole = role.getUsers();

            for(User user : usersWithRole) {
                user.getRoles().remove(role);
                em.merge(user);
            }
            em.remove(role);
        }

        em.getTransaction().commit();
    }


//
//    public void addRole(Role role) {
//        roles.add(role);
//        role.getUsers().add(this);
//    }

//    public void removeRole(Role role) {
//
//        roles.remove(role);
//        for (User user : role.getUsers()users) {
//            user.groups.remove(group);
//        }
//
//        for (Iterator<Role> iterator = roles.iterator(); iterator.hasNext(); ) {
//            Role appliedRole = iterator.next();
//
//            if (appliedRole.getPost().equals(this) &&
//                    postTag.getTag().equals(tag)) {
//                iterator.remove();
//                postTag.getTag().getPosts().remove(postTag);
//                postTag.setPost(null);
//                postTag.setTag(null);
//            }
//        }
//    }

}