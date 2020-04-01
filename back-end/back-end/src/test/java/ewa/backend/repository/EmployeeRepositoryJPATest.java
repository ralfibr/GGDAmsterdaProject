package ewa.backend.repository;
/**
 * Test made by Raeef Ibrahim
 * student nr 500766393
 * Here i test CRUD oprations on Employee Repository JPA save, deleteById , findById , findAll , findByQuery
 */

import ewa.backend.entity.Employee;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class EmployeeRepositoryJPATest {
    @Autowired
    private EmployeeRepositoryJPA employeeRepositoryJPA;

    Employee employee1 = new Employee(20000, "ralf", "ibrahim", "ralfdxib@hotmail.com", "0640280291", "admin", "amsterdam oost", true);
    Employee employee2 = new Employee(20001, "robert", "mijer", "robertymijr@hotmail.com", "06384934", "admin", "amsterdam oost", true);
    Employee employee3 = new Employee(20002, "fadi", "zanklo", "zanklo@hotmail.com", "06384934", "admin", "amsterdam oost", true);

    @BeforeEach
    void setUp() {
        this.employeeRepositoryJPA.save(employee1);
        this.employeeRepositoryJPA.save(employee3);
    }

    //test if find all method works, i checked that with the array length
    @Test
    void findAll() {
        List<Employee> employees = (List<Employee>) employeeRepositoryJPA.findAll();
        assertEquals(employeeRepositoryJPA.findAll().toArray().length, employees.size());
    }

    //test save function
    @Test
    void save() {
        Employee savedEmplyee = this.employeeRepositoryJPA.save(employee2);
        assertEquals("robert", savedEmplyee.getVoornaam());

    }// test if we can find an employee by id

    @Test
    void findById() {
        Employee employeeId = this.employeeRepositoryJPA.findById(20002);
        assertEquals("zanklo", employeeId.getAchternaam());
    }


    //test delete a employee by id
    @Test
    void deletedById() {
        this.employeeRepositoryJPA.deletedById(20000);
        assertNull(this.employeeRepositoryJPA.findById(20000));
    }


    // here i am testing find by query function , i give an query getAllEmployees and then i checked if query result equal with find all function
    @Test
    void findByQuery() {
        // Forced timeout error of 1 second per each run
        assertTimeoutPreemptively(Duration.ofSeconds(1), () -> {
            List<Employee> employeeByQuery = this.employeeRepositoryJPA.findByQuery("getAllEmployees");
            List<Employee> employeeList = employeeRepositoryJPA.findAll();
            assertEquals(employeeByQuery, employeeList);
        });


    }
// Here starts the tests of Hooshang

    /**
     * @author Hooshang Kooshani
     * Forcing an error and throwing an exception
     */
    @Test
    void throwExceptionFindByQuery() throws InvalidDataAccessApiUsageException {
        assertThrows(InvalidDataAccessApiUsageException.class, () -> employeeRepositoryJPA.findByQuery(null));
    }

}