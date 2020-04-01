package ewa.backend.rest;
import ewa.backend.entity.Employee;
import ewa.backend.exception.EmployeeNotFoundException;
import ewa.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.List;

/**
 * Made by Raeef Ibrahim
 * nr 500766393
 */

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository<Employee> employeeRepository;

    /**
     *
     * @return a list of employee on rest point / employee
     */
    @RequestMapping("/employees")
    @GetMapping("/employees")
    public List<Employee> geAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     *
     * @param id
     * @return a employee by his id on path / employees/{id}
     */
    @GetMapping("/employees/{id}")
    public Employee retrieveEmployeeId(@PathVariable long id) {
        Employee employee = employeeRepository.findById(id);
        if ((employee == null)) {
            throw new EmployeeNotFoundException("id-" + id);
        }
        return employee;

    }

    /**
     *
     * @param employee
     * @return Create new employee
     */
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
       return  employeeRepository.save(employee);
    }

    /**
     * @return  Update and save employee
     * @param employee
     */
    @PostMapping("/employees/{id}")
    public void updateEmployee(@RequestBody Employee employee) {
        employeeRepository.save(employee);
    }

    /**
     * @return Delete employee by giving his id
     * @param id
     */
    @DeleteMapping("/employees/{id}")
    public void deleteEmployee(@PathVariable long id) {
        Employee employee = employeeRepository.deletedById(id);
        if (employee == null)
            throw new EmployeeNotFoundException("id-" + id);
    }

    @Bean
    public WebMvcConfigurer configurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*")
                        .allowedOrigins("http://localhost:4200");
            }
        };
    }
}
