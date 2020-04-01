package ewa.backend.repository;

import ewa.backend.entity.Project;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Robert Neijmeijer
 * StudentNumber: 500808138
 * All code in this class is made by Robert Neijmeijer
 */
@SpringBootTest
@Transactional
class ProjectRepositoryTest {

    @Autowired
    public ProjectRepository projectRepository;

    public Project project1;
    public Project project2;
    public List<Project> projectList;

    @BeforeEach
    void setup() {
        project1 = new Project(80, "Test", "Test", "Test", "Test", "Test", "Test", "Test");
        project2 = new Project(81, "Test1", "Test1", "Test1", "Test1", "Test1", "Test1", "Test1");
        Project project50 = new Project(50, "Jordaan", "Jordaan", "assets/Img/jordaan.jpg", "De Jordaan is mogelijk de meest bekende en romantische buurt van Amsterdam. Vroeger een typische volksbuurt met een kleurrijk verleden, nu razend populair bij bezoeker en inwoner door de pittoreske grachten, kleine winkeltjes en knusse straten en stegen.", "5", "Nu", "Toekomst");
        Project project51 = new Project(51, "De Pijp", "De Pijp", "assets/Img/dePijp.jpg", "Het Quartier Latin van Amsterdam, met zijn rechte lange straten en goedkope arbeiderswoningen, heeft een roemrucht verleden van theatertjes, horeca, kleinschalige bedrijvigheid en verschillende culturen. Het nieuwere gedeelte valt op door een sensationele concentratie van Amsterdamse Schoolbouw en door charmante laagbouw in neorenaissancestijl: de huisjes voor de diamantslijpers van weleer.", "10", "Nu", "Toekomst");
        Project project52 = new Project(52, "Oud-Zuid", "Oud-Zuid", "assets/Img/oudZuid.jpg", "Oud-Zuid is een van Amsterdams mooiste en rijkste buurten, met indrukwekkende, brede lanen, imposante monumentale gebouwen, bijzondere boetieks en een aantal van de beste musea ter wereld. Van het culturele Museumplein, tot het levendige Vondelpark en de serene lanen langs de Willemsparkweg, de buurt straalt in al zijn glorie.", "70", "Nu", "Toekomst");
        Project project53 = new Project(53, "Bijlmer", "Bijlmer", "assets/Img/bijlmer.jpg", "Amsterdam is een stad die nooit lijkt stil te staan, maar in de Bijlmer swingt het echt altijd. In Zuidoost wonen mensen met wortels over de hele wereld: maar liefst 130 verschillende nationaliteiten. Al die culturen bij elkaar in één buurt zorgt ervoor dat Zuidoost een eigen stad met eigen verhalen is geworden. En dat voel je.", "30", "Nu", "Toekomst");
        Project project54 = new Project(54, "Voolbeeld Project", "Amsterdam Zuidoost (E-buurt)", "assets/Img/bijlmer.jpg", "Afgelopen jaren is er veel gebouwd in de E-buurt. Er kwamen nieuwe woningen, straten, groen en speelplekken. Binnenkort zal ook speellocatie Emerald opnieuw worden ingericht. Er komt meer ruimte voor groen maar het is nog niet besloten welk type groen. De gemeente Amsterdam vraagt u als bewoner om uw mening te geven voordat speelplek Emerald op de schop gaat. Zo kan er in het ontwerp rekening gehouden worden met de wensen van bewoners rondom Emerald. Door de Gezonde Groenwijzer in te vullen kunt u samen met uw buurt het projectteam helpen bij de herinrichting. \\n Op 15 februari 2020 zal een buurtbijeenkomst georganiseerd worden voor de volgende straten: Egoli, Elberveld, Enkeldoorn, Edenburg, Eerstegeluk, Eksteenfontein en Eversdal. De uitkomst van de Gezonde Groenwijzer zal dan besproken worden. Kunt u hier niet bij aanwezig zijn? Dan kunt u de resultaten van de Gezonde Groenwijzer online bekijken. Ook als u wel bij de bijeenkomst aanwezig kunt zijn is kunt u de resultaten vooraf online zien.", "30", "Nu", "Toekomst");
        projectRepository.saveProject(project50);
        projectRepository.saveProject(project51);
        projectRepository.saveProject(project52);
        projectRepository.saveProject(project53);
        projectRepository.saveProject(project54);
        projectList = projectRepository.getProjects();
    }


    /**
     * Test if the get Prject works correctly
     */
    @Test
    void getProjects() {
        projectRepository.saveProject(project1);
        assertEquals(5, projectRepository.getProjects().size());
        List<Project> projects = projectRepository.getProjects();
        assertEquals(project1.getName(), projects.get(projects.size() - 1).getName());
    }

    /**
     * Test that the start projects are there and in the right location
     * These are created and added in the commandLineRunner
     */
    @Test
    void testStartUpProjects() {
        String expectedName1 = "Jordaan";
        String expectedName2 = "De Pijp";
        String expectedName3 = "Oud-Zuid";
        String expectedName4 = "Bijlmer";
        String expectedName5 = "Voolbeeld Project";
        List<Project> projects = projectRepository.getProjects();
        assertEquals(expectedName1, projects.get(0).getName());
        assertEquals(expectedName2, projects.get(1).getName());
        assertEquals(expectedName3, projects.get(2).getName());
        assertEquals(expectedName4, projects.get(3).getName());
        assertEquals(expectedName5, projects.get(4).getName());
        assertNotEquals(expectedName1, projects.get(2).getName());
    }

    /**
     * Test that the received project are an instance of the Project class
     */
    @Test
    void testProjectIsInstanceOfProjects() {
        MatcherAssert.assertThat(projectRepository.getProjects().get(0), Matchers.instanceOf(Project.class));
    }

    /**
     * Test that two projects are different
     */
    @Test
    void testDifferentProjects() {
        MatcherAssert.assertThat(project1, Matchers.not(project2));
    }

    /**
     * Test that the same projects are the same
     */
    @Test
    void testProjectsAreTheSame() {
        MatcherAssert.assertThat(project1, Matchers.equalTo(project1));
        MatcherAssert.assertThat(project2, Matchers.equalTo(project2));
        MatcherAssert.assertThat(projectRepository.getProjects().get(0), Matchers.equalTo(projectRepository.getProjects().get(0)));
    }


    /**
     * Test that we can get projects with a correct id
     */
    @Test
    void getProjectById() {
        assertEquals("Jordaan", projectRepository.getProjectById(projectList.get(0).getProjectId()).getName());
        assertEquals("De Pijp", projectRepository.getProjectById(projectList.get(1).getProjectId()).getName());
    }

    /**
     * Test that we receive the correct project within 500 milliseconds
     */
    @Test
    void checkGetProjectByIdTime() {
        assertTimeout(Duration.ofMillis(500), () -> assertEquals("Jordaan", projectRepository.getProjectById(projectList.get(0).getProjectId()).getName()));
        assertTimeout(Duration.ofMillis(500), () -> assertEquals("De Pijp", projectRepository.getProjectById(projectList.get(1).getProjectId()).getName()));
    }

    /**
     * Test that the project is saved and that we deleted the correct project
     */
    @Test
    void testChecksave() {
        Project savedProject = projectRepository.saveProject(project2);
        MatcherAssert.assertThat(projectRepository.getProjects(), Matchers.hasItem(savedProject));
        Project deletedProject = projectRepository.deleteProject(savedProject.getProjectId());
        MatcherAssert.assertThat(deletedProject, Matchers.equalTo(savedProject));
    }

    /**
     * Tests that the returned project has the right properties
     */
    @Test
    void testSavedProjectName() {
        MatcherAssert.assertThat(projectRepository.getProjects().get(1), Matchers.hasProperty("name"));
        MatcherAssert.assertThat(projectRepository.getProjects().get(1), Matchers.hasProperty("location"));
        MatcherAssert.assertThat(projectRepository.getProjects().get(1), Matchers.hasProperty("imgResource"));
        MatcherAssert.assertThat(projectRepository.getProjects().get(1), Matchers.hasProperty("description"));
        MatcherAssert.assertThat(projectRepository.getProjects().get(1), Matchers.hasProperty("size"));
    }

    /**
     * Test that we can edit projects
     */
    @Test
    void testEditProject() {
        projectRepository.saveProject(project1);
        List<Project> projects = projectRepository.getProjects();
        Project editProject = projects.get(projects.size() - 1);
        assertEquals("Test", editProject.getName());
        editProject.setName("EDITPROJECT");
        editProject.setDescription("Description");
        projectRepository.saveProject(editProject);
        assertEquals("EDITPROJECT", projectRepository.getProjectById(editProject.getProjectId()).getName());
        assertEquals("Description", projectRepository.getProjectById(editProject.getProjectId()).getDescription());
    }

    /**
     * Test that we can save a project
     */
    @Test
    void saveProject() {
        Project savedProject = projectRepository.saveProject(project1);
        assertEquals(savedProject.getName(), project1.getName());
        projectRepository.deleteProject(savedProject.getProjectId());
    }

    /**
     * Test that we can delete projects
     */
    @Test
    void deleteProject() {
        // Delete the project and test that we deleted the correct project
        Project deletedProject = projectRepository.deleteProject(projectList.get(0).getProjectId());
        assertEquals(deletedProject.getName(), "Jordaan");
        // Test that the project is deleted from the repository
        assertThrows(NullPointerException.class, () -> projectRepository.getProjectById(9));
    }

    /**
     * Test that projects are indeed different
     */
    @Test
    void testCheckProjectsAreDifferent() {
        List<Project> projects = projectRepository.getProjects();
        for (int i = 0; i < projects.size() - 1; i++) {
            assertNotEquals(projects.get(i), projects.get(i + 1));
        }
        assertNotEquals(project1, project2);
    }

    /**
     * Test that we throw a null pointer exception when there is no project with that id
     */
    @Test
    void testException() {
        assertThrows(NullPointerException.class, () -> {
            projectRepository.getProjectById(84136541);
        });
    }

// Here starts the tests of Hooshang

    /**
     * @author Hooshang Kooshani
     * Tests if project has a name
     */
    @Test
    void testNameNotNull() {
        List<Project> projects = projectRepository.getProjects();
        for (Project project : projects) {
            assertFalse(project.getName().isEmpty());
        }
    }
}