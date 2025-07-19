import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VisitorFilters } from '../models/visitor-analytics-model';

@Injectable({
  providedIn: 'root'
})
export class VisitorAnalyticsService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8000/api';

  getFloors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/floor-names/`);
  }

  getReportTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/report-types/`);
  }
  getTotalVisitors(filters: VisitorFilters): Observable<any> {
    return this.http.get(`${this.baseUrl}/total-visitors/`);
  }
  getBusiestSection(filters: VisitorFilters): Observable<any> {
    const params = this.buildHttpParams(filters);
    return this.http.get(`${this.baseUrl}/busiest-section/`, { params });
  }

  getBusiestHour(filters: VisitorFilters): Observable<any> {
    const params = this.buildHttpParams(filters);
    return this.http.get(`${this.baseUrl}/busiest-hour/`, { params });
  }
  getBusiestDay(filters: VisitorFilters): Observable<any> {
    const params = this.buildHttpParams(filters);
    return this.http.get(`${this.baseUrl}/busiest-day/`, { params });
  }

  getDailyTrend(filters: VisitorFilters): Observable<any> {
    const params = this.buildHttpParams(filters);
    return this.http.get(`${this.baseUrl}/daily-trend/`, { params });
  }
 

  private buildHttpParams(filters: { [key: string]: any }): HttpParams {
    let params = new HttpParams();
    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value)) {
        value.forEach((v) => {
          params = params.append(key, v); // multiple values
        });
      } else if (value) {
        params = params.set(key, value);
      }
    }
    return params;
  }
}
