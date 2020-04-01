/** @author Teun Stout
 *  Template for the information the use can choose to give.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempAdditionalInfoService {

  public idProject: number;
  public age: number;
  public gender: string;
  public postal: number;
  public email: string;

}
