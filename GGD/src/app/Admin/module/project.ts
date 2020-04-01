export class Project {
  projectNaam: string;
  projectBeschrijvin: string;
  locatie: string;
  stadsdeel: string;
  oppervlakte: number;
  beginDatum: string;
  eindDatum: string;


  constructor(projectNaam: string, projectBeschrijvin: string, locatie: string, stadsdeel: string, oppervlakte: number, beginDatum: string, eindDatum: string) {
    this.projectNaam = projectNaam;
    this.projectBeschrijvin = projectBeschrijvin;
    this.locatie = locatie;
    this.stadsdeel = stadsdeel;
    this.oppervlakte = oppervlakte;
    this.beginDatum = beginDatum;
    this.eindDatum = eindDatum;
  }
}
