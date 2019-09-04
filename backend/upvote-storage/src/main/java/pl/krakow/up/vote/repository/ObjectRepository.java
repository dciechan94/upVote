package pl.krakow.up.vote.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pl.krakow.up.vote.model.AbstractObject;

@Repository
public interface ObjectRepository extends CrudRepository<AbstractObject, Long> {

}
