/** @author Teun Stout
 *  Tempalte a result must excist out of.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateResultService {
  public projectId: number;            // Project id
  public restAndRelaxation: number;    // Rust & Ontspanning
  public exercise: number;             // Bewegen
  public meetingPeople: number;        // Ontmoeten
  public gardening: number;            // Tuinieren
  public nature: number;               // Natuur beleven

  constructor() { }
}
