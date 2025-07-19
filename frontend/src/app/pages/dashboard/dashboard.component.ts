import { Component,OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VisitorAnalyticsService } from '../../services/visitor-analytics.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TrendChartComponent } from '../../component/trend-chart/trend-chart.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,CommonModule,SidebarComponent,ReactiveFormsModule,MatSelectModule,MatFormFieldModule,TrendChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  filterForm!: FormGroup;
  floors: string[] = [];
  reportTypes: string[] = [];
  dailyLabels: string[] = [];
  dailyCounts: number[] = [];
  busiestSection: string = '';
  busiestHour: string = '';
  busiestDay: string = '';
  totalVisitors:string='';
  occupancy: number = 0;

  isBrowser = false;


  

  constructor(private fb: FormBuilder, private apiService: VisitorAnalyticsService) {
   
  }

  ngOnInit(): void {
    console.log('Dashboard loaded');
    this.filterForm = this.fb.group({
      dateRange: ['', Validators.required],
      floor: ['', Validators.required],
      reportTypes: [[], Validators.required]
    });

    this.loadFloors();
    this.loadReportTypes();
    this.applyFilters(); 
     
  }

  loadFloors() {
    this.apiService.getFloors().subscribe(res => this.floors = res.floors);
  }

  loadReportTypes() {
    this.apiService.getReportTypes().subscribe((res) => {
      this.reportTypes = res.report_types || [];
    });
  }

  applyFilters() {
    const { dateRange, floor, reportTypes } = this.filterForm.value;
    let start = '', end = '';

    if (dateRange?.includes('to')) {
      const [s, e] = dateRange.split('to').map((d: string) => d.trim());
      start = s;
      end = e;
    }

    const filters = {
      start,
      end,
      floor_name: floor,
      // report_type: reportType
      report_type: reportTypes, // array
      
    };

    

    this.apiService.getBusiestSection(filters).subscribe(res => {
      this.busiestSection = res.busiest_section;
      this.occupancy = res.occupancy;
    });

    this.apiService.getBusiestHour(filters).subscribe(res => {
      this.busiestHour = res.busiest_hour;
      
    });

    this.apiService.getBusiestDay(filters).subscribe(res => {
      this.busiestDay = res.busiest_day;
      // this.totalVisitors=res.total_visitors;
      
    });

    this.apiService.getTotalVisitors(filters).subscribe(res => {
      
      this.totalVisitors=res.total_visitor_count;
      
    });

    this.apiService.getDailyTrend(filters).subscribe(res => {
      const trend = res.daily_trend || {};
      this.dailyLabels = Object.keys(trend);
      this.dailyCounts = Object.values(trend);
    });
  }

}
