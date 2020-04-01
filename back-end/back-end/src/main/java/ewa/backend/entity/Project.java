package ewa.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @Author Robert Neijmeijer
 */
@Entity
public class Project {
    @Id
    @GeneratedValue
    private int projectId;

    private String name;
    private String location;
    private String imgResource;
    @Column(length = 2550)
    private String description;
    private String size;
    private String beginDate;
    private String endDate;

    public Project() {
    }

    public Project(String name) {
        this.name = name;
    }

    public Project(int projectId, String name, String location, String imgResource, String description, String size, String beginDate, String endDate){
        this.projectId = projectId;
        this.name = name;
        this.location = location;
        this.imgResource = imgResource;
        this.description = description;
        this.size = size;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }

    public int getProjectId() {
        return projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String projectNaam) {
        this.name = projectNaam;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String projectBeschrijving) {
        this.description = projectBeschrijving;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImgResource() {
        return imgResource;
    }

    public void setImgResource(String imgResource) {
        this.imgResource = imgResource;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(String beginDate) {
        this.beginDate = beginDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
