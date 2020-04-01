package ewa.backend.rest;
/**
 * Test made by Raeef Ibrahim
 * student nr 500766393
 * Test rest endpoint Employee Controller
 */

import ewa.backend.entity.Employee;
import ewa.backend.repository.EmployeeRepositoryJPA;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EmployeeControllerTest {
    @Autowired
    EmployeeRepositoryJPA employeeRepositoryJPA;
    @Autowired
    private TestRestTemplate rest;

// test rest point get All employees
    @Test
    void geAllEmployees() {
        // forced timeout error with 1 second run time per run
        assertTimeoutPreemptively(Duration.ofSeconds(1) , () -> {
            ResponseEntity<Employee[]> response = rest.getForEntity(
                    "http://localhost:8080/employees/",
                    Employee[].class);
            // check if HTTP request is ok
            assertEquals(HttpStatus.OK, response.getStatusCode());
        });
    }
// test retrieveEmployeeId , I search first for employee nr 1 and then i checked if the message start with id 1 with true or false exception
    @Test
    void retrieveEmployeeId() {
        String message = this.rest.getForObject("/employees/1" , String.class);
        assertTrue( message.startsWith("{\"id\":1"));

    }
// here i test if the rest point create an employee and generate an ID
    @Test
    void createId() {
        Employee employee = new Employee(00000,"fadi" ,"zanklo" , "zanklo@hotmail.com" ,"06384934","admin" ,"amsterdam oost",true);
        this.employeeRepositoryJPA.save(employee);
        this.rest.postForObject("/employees",employee,Employee.class);
        ResponseEntity<Employee> responseEntity = this.rest.getForEntity("/employees/" +employee.getId(), Employee.class);
        Employee retrievedEmployee = responseEntity.getBody();
        // check if the HTTP Request right
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        // check if the name right
        assertEquals(employee.getVoornaam() , retrievedEmployee.getVoornaam());
    }
// here i'am testing if update function works with the given employee id and then i checked if the message contains the first name
    @Test
    void updateTag() {
        Employee employee =  employeeRepositoryJPA.findById(2);
        employee.setVoornaam("ralf");
        employeeRepositoryJPA.save(employee);
        String message = this.rest.getForObject("/employees/2" , String.class);
        assertTrue( message.contains("ralf"));
    }
// here i test if the rest point delete works , i expect that the HTTP response is an error 404 not found after i delete employee nr 2
    @Test
    void deleteTag() {
        this.rest.delete("/employees/2");
        ResponseEntity<Employee> responseEntity = this.rest.getForEntity("/employees/" +2, Employee.class);
        assertEquals(HttpStatus.NOT_FOUND , responseEntity.getStatusCode());

    }
}