package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.Vote;

public class VoteDAOImpl extends GenericDAOImpl<Vote, Long>
        implements VoteDAO {

    public VoteDAOImpl() {
        super(Vote.class);
    }
}