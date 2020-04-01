/** @author Teun Stout
 * Class: iS202.
 * Project: Enterprise Web Application.
 */
import { Component, SimpleChanges, OnChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { BarchartDataService } from 'src/app/services/Result-AdditionalInfo/barchart-data.service';
import { DatabaseConnectionService } from 'src/app/services/Result-AdditionalInfo/database-connection.service';
import { MatrixService } from 'src/app/services/Result-AdditionalInfo/matrix.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {
  private RGBA_BLAUW = 'rgba(75, 119, 190, 1)';   // colors
  private RGBA_ROOD = 'rgba(246, 36, 89, 1)';     // colors

  public barChartLabels: Label[];                 // diciplines label name
  public barChartType: ChartType = 'bar';         // type of chart
  public barChartLegend = true;                   // if you want the legend
  public barChartPlugins = [pluginDataLabels];    // plugin for responsiveness
  public barChartData: ChartDataSets[];           // Data for a set
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

  constructor(private BarChartService: BarchartDataService, private database: DatabaseConnectionService, private matrix: MatrixService) {
    this.barChartLabels = ['Rust & Ontspanning', 'Bewegen', 'Ontmoeten', 'Tuinieren ', 'Natuur beleven'];    // get the labels
    this.loaddata(); // Start getting the data
    // Load in data that is already there
    this.barChartData = [
      { data: this.BarChartService.getIndividualData(), label: 'Persoonlijk' },
      { data: this.BarChartService.getOverallData(), label: 'Survey Gemiddelde' }
    ];
  }

  // chart dynamic
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          max: 100,               // tell the barchart to go to 100
          min: 0,                 // tell barchart to start a 0
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',            // the percentages ontop of the barchart
        align: 'end',             // give it proper margins
      }
    }
  };

  // This methode will get the data for the barchart when the data is actually loaded.
  private loaddata() {
    // Get the observable and subscribe
    this.database.getOverallResult().subscribe(
      (Response) => {
        // Fill barchart with new data
        this.barChartData = [
          { data: this.BarChartService.getIndividualData(), label: 'Persoonlijk' },
          { data: this.BarChartService.getOverallData(), label: 'Survey Gemiddelde' }
        ];
      }
    );

  }
}
