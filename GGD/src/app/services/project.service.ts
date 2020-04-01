import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public projectId:number;
  public name:String= "";
  public location:String= "";
  public imgResource:String= "";
  public description:String= "";
  public size:number= 0;
  public beginDate:String ="";
  public endDate:String ="";

  constructor() { }
}
