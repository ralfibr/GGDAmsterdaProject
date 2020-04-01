package ewa.backend.repository;

import ewa.backend.entity.OptionalUserInformation;
import ewa.backend.entity.Result;

import java.util.List;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
public interface ResultsRepositoryInterface {
    public Result saveSingleResult(Result result);
    public Result getSpecificResult(long id);
    public List<Result> getListResults();
    public List<Result> getListResultsOfProject(int projectId);
    public Result getAvarageResultOfSpecificProject(int projectId);
    public Result getAvarageResultTotal();

    public OptionalUserInformation saveApplicant(OptionalUserInformation info);
    public List<OptionalUserInformation> getApplicantsOfProject(int projectId);
    public void deleteSpecificUser(long id);
}
