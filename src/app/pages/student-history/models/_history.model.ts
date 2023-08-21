export interface HistoryList {
  id: string;
  fdo: string;
  status_date: string;
  status: string;
  explanation: string;
  year: string;
  semester: string;
  adviser_approval_date?: any;
  class: string;
  update_date: string;
  akt1: string;
  bildirim_tarihi?: any;
  userid: string;
  class_type: string;
  status_name: string;
  user_name?: any;
  }
  export interface HistoryResponse {
    status: number;
    data: Array<HistoryList>;
  }
  export interface ScholarshipHistoryRequest {
    year: string;
    semester: string;
    scholarship_type: string;
    scholarship_status: string;
    explanation: string;
    std_state_date: string;
    update_date: string;
    actionType:string;
    }
  
    export interface ScholarshipHistoryCrudResponse {
      status: number;
      data: Array<HistoryList>;
    }

  export interface ScholarshipHistoryList {
    update_date: string;
    stat_date: string;
    update_date_: string;
    stat_date_: string;
    stat: string;
    stat_id: string;
    sid: string;
    id: string;
    badi: string;
    Year: string;
    Semester: string;
    Explanation: string;
    adi: string;
    soyadi: string;
    }
  export interface ScholarshipHistoryResponse {
      status: number;
      data: Array<ScholarshipHistoryList>;
    }
  
  