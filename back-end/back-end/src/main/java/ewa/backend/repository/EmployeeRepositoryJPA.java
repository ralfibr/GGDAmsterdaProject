package ewa.backend.repository;
/**
 * @author Raeef Ibrahim
 * student nr 500766393
 *
 */
import ewa.backend.entity.Employee;
import ewa.backend.exception.EmployeeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
@Primary
@Repository
@Transactional
public class EmployeeRepositoryJPA extends  AbstractEntityRepositoryJpa<Employee> {


    public EmployeeRepositoryJPA() {
        super(Employee.class);
    }

    @Autowired
    private EntityManager em;

    /**
     *
     * @return A list of all employees
     */
    @Override
    public List<Employee> findAll() {
        TypedQuery<Employee> query =
                em.createQuery("select e from Employee e", Employee.class);

        return query.getResultList();
    }

    /**
     *
     * @param id
     * @return a employee founded by his id
     */
    @Override
    public Employee findById(long id) {

        return em.find(Employee.class, id);
    }

    /**
     *
     * @param employee
     * @return save emplyee info by giving the employee
     */
    @Override
    public Employee save(Employee employee) {
        if(employee.getId() == 0) {
            em.persist(employee);
        } else {
            em.merge(employee);
        }
        return employee;
    }

    /**
     *
     * @param id
     * @return Delete a employee throw employee not found exception
     * @throws EmployeeNotFoundException
     */
    @Override
    public Employee deletedById(long id) throws EmployeeNotFoundException {
        Employee employee = findById(id);
        em.remove(employee);
        return employee;
    }

    /**
     *
     * @param jpqlName
     * @param param
     * @return Find a a list of employee by query like getAllEmployees named query
     */
    @Override
    public List<Employee> findByQuery(String jpqlName, Object... param) {
        List<Employee> result;

        TypedQuery<Employee> query = em.createNamedQuery(jpqlName, Employee.class);
        for (int i = 0; i < param.length; i++) {
            query.setParameter(i+1, param[i]);
        }

        result = query.getResultList();

        return result;
    } }


