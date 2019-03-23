package pl.krakow.up.upvote.core.model.dao;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pl.krakow.up.upvote.core.model.Role;
import pl.krakow.up.upvote.core.model.User;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDAOImpl extends GenericDAOImpl<User, Long>
        implements UserDAO {

    private static final Logger LOGGER = LogManager.getLogger(UserDAOImpl.class);


    public UserDAOImpl() {
        super(User.class);
    }

    @Override
    public User findByEmail(String email) {
        CriteriaQuery<User> c = em.getCriteriaBuilder().createQuery(entityClass);
        Root<User> root = c.from(entityClass);
        Predicate predicate = em.getCriteriaBuilder().equal(root.get("email"), email);
        CriteriaQuery<User> select = c.select(root).where(predicate);

        List<User> usersFound = em.createQuery(select).getResultList();

        if(usersFound.size() > 0) {
            return usersFound.get(0);
        }
        return null;
    }

    @Override
    public void remove(Long id) {
        em.getTransaction().begin();
        User user = findById(id);
        em.refresh(user);
        em.remove(user);
        em.getTransaction().commit();
    }

    @Override
    public void removeAll() {
//        em.getTransaction().begin();
//        List<Role> roles = findAll();
//
//        for(Role role : roles) {
//            List<User> usersWithRole = role.getUsers();
//
//            for(User user : usersWithRole) {
//                user.getRoles().remove(role);
//            }
//            em.remove(role);
//        }
//        em.getTransaction().commit();
    }

    @Override
    public void addRole(User user, Role role) {
        user.getRoles().add(role);
        role.getUsers().add(user);
    }

    @Override
    public UserDetails loadUserByUsername(String emailAddress) throws UsernameNotFoundException {
        LOGGER.debug("Authentication - Fetching user details for email {}", emailAddress);
        UserDetails userDetails;
        User user = findByEmail(emailAddress);

        if(user != null) {
            LOGGER.debug("Authentication - User found: {}", emailAddress);
            userDetails = new UserDetails() {
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return new ArrayList<>();
                }

                @Override
                public String getPassword() {
                    return user.getPasswordHash();
                }

                @Override
                public String getUsername() {
                    return emailAddress;
                }

                @Override
                public boolean isAccountNonExpired() {
                    return true;
                }

                @Override
                public boolean isAccountNonLocked() {
                    return true;
                }

                @Override
                public boolean isCredentialsNonExpired() {
                    return true;
                }

                @Override
                public boolean isEnabled() {
                    return true;
                }
            };
            return userDetails;
        }
        LOGGER.debug("Authentication - User not found");
        return null;
    }
}