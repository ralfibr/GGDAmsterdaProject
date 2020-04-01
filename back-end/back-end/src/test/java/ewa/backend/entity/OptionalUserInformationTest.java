package ewa.backend.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
/**
 * @Author Hooshang Kooshani
 * Student number: 500809310
 */
class OptionalUserInformationTest {

    /**
     * Tests if the project ID gets returned correctly
     */
    @Test
    void getIdProject() {
        OptionalUserInformation optionalUserInformation = new OptionalUserInformation(7, 24, "man", 1020,"test@email.com");
        long expectedResult = 7;
        long actualResult = optionalUserInformation.getIdProject();
        assertEquals(expectedResult, actualResult);
    }

    /**
     * Tests if the project ID gets changed correctly
     */
    @Test
    void setIdProjectTest() {
        OptionalUserInformation optionalUserInformation = new OptionalUserInformation(7, 24, "man", 1020,"test@email.com");
        long expectedResult = 8;
        optionalUserInformation.setIdProject(8);
        long actualResult = optionalUserInformation.getIdProject();
        assertEquals(expectedResult, actualResult);
    }

    /**
     * Tests if the age of the person gets returned correctly
     */
    @Test
    void getAge() {
        OptionalUserInformation optionalUserInformation = new OptionalUserInformation(7, 24, "man", 1020,"test@email.com");
        long expectedResult = 8;
        optionalUserInformation.setIdProject(8);
        long actualResult = optionalUserInformation.getIdProject();
        assertEquals(expectedResult, actualResult);
    }

    /**
     * Tests if the age of the person gets changed correctly
     */
    @Test
    void setAge() {
        OptionalUserInformation optionalUserInformation = new OptionalUserInformation(7, 24, "man", 1020,"test@email.com");
        long expectedResult = 25;
        optionalUserInformation.setAge(25);
        long actualResult = optionalUserInformation.getAge();
        assertEquals(expectedResult, actualResult);
    }

    /**
     * Tests if the gender of the person gets returned correctly
     */
    @Test
    void getGender() {
        OptionalUserInformation optionalUserInformation = new OptionalUserInformation(7, 24, "man", 1020,"test@email.com");
        String expectedResult = "man";
        String actualResult = optionalUserInformation.getGender();
        assertEquals(expectedResult, actualResult);
    }
    /**
     * Tests if the gender of the person gets changed correctly
     */
    @Test
    void setGender() {
        OptionalUserInformation optionalUserInformation = new OptionalUserInformation(7, 24, "man", 1020,"test@email.com");
        String expectedResult = "vrouw";
        optionalUserInformation.setGender("vrouw");
        String actualResult = optionalUserInformation.getGender();
        assertEquals(expectedResult, actualResult);
    }
}