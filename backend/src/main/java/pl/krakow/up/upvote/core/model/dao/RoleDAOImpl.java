package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.Role;

public class RoleDAOImpl extends GenericDAOImpl<Role, Long>
        implements RoleDAO {

    public RoleDAOImpl() {
        super(Role.class);
    }

}