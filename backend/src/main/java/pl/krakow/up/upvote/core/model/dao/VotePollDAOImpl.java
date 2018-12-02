package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.VotePoll;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class VotePollDAOImpl extends GenericDAOImpl<VotePoll, Long>
        implements VotePollDAO {

    public VotePollDAOImpl() {
        super(VotePoll.class);
    }

}