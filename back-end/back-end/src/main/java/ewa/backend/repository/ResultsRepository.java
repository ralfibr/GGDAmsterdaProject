package ewa.backend.repository;

import ewa.backend.entity.OptionalUserInformation;
import ewa.backend.entity.Result;
import ewa.backend.exception.OptionalUserNotFound;
import ewa.backend.service.UserRepositoryCommandLineRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
@Repository
@Transactional
public class ResultsRepository implements ResultsRepositoryInterface {

    @Autowired
    EntityManager em;

    @Override
    /**
     * Save a Result to the database
     */
    public Result saveSingleResult(Result result) {
        return em.merge(result);
    }

    @Override
    /**
     * Get a result by the id
     */
    public Result getSpecificResult(long id) {
        return em.find(Result.class, id);
    }

    @Override
    /**
     * Get a List of all the results there are
     */
    public List<Result> getListResults() {
        return em.createNamedQuery("getAllResults", Result.class).getResultList();
    }

    @Override
    /**
     * Get a list of result with a project id
     */
    public List<Result> getListResultsOfProject(int projectId){
        TypedQuery<Result> getAllResultsOfProject = em.createNamedQuery("getAllResultsProject", Result.class);  // make a query
        getAllResultsOfProject.setParameter(1, projectId);                                                      // set parameters of query
        return getAllResultsOfProject.getResultList();                                                             // Return the list
    }

    @Override
    /**
     * Get a avarage result of a single project
     */
    public Result getAvarageResultOfSpecificProject(int projectId) {
        TypedQuery<Result> getAllResultsOfProject = em.createNamedQuery("getAllResultsProject", Result.class);
        getAllResultsOfProject.setParameter(1, projectId);
        return calculateAverageOfTotalResult(getAllResultsOfProject.getResultList(), projectId);
    }

    @Override
    /**
     * Get an avarage of all the projects in Amsterdam
     */
    public Result getAvarageResultTotal() {
        return calculateAverageOfTotalResult(em.createNamedQuery("getAllResults", Result.class).getResultList(), 0);
    }

    @Override
    /**
     * Save a single applicant
     */
    public OptionalUserInformation saveApplicant(OptionalUserInformation info) {
        return em.merge(info);
    }

    @Override
    /**
     * Get the users of a single project
     */
    public List<OptionalUserInformation> getApplicantsOfProject(int projectId) {
        TypedQuery<OptionalUserInformation> getUsersOfProject = em.createNamedQuery("getAllUsersFromProject", OptionalUserInformation.class); // query
        getUsersOfProject.setParameter(1, projectId);   // set query params with project id
        return getUsersOfProject.getResultList(); // return the list
    }

    @Override
    public void deleteSpecificUser(long id) throws RuntimeException{
        OptionalUserInformation optionalUserInformation = em.find(OptionalUserInformation.class, id);
        if (optionalUserInformation == null){
            throw new OptionalUserNotFound("User not found, No user deleted with id: " + id);
        } else {
            em.remove(optionalUserInformation);
        }
    }

    /**
     * Calculate the avarage of a result
     * @param allResults This is the list where we need tot calculate the avarage
     * @param projectId this is the id of the project
     * @return result
     */
    public Result calculateAverageOfTotalResult(List<Result> allResults, int projectId) {
        Result totalResult = new Result();      // new result
        int size = allResults.size();           // size array
        double[] competences = new double[5];   // all competences
        for (double comp : competences) {       // all competences = 0;
            comp = 0;
        }

        // add up all the data from the competences
        for (Result result : allResults) {
            competences[0] += result.getRestAndRelaxation();
            competences[1] += result.getExercise();
            competences[2] += result.getMeetingPeople();
            competences[3] += result.getGardening();
            competences[4] += result.getNature();
        }

        // set total results average by deviding them by the size
        totalResult.setRestAndRelaxation(competences[0] / size);
        totalResult.setExercise(competences[1] / size);  ;
        totalResult.setMeetingPeople(competences[2] / size);
        totalResult.setGardening(competences[3] / size);
        totalResult.setNature(competences[4] / size);

        // set project id
        totalResult.setProjectId(projectId);
        return totalResult;
    }
}
