package ewa.backend.repository;

import ewa.backend.entity.OptionalUserInformation;
import ewa.backend.entity.Result;
import ewa.backend.exception.OptionalUserNotFound;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
@SpringBootTest
@Transactional
class ResultsRepositoryTest {

    @Autowired
    private ResultsRepository resultsRepository;

    Result restultEen = new Result(20, 20, 20, 20, 20, 20);
    Result restultTwee = new Result(20, 15, 25, 20, 20, 20);
    Result restultDrie = new Result(19, 20, 20, 25, 15, 20);
    Result restultVier = new Result(19, 35, 20, 20, 20, 5);
    private final int LIST_SHOULD_NOT_EQUAL_ZERO = 0;

    OptionalUserInformation userOne = new OptionalUserInformation(20, 18, "male", 1055, "jaap@hotmail.com");
    OptionalUserInformation userTwo = new OptionalUserInformation(20, 25, "female", 1095, "jaap@hotmail.com");


    @BeforeEach
    public void setUp() {
        resultsRepository.saveSingleResult(restultEen);
        resultsRepository.saveSingleResult(restultTwee);
        resultsRepository.saveSingleResult(restultDrie);
        resultsRepository.saveSingleResult(restultVier);

        resultsRepository.saveApplicant(userOne);
        resultsRepository.saveApplicant(userTwo);
    }

    @Test
    /**
     * Checks if the list with results (one, two, three, four) in the Setup() is being saved to the repository.
     * Should not be 0 because then the aren't being saved
     */
    void CheckIfAllResultsAreSavedTest() {
        List<Result> resultList = resultsRepository.getListResults();        // We get the data from the database
        assertNotEquals(LIST_SHOULD_NOT_EQUAL_ZERO, resultList.size());      // Checks if the setup size is not equal to 0
    }

    @Test
    /**
     * Check if the results are received in a specific amount of time (500 milliseconds)
     */
    void CheckTimeOfGettingResultsTest() {
        assertTimeout(Duration.ofMillis(500), () -> {
            List<Result> resultList = resultsRepository.getListResults();        // Data we need to get from database
        });
    }

    @Test
    /**
     * Checks if the results are saved. Will return null if a result is not saved. Returns a Result if it is beeing saved
     */
    void CheckIfAllResultsSaveTest() {
        Result savedResult = resultsRepository.saveSingleResult(new Result(20, 20, 20, 20, 20, 20)); // Result to be saved
        assertNotNull(savedResult);                                                                                                                                 // Assert not null
    }

    @Test
    /**
     * Check if you can get a specific result. Result one is being save first and thus will be the first index if you get it
     */
    void CheckIfYouCanGetResultByIdTest() {
        List<Result> resultList = resultsRepository.getListResults();                           // Resultlist
        Result firstResult = resultList.get(0);                                                 // First result
        assertNotNull(resultsRepository.getSpecificResult(firstResult.getId()));                // Check if index one is first result
    }

    @Test
    /**
     * Check when you get a resultList it is of Results
     */
    void CheckIfResultIsSameInstanceTest() {
        MatcherAssert.assertThat(resultsRepository.getListResults().get(0), Matchers.instanceOf(Result.class));
    }

    @Test
    /**
     * Get list of results from a single project.
     * Should be 2 because there are 2 projects with id 20
     */
    void getAllProjectsOfSpecificProjectTest() {
        List<Result> resultList = resultsRepository.getListResultsOfProject(20);
        assertEquals(2 ,resultList.size());
    }

    @Test
    /**
     * Here we are checking if the results have a table to store a project id.
     */
    void checkIfResultHasAPropertyOfProjectIdTest() {
        List<Result> resultList = resultsRepository.getListResultsOfProject(20);          // List with projects
        for (Result result: resultList) {
            MatcherAssert.assertThat(result, Matchers.hasProperty("projectId"));     // Check if they have a property with projectId
        }
    }

    @Test
    /**
     * test the avarage of project 19. We do this manually vs the method from repository
     */
    void getResultsOfProjectTest() {
        Result overallResult = resultsRepository.getAvarageResultOfSpecificProject(19);         // Get average of project 19
        List<Result> resultList = resultsRepository.getListResultsOfProject(19);                // Get list of projects with 19
        // variables
        double rest = 0;
        double exercise = 0;
        double meeting = 0;
        double gardening = 0;
        double nature = 0;

        // Calculate manually the avarage
        for (Result result : resultList) {
            rest += result.getRestAndRelaxation();
            exercise += result.getExercise();
            meeting += result.getMeetingPeople();
            gardening += result.getGardening();
            nature += result.getNature();
        }

        // Check manual calculation with given average
        assertEquals((rest / resultList.size()), overallResult.getRestAndRelaxation());
        assertEquals((exercise / resultList.size()), overallResult.getExercise());
        assertEquals((meeting / resultList.size()), overallResult.getMeetingPeople());
        assertEquals((gardening / resultList.size()), overallResult.getGardening());
        assertEquals((nature / resultList.size()), overallResult.getNature());
    }

    @Test
    /**
     * tests the avarage of all projects
     */
    void getResultsOfAllProjectTest() {
        Result overallResult = resultsRepository.getAvarageResultTotal();           // Get average with total results
        List<Result> resultList = resultsRepository.getListResults();               // Get list with total results
        double rest = 0;
        double exercise = 0;
        double meeting = 0;
        double gardening = 0;
        double nature = 0;

        // Add manually
        for (Result result : resultList) {
            rest += result.getRestAndRelaxation();
            exercise += result.getExercise();
            meeting += result.getMeetingPeople();
            gardening += result.getGardening();
            nature += result.getNature();
        }
        // Devide and compare if calculation is right
        assertEquals((rest / resultList.size()), overallResult.getRestAndRelaxation());
        assertEquals((exercise / resultList.size()), overallResult.getExercise());
        assertEquals((meeting / resultList.size()), overallResult.getMeetingPeople());
        assertEquals((gardening / resultList.size()), overallResult.getGardening());
        assertEquals((nature / resultList.size()), overallResult.getNature());
    }

    @Test
    /**
     * Test if the Result you get is a result.class
     */
    void CheckIfRestursSameInstanceTest(){
        Result overallResult = resultsRepository.getAvarageResultTotal();       // Get average result
        MatcherAssert.assertThat(overallResult, Matchers.isA(Result.class));    // Is A of result.class
    }

    @Test
    /**
     * Save a user, If user is not saved will return null
     */
    void saveUserTest() {
        OptionalUserInformation optionalUserInformation = resultsRepository.saveApplicant(new OptionalUserInformation(25, 25, "female", 1095, "jaap@hotmail.com"));
        assertNotNull(optionalUserInformation);         // Will be null when user is not saved
    }

    @Test
    /**
     * User email starts with jaap
     */
    void emailUserStartsWithJaapTest() {
        OptionalUserInformation optionalUserInformationList = resultsRepository.getApplicantsOfProject(20).get(0); // This is with email jaap@hotmail.com
        MatcherAssert.assertThat(optionalUserInformationList.getEmail(), Matchers.endsWith("com"));     // Check if starts with jaap
    }
    @Test
    /**
     * User email ends with com
     */
    void emailUserEndsWithComTest() {
        OptionalUserInformation optionalUserInformationList = resultsRepository.getApplicantsOfProject(20).get(0); // This is with email jaap@hotmail.com
        MatcherAssert.assertThat(optionalUserInformationList.getEmail(), Matchers.startsWith("jaap"));          // Check if ends with com
    }

    @Test
    /**
     * Get all the users of a specific project (2) because we added only 2
     */
    void getAllUsersOfSpecificProjectTest() {
        List<OptionalUserInformation> optionalUserInformationList = resultsRepository.getApplicantsOfProject(20);
        assertEquals(2, optionalUserInformationList.size());
    }

    @Test
    /**
     * Delete a user from the list
     */
    void deleteASpecificUserTest() {
        List<OptionalUserInformation> optionalUserInformationList = resultsRepository.getApplicantsOfProject(20);
        resultsRepository.deleteSpecificUser(optionalUserInformationList.get(0).getId());
        assertNotEquals(optionalUserInformationList.size(), resultsRepository.getListResultsOfProject(20));
    }

    @Test
    /**
     * Get an exception thrown when you try to delete a user that is not there
     */
    void deleteASpecificUserExceptionTest() {
        assertThrows(OptionalUserNotFound.class, () -> resultsRepository.deleteSpecificUser(2030));
    }
}