
export interface DepartmentList {
    value: string;
    label: string;
  }
  export interface DepartmentListResponse {
    status: number;
    data: DepartmentList[];
  }