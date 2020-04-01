export class User {
  id: number;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  functie: string;
  stadDeel: string;
  stadDeelNummer: string;
  admin: boolean;

  constructor(id: number, voornaam: string , achternaam: string, email: string, telefoon: string, functie: string, stadDeel: string, stadDeelNummer: string, admin: boolean ){
    this.voornaam = voornaam;
    this.achternaam = achternaam;
    this.email = email;
    this.stadDeel = stadDeel;
    this.stadDeelNummer = stadDeelNummer;
    this.telefoon = telefoon;
    this.id = id;
    this.functie = functie;
    this.admin = admin;
  }

}
