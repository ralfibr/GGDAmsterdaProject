
/**
 * Made by Raeef Ibrahim
 * nr 500766393
 * Empoyee data module
 */

export class Employee {
  id: number;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  functie: string;
  stadDeel: string;
  stadDeelNummer: string;
  admin: boolean;

    constructor(id: number, voornaam: string , achternaam: string, email: string, telefoon: string, functie: string, stadDeel: string, stadDeelNummer: string, admin: boolean){
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        this.email = email;
        this.stadDeel = stadDeel;
        this.functie = functie;
        this.telefoon = telefoon;
        this.id = id;
        this.admin = admin;
        this.stadDeelNummer = stadDeelNummer;
    }

}

