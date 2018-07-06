package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.User;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Arrays;
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
}