package ewa.backend.repository;
import ewa.backend.entity.Employee;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;
/**
 * Test made by Raeef Ibrahim
 * student nr 500766393
 * Here i test emplyee mock repository
 */
@SpringBootTest
public class EmployeeRepositoryJPATestMock {

    @Mock
    private  EmployeeRepositoryJPA employeeRepositoryJPAMock;
// test if save or get employee work with employee mock repository
    @Test
    void saveAndGetEmployeeMock() {
        // test save employee
        Employee employee = new Employee(20,"robert" ,"mijer" , "robertymijr@hotmail.com" ,"06384934","admin" ,"amsterdam oost",true);
        when(employeeRepositoryJPAMock.save(employee)).thenReturn(employee);
        Employee savedEmployee = employeeRepositoryJPAMock.save(employee);
        Assertions.assertEquals(savedEmployee.getVoornaam(),employee.getVoornaam());
        // test get emplyee with Mock
        when(employeeRepositoryJPAMock.findById(savedEmployee.getId())).thenReturn(employee);
        Employee getEmployee = employeeRepositoryJPAMock.save(employee);
        assertEquals(getEmployee.getEmail(),savedEmployee.getEmail() );
    }


}
