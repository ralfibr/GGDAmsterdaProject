package ewa.backend.entity;

/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

import ewa.backend.service.Identifiable;
import javax.persistence.*;
import java.util.Objects;

//The @Entity annotation specifies the name of the database table to be used, in this case User.
//Below that are all the values in the table.
@Entity
public class User implements Identifiable {

    //This annotation provides the generation of a value for ID.
    @GeneratedValue
    private long id;

    private String voornaam;
    private String achternaam;

    //This annotation specifes that email is the primary key of this entity.
    //Normally the primary key would be the long id, but due to complications of another groupmate we were forced to make this the primary id, this was beyond my power.
    @Id
    private String email;

    private String encodedPassword;
    private String telefoon;
    private String functie;
    private String stadDeel;
    private String stadDeelNummer;
    private boolean admin;

    //Required empty constructor.
    public User() {

    }

    //Constructor for all the values.
    public User(long id, String voornaam, String achternaam, String email, String password, String telefoon, String functie, String stadDeel, String stadDeelNummer) {
        this.id = id;
        this.admin = true;
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        this.email = email;
        this.encodedPassword = password;
        this.telefoon = telefoon;
        this.functie = functie;
        this.stadDeel = stadDeel;
        this.stadDeelNummer = stadDeelNummer;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getVoornaam() {
        return voornaam;
    }

    public void setVoornaam(String voornaam) {
        this.voornaam = voornaam;
    }

    public String getAchternaam() {
        return achternaam;
    }

    public void setAchternaam(String achternaam) {
        this.achternaam = achternaam;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setEncodedPassword(String password) {
        this.encodedPassword = password;
    }

    public void setTelefoon(String telefoon) {
        this.telefoon = telefoon;
    }


    public void setFunctie(String functie) {
        this.functie = functie;
    }


    public void setStadDeel(String stadDeel) {
        this.stadDeel = stadDeel;
    }

    public String getStadDeelNummer() {
        return stadDeelNummer;
    }

    public void setStadDeelNummer(String stadDeelNummer) {
        this.stadDeelNummer = stadDeelNummer;
    }

    public boolean validateEncodedPassword(String given){
        return encodedPassword.equals(given);
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public String getTelefoon() {
        return telefoon;
    }

    public String getFunctie() {
        return functie;
    }

    public String getStadDeel() {
        return stadDeel;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + voornaam + '\'' +
                ", lastName='" + achternaam + '\'' +
                ", email='" + email + '\'' +
                ", password='" + encodedPassword + '\'' +
                ", phoneNumber='" + telefoon + '\'' +
                ", function='" + functie + '\'' +
                ", district='" + stadDeel + '\'' +
                '}';
    }

    public String getFullName(){
        return voornaam + " " + achternaam;
    }

    //Copied from internet.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id &&
                Objects.equals(voornaam, user.voornaam) &&
                Objects.equals(achternaam, user.achternaam) &&
                Objects.equals(email, user.email) &&
                Objects.equals(encodedPassword, user.encodedPassword) &&
                telefoon.equals(user.telefoon) &&
                functie.equals(user.functie) &&
                stadDeel.equals(user.stadDeel);
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, voornaam, achternaam, email, encodedPassword, telefoon, functie, stadDeel);
    }
}
