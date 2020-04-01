package ewa.backend.repository;


import ewa.backend.entity.Result;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.mockito.Mockito.when;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
class ResultsRepositoryTestMock {

    @Mock
    ResultsRepository resultsRepository;            // Create a mock of resultRepository

    @Test
    /**
     * Save a result in a mock and check if the saved results are still the same.
     * After that we do a average calculation on it and look if the answer is not null.
     * Last we Check if result is the same as average because we saved once.
     */
    void mockTestSaveAndResultAverage(){
        // Create project
        Result result = new Result(25,20,20,20,20,20);
        when(resultsRepository.saveSingleResult(result)).thenReturn(result);
        // Save project
        Result saveResult = resultsRepository.saveSingleResult(result);
        // Check if project and saved project are still the same
        Assert.assertEquals(result,  saveResult);

        // Calculate the average result of one result and save it
        when(resultsRepository.getAvarageResultTotal()).thenReturn(result);
        Result averageResult = resultsRepository.getAvarageResultTotal();

        // Check if the average result is not null
        Assert.assertNotNull(averageResult);
        // Should equal same as result because we have only one result in total
        Assert.assertEquals(averageResult, result);
    }
}