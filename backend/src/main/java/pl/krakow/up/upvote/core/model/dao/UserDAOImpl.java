package pl.krakow.up.upvote.core.model.dao;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import pl.krakow.up.upvote.core.model.User;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class UserDAOImpl extends GenericDAOImpl<User, Long>
        implements UserDAO {

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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails = null;
        User user = findByEmail(username);

        if(user != null) {
            userDetails = new UserDetails() {
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return new ArrayList<>();
                }

                @Override
                public String getPassword() {
                    return "1q2w3e";
                }

                @Override
                public String getUsername() {
                    return username;
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

        return null;
    }
}