package ewa.backend.repository;
/**
 * @authour Raeef Ibrahim
 * student nr 500766393
 */
import ewa.backend.service.Identifiable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
@Transactional
abstract class AbstractEntityRepositoryJpa <E extends Identifiable> implements EmployeeRepository<E> {

    @PersistenceContext
    protected EntityManager entityManager;

    private Class<E> theEntityClass;

    public AbstractEntityRepositoryJpa(Class<E> entityClass) {
        this.theEntityClass = entityClass;
        System.out.println("Created " + this.getClass().getName() +
                "<" + this.theEntityClass.getSimpleName() + ">");
    }
}
