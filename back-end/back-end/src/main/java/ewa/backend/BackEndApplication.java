
package ewa.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ewa.backend.repository.EmployeeRepositoryJPA;


@Controller
@SpringBootApplication
public class BackEndApplication implements CommandLineRunner {
    EmployeeRepositoryJPA employeeRepositoryJPA;


    public static void main(String[] args) {
        SpringApplication.run(BackEndApplication.class, args);

    }

    @Bean
    public WebMvcConfigurer configurer2() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*")
                        .allowedOrigins("http://localhost:4200");
            }
        };
    }

    @Override
    public void run(String... args) throws Exception {


    }
}
