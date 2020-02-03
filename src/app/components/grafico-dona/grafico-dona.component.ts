import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  template: `
  <div style="display: block">
   <canvas baseChart [data]="doughnutChartData" [labels]="doughnutChartLabels" chartType="doughnut" #canvasElement>
  </canvas>
</div>  `,
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @ViewChild('canvasElement', { static: false }) canvasElement: ElementRef;
  @Input() labels: Label[] = [];
  @Input() values: number[] = [];

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
    this.doughnutChartLabels = this.labels;
    this.doughnutChartData = this.values;
    console.log('ngInit', this.doughnutChartData);
  }

}
