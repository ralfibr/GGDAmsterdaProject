import {Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { ProjectDataService } from 'src/app/services/ProjectData/project-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {
  show: boolean;
  projectnaam: string;
  beschrijving: string = "";
  locatie: string;
  stadsdeel: string;
  oppervlakte: number;
  begin: string;
  eind: string;
  beschrijvingText = new FormControl;
  beginDate = new FormControl;
  endDate = new FormControl;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  constructor(private service: ProjectDataService , private route: Router,private _ngZone: NgZone) {
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
  }

  onCancel() {
    this.show = !this.show;
  }

  add() {
    let project:ProjectService = new ProjectService;
    project.name = this.projectnaam;
    project.description = this.beschrijvingText.value;
    project.location = this.stadsdeel;
    project.size = this.oppervlakte;
    project.imgResource = "assets/Img/jordaan.jpg";
    project.beginDate = this.beginDate.value;
    project.endDate = this.endDate.value;
    this.service.AddProject(project);
    confirm('Do you want to save changes ?');
    this.route.navigateByUrl('admin-overview');
  }

}
