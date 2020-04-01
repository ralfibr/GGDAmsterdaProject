package ewa.backend.rest;

import ewa.backend.entity.Project;
import ewa.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author Robert Neijmeijer
 */
@RestController
@CrossOrigin(origins = "http:/localhost:4200")
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @RequestMapping("/projects")
    @GetMapping("/projects")
    public List<Project> getAllProjects(){
        return projectRepository.getProjects();
    }
    @GetMapping("/projects/{id}")
    public Project getProjectById(@PathVariable int id){
        return projectRepository.getProjectById(id);
    }
    @PostMapping("/projects")
    public Project createProject(@RequestBody Project project){
        return projectRepository.saveProject(project);
    }

    @DeleteMapping("/projects/{id}")
    public Project deleteProject(@PathVariable int id){ return projectRepository.deleteProject(id);}
}
