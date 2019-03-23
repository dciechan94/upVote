package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.Role;

public interface RoleDAO extends GenericDAO<Role, Long> {
    void removeAll();
}