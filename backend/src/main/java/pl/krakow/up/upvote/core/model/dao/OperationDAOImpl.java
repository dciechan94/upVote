package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.Operation;

public class OperationDAOImpl extends GenericDAOImpl<Operation, Long>
        implements OperationDAO {

    public OperationDAOImpl() {
        super(Operation.class);
    }

}