package ewa.backend.repository;

import ewa.backend.service.Identifiable;

import java.util.List;
/**
 * Made by Raeef Ibrahim
 * nr 500766393
 */
public interface EmployeeRepository<E extends Identifiable> {
    static final String persistenceMode = "JPA";

    List<E> findAll();
    E findById(long id);
    E save(E entity);
    E deletedById(long id);
    List<E> findByQuery(String jpqlName, Object... param);
}
