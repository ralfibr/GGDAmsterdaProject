package ewa.backend.repository;

import ewa.backend.entity.Project;

import java.util.List;

/**
 * @Author Robert Neijmeijer
 */
public interface ProjectRepositoryInterface {
    List<Project> getProjects();
    Project getProjectById(int id);
    Project saveProject(Project project);
    Project deleteProject(int id);
}
