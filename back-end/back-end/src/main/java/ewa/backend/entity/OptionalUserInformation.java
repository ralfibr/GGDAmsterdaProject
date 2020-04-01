package ewa.backend.entity;

import com.sun.istack.NotNull;

import javax.persistence.*;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
@Entity
// Named query to get all the users for one project
@NamedQuery(name = "getAllUsersFromProject", query = "select u from OptionalUserInformation u where u.idProject = ?1")
public class OptionalUserInformation {

    @Id
    @GeneratedValue
    long id;

    private int idProject;          // Code of the project
    private int age;                // Leeftijd
    private String gender;          // Geslacht
    private int postal;             // Postcode
    @NotNull
    private String email;           // Email adress

    // Constructors
    public OptionalUserInformation() {

    }
    public OptionalUserInformation(int idProject, int age, String gender, int postal, String email) {
        this.idProject = idProject;
        this.age = age;
        this.gender = gender;
        this.postal = postal;
        this.email = email;
    }

    // All the getters and setters
    public long getId() {
        return id;
    }
    public int getIdProject() {
        return idProject;
    }
    public void setIdProject(int idProject) {
        this.idProject = idProject;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public int getPostal() {
        return postal;
    }
    public void setPostal(int postal) {
        this.postal = postal;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
