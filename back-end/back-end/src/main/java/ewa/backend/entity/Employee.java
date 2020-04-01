package ewa.backend.entity;
/**
 * author Raeef Ibrahim
 * student nr 500766393
 */
import ewa.backend.service.Identifiable;

import javax.persistence.*;
import java.util.Objects;

@Entity
@NamedQuery(name = "getAllEmployees", query = "SELECT e FROM Employee e")
public class Employee implements Identifiable {
    public Employee(String voornaam, String achternaam, String email, String telefoon, String functie, String stadDeel, String stadDeelNummer, String encodedPassword, boolean admin) {
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        this.email = email;
        this.telefoon = telefoon;
        this.functie = functie;
        this.stadDeel = stadDeel;
        this.stadDeelNummer = stadDeelNummer;
        this.encodedPassword = encodedPassword;
        this.admin = admin;
    }
public  Employee () {

}


    @Id
    @SequenceGenerator(name = "EmployeeIdGenerator", sequenceName = "EmployeeID", initialValue = 20000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EmployeeIdGenerator")
    public long id;
    private String voornaam;
    private String achternaam;
    private String email;
    private String telefoon;
    private String functie;
    private String stadDeel;
    private String stadDeelNummer;
    private String encodedPassword;
    private boolean admin;



    public Employee(long id, String voornaam, String achternaam, String email, String telefoon, String functie, String stadDeel, boolean admin) {
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        this.email = email;
        this.telefoon = telefoon;
        this.functie = functie;
        this.stadDeel = stadDeel;
        this.id = id;
        this.stadDeelNummer = stadDeelNummer;
        this.admin = false;
        this.encodedPassword = encodedPassword;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
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

    public String getTelefoon() {
        return telefoon;
    }

    public void setTelefoon(String telefoon) {
        this.telefoon = telefoon;
    }

    public String getFunctie() {
        return functie;
    }

    public void setFunctie(String functie) {
        this.functie = functie;
    }

    public String getStadDeel() {
        return stadDeel;
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

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public void setEncodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Employee employee = (Employee) obj;
        return id == employee.id;
    }

    @Override
    public String toString() {
       return "{" +
                "id:" + id +
                ", voornaam:" + voornaam + "" +
                ", achternaam:" + achternaam + "" +
                ", email:" + email + "" +
                ", telefoon:" + telefoon + "" +
                ", functie:" + functie + "" +
                ", stadDeel:" + stadDeel + "" +
               ", stadDeelNummer:" + stadDeelNummer + "" +
               ", encodedPassword:" + encodedPassword + "" +
               ", admin:" + admin + "" +
                '}';
    }
}
