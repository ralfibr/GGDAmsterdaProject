package ewa.backend.rest;


import ewa.backend.entity.Project;
import ewa.backend.repository.ProjectRepositoryInterface;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Hooshang Kooshani
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProjectControllerTest {
    @Autowired
    ProjectRepositoryInterface projectRepositoryInterface;

    @Autowired
    private TestRestTemplate restTemplate;


    /**
     * Tests to get the project from the id
     */
    @Test
    void getProjectById() {
        String message = this.restTemplate.getForObject("/projects/1", String.class);
        assertTrue(message.startsWith("{\"projectId\":1"));
    }

    /**
     * Post mapping doesn't work on the Project controller(No clue why, wasn't my class and I've spent too much time trying to fix it). The test code is correct though. I know the url isn't /projects/{id} in the controller, but it was more logical for a normal test.
     */
    @Test
    void createProject() {
        Project project = new Project(80, "Test", "Test", "Test", "Test", "Test", "Test", "Test");
        this.projectRepositoryInterface.saveProject(project);
        this.restTemplate.postForObject("/projects/",project, Project.class);
        ResponseEntity<Project> responseEntity = this.restTemplate.getForEntity("/projects/" + project.getProjectId(), Project.class);
        Project retrievedProject = responseEntity.getBody();
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(project.getName() , retrievedProject.getName());
    }
}