package ewa.backend.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
/**
 * @Author Hooshang Kooshani
 * Student number: 500809310
 */
class ProjectTest {
    /**
     * Tests if the projectId gets returned correctly
     */
    @Test
    void getProjectIdTest() {
        Project project = new Project(7, "Jordaan", "Centrum", "null", "een beschrijving", "10", "10-02-2020", "11-02-2020");
        long expectedResult = 7;
        long actualResult = project.getProjectId();
        assertEquals(expectedResult, actualResult);
    }
    /**
     * Tests if the project name gets returned correctly
     */
    @Test
    void getNameTest() {
        Project project = new Project(1, "Jordaan", "Centrum", "null", "een beschrijving", "10", "10-02-2020", "11-02-2020");
        String expectedResult = "Jordaan";
        String actualResult = project.getName();
        assertEquals(expectedResult, actualResult);
    }
    /**
     * Tests if the project name gets changed correctly
     */
    @Test
    void setName() {
        Project project = new Project(1, "Jordaan", "Centrum", "null", "een beschrijving", "10", "10-02-2020", "11-02-2020");
        String expectedResult = "Ergens";
        project.setName("Ergens");
        String actualResult = project.getName();
        assertEquals(expectedResult, actualResult);
    }

    /**
     * Tests if the project location gets changed correctly
     */
    @Test
    void setLocation(){
        Project project = new Project(1, "Jordaan", "Centrum", "null", "een beschrijving", "10", "10-02-2020", "11-02-2020");
        String expectedResult = "Noord";
        project.setLocation("Noord");
        String actualResult = project.getLocation();
        assertEquals(expectedResult, actualResult);
    }

}