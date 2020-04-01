package ewa.backend.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
@Entity
@NamedQueries(value = {
        // Get all the results there are
        @NamedQuery(name = "getAllResults", query = "select r from Result r"),
        // Get all the results of a single project
        @NamedQuery(name = "getAllResultsProject", query = "select r from Result r where r.projectId = ?1")
})
public class Result {
    @Id
    @GeneratedValue
    private long id;

    @NotNull
    private int projectId;                  // Project Id
    private double restAndRelaxation;       // Rust & Ontspanning
    private double exercise;                // Bewegen
    private double meetingPeople;           // Ontmoeten
    private double gardening;               // Tuinieren
    private double nature;                  // Natuur beleven

    // Constructor
    public Result() {
    }
    public Result(int projectId, double restAndRelaxation, double exercise, double meetingPeople, double gardening, double nature) {
        this.projectId = projectId;
        this.restAndRelaxation =restAndRelaxation;
        this.exercise = exercise;
        this.meetingPeople = meetingPeople;
        this.gardening = gardening;
        this.nature = nature;
    }

    // All the getters and setters
    public long getId() {
        return id;
    }
    public int getProjectId() {
        return projectId;
    }
    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }
    public double getRestAndRelaxation() {
        return restAndRelaxation;
    }
    public void setRestAndRelaxation(double restAndRelaxation) {
        this.restAndRelaxation = restAndRelaxation;
    }
    public double getExercise() {
        return exercise;
    }
    public void setExercise(double exercise) {
        this.exercise = exercise;
    }
    public double getMeetingPeople() {
        return meetingPeople;
    }
    public void setMeetingPeople(double meetingPeople) {
        this.meetingPeople = meetingPeople;
    }
    public double getGardening() {
        return gardening;
    }
    public void setGardening(double gardening) {
        this.gardening = gardening;
    }
    public double getNature() {
        return nature;
    }
    public void setNature(double nature) {
        this.nature = nature;
    }
}
