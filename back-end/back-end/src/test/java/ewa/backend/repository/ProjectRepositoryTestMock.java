package ewa.backend.repository;

import ewa.backend.entity.Project;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Robert Neijmeijer
 * StudentNumber: 500808138
 * All code in this class is made by Robert Neijmeijer
 */
@SpringBootTest
public class ProjectRepositoryTestMock {

    @Mock
    public ProjectRepository projectRepository;

    /**
     * Test the saving and getting project from the ProjectRepository by using a mock repository
     */
    @Test
    void TestProjectSavingAndGetting(){
        // Create and save the project
        Project project = new Project(50,"Jordaan","Jordaan","assets/Img/jordaan.jpg","De Jordaan is mogelijk de meest bekende en romantische buurt van Amsterdam. Vroeger een typische volksbuurt met een kleurrijk verleden, nu razend populair bij bezoeker en inwoner door de pittoreske grachten, kleine winkeltjes en knusse straten en stegen.", "5","Nu","Toekomst");
        when(projectRepository.saveProject(project)).thenReturn(project);
        Project savedProject = projectRepository.saveProject(project);
        // Check that the project to save (called project) and the saved project are the same
        assertEquals(savedProject.getName(),project.getName());
        // Get the project and check that it is the same as the saved project
        when(projectRepository.getProjectById(savedProject.getProjectId())).thenReturn(project);
        Project recievedProject = projectRepository.getProjectById(savedProject.getProjectId());
        assertEquals(recievedProject.getName(),savedProject.getName());
    }
}
