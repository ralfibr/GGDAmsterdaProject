package ewa.backend.rest;

import ewa.backend.entity.OptionalUserInformation;
import ewa.backend.entity.Result;
import ewa.backend.repository.ResultsRepository;
import ewa.backend.resource.Excel;
import ewa.backend.service.UserRepositoryCommandLineRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
@CrossOrigin()
@RestController
@RequestMapping(value = "/result")
public class ResultsController {

    private static final Logger log =
            LoggerFactory.getLogger(UserRepositoryCommandLineRunner.class);

    @Autowired
    ResultsRepository resultsRepository;

    @PostMapping("/saveR")
    /**
     * Save single result with the body(Result) you get from the http get request
     */
    public Result saveResult(@RequestBody Result result) {
        return resultsRepository.saveSingleResult(result);
    }

    /**
     *
     * @param id the id you get from the uri
     * @return a specific result with id from uri
     */
    @GetMapping("/one/{id}")
    public Result getSpecificResult(@PathVariable long id) {
        return resultsRepository.getSpecificResult(id);
    }

    @GetMapping()
    /**
     * return a list from all the results there are
     */
    public List<Result> results() {
        return resultsRepository.getListResults();
    }

    @GetMapping("/all/{projectCode}")
    /**
     * get the avarage result of a project and return it
     */
    public Result totalResultOfProject(@PathVariable int projectCode){
        return resultsRepository.getAvarageResultOfSpecificProject(projectCode);
    }

    // get Result of all the projects
    @GetMapping("/all")
    /**
     * get the avarage of all results there are
     */
    public Result totalResult() {
        return resultsRepository.getAvarageResultTotal();
    }

    @PostMapping("/saveI")
    /**
     * save the optional information from a user
     */
    public OptionalUserInformation saveResult(@RequestBody OptionalUserInformation userInformation) {
        log.info(String.valueOf(userInformation));
        return resultsRepository.saveApplicant(userInformation);
    }

    @GetMapping("/excel/{projectId}")
    /**
     * get all the surveys from a project & get all the applicants from the project
     * Set it in an excel that gets downloaded
     */
    public void makeExcel(@PathVariable int projectId){
        List<Result> resultList = resultsRepository.getListResultsOfProject(projectId);
        List<OptionalUserInformation> optionalUserInformations = resultsRepository.getApplicantsOfProject(projectId);
        if (resultList == null){
            return;
        } else{
        Excel excel = new Excel(resultList, optionalUserInformations);
        }
    }
}
