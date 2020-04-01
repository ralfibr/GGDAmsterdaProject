import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {DatabaseConnectionService} from '../../services/Result-AdditionalInfo/database-connection.service';
import {BarchartDataService} from 'src/app/services/Result-AdditionalInfo/barchart-data.service';
import {ProjectDataService} from 'src/app/services/ProjectData/project-data.service';
import {ProjectService} from 'src/app/services/project.service';
import {TemplateResultService} from 'src/app/services/Result-AdditionalInfo/template/Template-result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
/**
 * made by Raeef and Teun
 * Result component used to get the survey results in the admin panel
 */
export class ResultComponent implements OnInit {

  private RGBA_BLAUW = 'rgba(75, 119, 190, 1)';   // colors
  private RGBA_ROOD = 'rgba(246, 36, 89, 1)';// colors

  public barChartLabels: Label[];                 // diciplines label name
  public barChartType: ChartType = 'bar';         // type of chart
  public barChartLegend = true;                   // if you want the legend
  public barChartPlugins = [pluginDataLabels];    // plugin for responsiveness
  public barChartData: ChartDataSets[];
  // public barChartData2: ChartDataSets[];
  public projecten: ProjectService[];
  public inputproject: number = 0;

  // Data for a set
  public chartColors: Array<any> = [              // instantiate the colors
    { // first color (blue)
      backgroundColor: this.RGBA_BLAUW,
      borderColor: this.RGBA_BLAUW,
      pointBackgroundColor: this.RGBA_BLAUW,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: this.RGBA_BLAUW
    },
    { // second color
      backgroundColor: this.RGBA_ROOD,
      borderColor: this.RGBA_ROOD,
      pointBackgroundColor: this.RGBA_ROOD,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: this.RGBA_ROOD
    }];

  constructor(private BarChartService: BarchartDataService, private database: DatabaseConnectionService, private project: ProjectDataService) {
    // get the labels
    this.barChartLabels = BarChartService.getLabelsPiechart();
    // get the data for the results

    this.projecten = project.getProjects();
    this.barChartData = [
      {data: this.BarChartService.getOveralData(), label: ' Gemiddelde Overall'}
    ];

  }

  // chart dynamic
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          max: 100,
          min: 0,
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public setDataBarChart(projectId: number) {
    let selecterdProject: ProjectService = this.project.GetProjectById(projectId);
    let result123: TemplateResultService;
    this.database.getOverallResultOneProject(projectId).subscribe(
      (Response) => {
        console.log(Response);
        result123 = this.database.totalResultOneProject;
        this.barChartData = [
          {data: this.BarChartService.getOveralData(), label: ' Gemiddelde Overall'},
          {
            data: [result123.gardening, result123.nature, result123.restAndRelaxation, result123.meetingPeople, result123.exercise],
            label: String(selecterdProject.name)
          }
        ];
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  setProjectForBarchart() {
    if (this.inputproject == 0 || this.inputproject == null) {
      return;
    }
    this.setDataBarChart(this.inputproject);
  }

  ngOnInit() {
  }

}
