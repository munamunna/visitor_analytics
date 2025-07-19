import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  imports: [ NgChartsModule],
  templateUrl: './trend-chart.component.html',
  styleUrl: './trend-chart.component.css'
})
export class TrendChartComponent implements OnChanges{

    // Chart Data
    @Input() labels: string[] = [];
    @Input() data: number[] = [];
   
  
    

    barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: []
    };
  
    chartOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: 'white' }
        }
      },
      scales: {
        x: {
          ticks: { color: 'white' }
        },
        y: {
          ticks: { color: 'white' }
        }
      }
    };
  
    ngOnChanges(changes: SimpleChanges): void {
      if (this.labels || this.data) {
        this.barChartData = {
          labels: this.labels,
          datasets: [{
            data: this.data,
            label: 'Visitors',
            backgroundColor: '#007bff'
          }]
        };
      }
    }

    

}
