package ewa.backend.repository;

import ewa.backend.entity.Project;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;


/**
 * @Author Robert Neijmeijer
 */
@Repository
public class ProjectRepository implements ProjectRepositoryInterface {

    @PersistenceContext
    EntityManager em;

    /**
     * Get all the projects by using a typed query
     * @return The list of projects
     */
    @Override
    public List<Project> getProjects() {
        TypedQuery<Project> query = em.createQuery("SELECT p FROM Project p",Project.class);
        return query.getResultList();
    }

    /**
     * Get the project, if the project is null return nullpointer exception else return the project
     * @param id The id of the project to find
     * @return Returns the found project, if there is no project with that id return a NullPointerException
     */
    @Override
    public Project getProjectById(int id) {
        Project project = em.find(Project.class,id);
        if(project == null){
            throw new NullPointerException("No project with this id");
        }else {
            return project;
        }
    }

    /**
     * Save the passed on project
     * @param project The project to save
     * @return The saved project
     */
    @Override
    @Transactional
    public Project saveProject(Project project) {
        return em.merge(project);
    }

    /**
     * Delete the project with the given id
     * @param id The id of the project that's being deleted
     * @return Returns the deleted project
     */
    @Override
    public Project deleteProject(int id) {
        Project project = getProjectById(id);
        em.remove(project);
        return project;
    }
}
