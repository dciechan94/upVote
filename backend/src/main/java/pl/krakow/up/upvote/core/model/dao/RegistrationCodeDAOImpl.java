package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.RegistrationCode;
import pl.krakow.up.upvote.core.model.User;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class RegistrationCodeDAOImpl extends GenericDAOImpl<RegistrationCode, Long>
        implements RegistrationCodeDAO {

    public RegistrationCodeDAOImpl() {
        super(RegistrationCode.class);
    }

    @Override
    public RegistrationCode findByCode(String code) {
        CriteriaQuery<RegistrationCode> c = em.getCriteriaBuilder().createQuery(entityClass);
        Root<RegistrationCode> root = c.from(entityClass);
        Predicate predicate = em.getCriteriaBuilder().equal(root.get("code"), code);
        CriteriaQuery<RegistrationCode> select = c.select(root).where(predicate);

        List<RegistrationCode> codesFound = em.createQuery(select).getResultList();

        if(codesFound.size() > 0) {
            return codesFound.get(0);
        }
        return null;
    }
}