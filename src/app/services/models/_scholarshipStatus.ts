
export interface ScholarshipStatusList {
    value: string;
    label: string;
  }
  export interface ScholarshipStatusListResponse {
    status: number;
    data: ScholarshipStatusList[];
  }