package pl.krakow.up.upvote.core.model.dao;

import pl.krakow.up.upvote.core.model.RegistrationCode;

public interface RegistrationCodeDAO extends GenericDAO<RegistrationCode, Long> {
    RegistrationCode findByCode(String code);
}