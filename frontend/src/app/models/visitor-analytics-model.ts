// visitor-filters.model.ts
export interface VisitorFilters {
    floor_name?: string;
    report_type?: string;
    start?: string; // format: 'YYYY-MM-DD'
    end?: string;   // format: 'YYYY-MM-DD'
  }