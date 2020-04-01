package ewa.backend.repository;

import ewa.backend.BackEndApplication;
import ewa.backend.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.CoreMatchers.*;

import static org.junit.jupiter.api.Assertions.*;


/**
 * @Author: Danial Iqbal
 * Study: Software Engineering
 * Class: iS202
 */

@SpringBootTest
class UserRepositoryTest {
    //Test 'User' variables.
    private User userSteveJobs;
    private User userBillGates;
    private User userConnorMcgregor;
    private User userCristianoRonaldo;

    //Test 'BackEndApplication' variable.
    @Autowired
    BackEndApplication application = null;

    //Test 'UserRepository' variable.
    @Autowired
    private UserRepository userRepository;

    //Setting up all 'User' test objects with real data.
    @BeforeEach
    void setUp() {
        userSteveJobs = new User(555, "Steve", "Jobs", "SteveJobs@Apple.com", "testPassword", "06-50427261", "Leader", "Noord", "020 394 2834");
        userBillGates = new User(556, "Bill", "Gates", "BillGates@Microsoft.com", "testPassword", "06-50463829", "Leader", "Oost", "020 394 2834");
        userConnorMcgregor = new User(557, "Connor", "Mcgregor", "ConnorMcgregor@Microsoft.com", "testPassword", "06-50463829", "Leader", "West", "020 394 2834");
        userCristianoRonaldo = new User(558, "Cristiano", "Ronaldo", "CristianoRonaldo@Apple.com", "testPassword", "06-50463829", "Leader", "Oost", "020 394 2834");
    }


    //Checking if the application starts succesfully!
    @Test
    void checkIfApplicationStartedSuccesfully() {
        assertNotNull(application);
        System.out.println("Your Spring-Boot application started succesfully, congratulations!");
        System.out.println("This Unit Test was made by: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");
    }

    //Forcing an error based on an illegal argument. Checking if it really throws an exception!
    @Test
    void throwsExceptionEmail() throws IllegalArgumentException {
        assertThrows(IllegalArgumentException.class, () -> userRepository.findByEmail(null));
        System.out.println("When the given argument is invalid, it gives you an exception error. Your application know how to detect/handle errors: congratiolations!");
        System.out.println("This Unit Test was made by: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");
    }

    //Checking if the function findByEmailID works correctly.
    @Test
    void lookForMembersBasedOnIDAndEmail() {
        User danialObject = userRepository.findAll().get(1);
        assertEquals(danialObject, (userRepository.findByEmailId("danial.iqbal@hva.nl", 2)));
        System.out.println("The findByEmailID function works succesfully, congratulations!");
        System.out.println("This Unit Test was made by: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");
    }

    //Checking if the default users are loaded correctly.
    @Test
    void checkIfDefaultUsersAreLoadedCorrectly() {
        List test = Arrays.asList(userRepository.findAll());
        assertThat(userRepository.findAll().get(1).getFullName(), containsString("Danial Iqbal"));
        assertThat(userRepository.findAll().get(0).getFullName(), containsString("Mark van Manen"));
        System.out.println("The default users are loaded succesfully, congratulations!");
        System.out.println("This Unit Test was made from: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");


    }

    //Checking if the save function works correctly.
    @Test
    void checkIfTheSaveFunctionWorksCorrectly() {
        //Calling the save option from our user repository and saving user 'userDanial' to the list.
        User savedUser = userRepository.save(userSteveJobs);

        //Check name of added attributes from the 'savedUser' variable.
        String expectedResultFirstname = "Steve";
        String realResultFirstname = userSteveJobs.getVoornaam();

        String expectedResultLastname = "Jobs";
        String realResultLastname = userSteveJobs.getAchternaam();

        long expectedResultId = 555;
        long realResultId = userSteveJobs.getId();

        assertEquals(expectedResultFirstname, realResultFirstname);
        assertEquals(expectedResultLastname, realResultLastname);
        assertEquals(expectedResultId, realResultId);


        //Checking if the 'savedUser' variable really got added in our repository.
        User newUser = userRepository.findByEmail(savedUser.getEmail());
        assertEquals(newUser.getEmail(), savedUser.getEmail());
        assertEquals(newUser.getVoornaam(), savedUser.getVoornaam());
        assertEquals(newUser.getAchternaam(), savedUser.getAchternaam());

        System.out.println("The save function works succesfully, congratulations!");
        System.out.println("This Unit Test was made from: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");


    }

    //Checking if the user amount gets updated after every save.
    @Test
    void checksIfUserAmountGetsUpdatedAfterSaving() {
        userRepository.save(userBillGates);
        int expectedResultAmountUsers = 4;
        int realResultAmountUsers = userRepository.findAll().size();
        assertEquals(expectedResultAmountUsers, realResultAmountUsers);
        System.out.println("The user amount got updated  succesfully, congratulations!");
        System.out.println("This Unit Test was made from: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");


    }

    //Check if the user amount gets updated after every delete
    @Test
    void checksIfUserAmountGetsUpdatedAfterDeleting() {
        userRepository.save(userConnorMcgregor);
        int originalAmountOfUsers = userRepository.findAll().size();
        userRepository.deleteByEmail(userConnorMcgregor.getEmail());
        int realAmountOfUsersAfterDelete = userRepository.findAll().size();
        assertEquals(originalAmountOfUsers - 1, realAmountOfUsersAfterDelete);
        System.out.println("The user amount got updated  succesfully, congratulations!");
        System.out.println("This Unit Test was made from: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");


    }

    //Check if the delete function works correctly.
    @Test
    void checkIfTheDeleteFunctionWorksCorrectly() {
        //Calling the save option from our user repository and saving user 'userDanial' to the list.
        User savedUser = userRepository.save(userCristianoRonaldo);

        //Check name of added attributes from the 'savedUser' variable.
        String expectedResultFirstname = "Cristiano";
        String realResultFirstname = userCristianoRonaldo.getVoornaam();

        String expectedResultLastname = "Ronaldo";
        String realResultLastname = userCristianoRonaldo.getAchternaam();

        long expectedResultId = 558;
        long realResultId = userCristianoRonaldo.getId();

        assertEquals(expectedResultFirstname, realResultFirstname);
        assertEquals(expectedResultLastname, realResultLastname);
        assertEquals(expectedResultId, realResultId);


        //Checking if the 'savedUser' variable really got added in our repository.
        User deletedUser = userRepository.deleteByEmail(savedUser.getEmail());

        assertEquals(deletedUser.getEmail(), savedUser.getEmail());
        assertEquals(deletedUser.getVoornaam(), savedUser.getVoornaam());
        assertEquals(deletedUser.getAchternaam(), savedUser.getAchternaam());

        System.out.println("The delete function works succesfully, congratulations!");
        System.out.println("This Unit Test was made from: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");

    }

    //Check if the test objects are generated correctly.
    @Test
    void checkIfTestObjectsAreGeneratedCorrectly() {
        assertThat(userConnorMcgregor.getFullName(), startsWith("Connor"));
        assertThat(userConnorMcgregor.getFullName(), endsWith("Mcgregor"));

        assertThat(userSteveJobs.getFullName(), startsWith("Steve"));
        assertThat(userSteveJobs.getFullName(), endsWith("Jobs"));

        assertThat(userBillGates.getFullName(), startsWith("Bill"));
        assertThat(userBillGates.getFullName(), endsWith("Gates"));

        assertThat(userCristianoRonaldo.getFullName(), startsWith("Cristiano"));
        assertThat(userCristianoRonaldo.getFullName(), endsWith("Ronaldo"));

        System.out.println("The test objects got generated succesfully, congratulations!");
        System.out.println("This Unit Test was made from: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");

    }

    //Checking if repository can decent user's that are not stored in the storage.
    @Test
    void checkingRepositoryUserDetection() throws IndexOutOfBoundsException {
        assertThrows(IndexOutOfBoundsException.class, () -> userRepository.findAll().get(4).getVoornaam());
        System.out.println("When the given user doesn't exist, it gives you an exception error. Your application know how to detect/handle errors: congratiolations!");
        System.out.println("This Unit Test was made from: Danial Iqbal. Software Engineering student from the University of Applied Sciences.");
    }

// Here starts the tests of Hooshang

    /**
     * @author Hooshang Kooshani
     * Tests if the findAll method works
     */
    @Test
    void testFindAllTheUsers() {
        List<User> users = userRepository.findAll();
        assertEquals(userRepository.findAll().toArray().length, users.size());
    }

    /**
     * @author Hooshang Kooshani
     * Tests if all users have a name
     */
    @Test
    void testNameNotNull() {
        List<User> user = userRepository.findAll();
        for (User users : user) {
            assertFalse(users.getVoornaam().isEmpty());
        }
    }
}