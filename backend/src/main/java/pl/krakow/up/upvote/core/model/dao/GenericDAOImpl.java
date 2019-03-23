package pl.krakow.up.upvote.core.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import pl.krakow.up.upvote.core.model.Persistable;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.LockModeType;
import javax.persistence.criteria.CriteriaQuery;
import java.io.Serializable;
import java.util.List;

public abstract class GenericDAOImpl<T extends Persistable, ID extends Serializable>
        implements GenericDAO<T, ID> {

    @Autowired
    protected EntityManagerFactory entityManagerFactory;

    protected EntityManager em;

    protected final Class<T> entityClass;

    protected GenericDAOImpl(Class<T> entityClass) {
        this.em = entityManagerFactory.createEntityManager();
        this.entityClass = entityClass;
    }

    public void setEntityManager(EntityManager em) {
        this.em = em;
    }

    public void setEntityManagerFactory(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    public T findById(ID id) {
        return findById(id, LockModeType.NONE);
    }

    public T findById(ID id, LockModeType lockModeType) {
        return em.find(entityClass, id, lockModeType);
    }

    public T findReferenceById(ID id) {
        return em.getReference(entityClass, id);
    }

    public List<T> findAll() {
        CriteriaQuery<T> c =
                em.getCriteriaBuilder().createQuery(entityClass);
        c.select(c.from(entityClass));
        return em.createQuery(c).getResultList();
    }

    public Long getCount() {
        CriteriaQuery<Long> c =
                em.getCriteriaBuilder().createQuery(Long.class);
        c.select(em.getCriteriaBuilder().count(c.from(entityClass)));
        return em.createQuery(c).getSingleResult();
    }

    public T makePersistent(T instance) {
        // merge() handles transient AND detached instances
        T updated = instance;
        try {
            em.getTransaction().begin();
            updated = em.merge(instance);
            em.getTransaction().commit();
        } catch(Exception e) {
            em.getTransaction().rollback();
            throw e;
        }

        return updated;
    }

    public void makeTransient(T instance) {
        em.remove(instance);
    }

    public void checkVersion(T entity, boolean forceUpdate) {
        em.lock(
                entity,
                forceUpdate
                        ? LockModeType.OPTIMISTIC_FORCE_INCREMENT
                        : LockModeType.OPTIMISTIC
        );
    }

    public Long persist(T entity) {
        try {
            em.getTransaction().begin();
            em.persist(entity);
            em.getTransaction().commit();
        } catch(Exception e) {
            em.getTransaction().rollback();
            throw e;
        }

        return entity.getId();
    }

    public void remove(ID id) {
        try {
            em.getTransaction().begin();
            T instance = findById(id, LockModeType.NONE);
            em.refresh(instance);
            em.remove(instance);
            em.getTransaction().commit();
        } catch(Exception e) {
            em.getTransaction().rollback();
            throw e;
        }
    }

    public void remove(List<ID> ids) {
        try {
            em.getTransaction().begin();
            for(ID id : ids) {
                T instance = findById(id);
                em.refresh(instance);
                em.remove(instance);
            }
            em.getTransaction().commit();
        } catch(Exception e) {
            em.getTransaction().rollback();
            throw e;
        }
    }

    public void removeAll() {
        try {
            em.getTransaction().begin();
            for(T instance : findAll()) {
                em.refresh(instance);
                em.remove(instance);
            }
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        }
    }

}
