export interface CreateDebtx {
  year: string;
  f: string;
  d: string;
  fee: string;
  fee_prep: string;
  fdo: string;
  dep_name: string;
  fak_name: string;
}
export interface CreateDebtResponse {
  status: number;
  data: Array<CreateDebtx>;
}
export interface CreateDebtUpdateResponse {
  status: number;
  message: string;
}

export interface CreateDebtAppList {
  appUser?: any;
  createUser: string;
  id: string;
  approval_rejection?: any;
  json_data: string;
  created_date: string;
  approval_rejection_date?: any;
  created_user: string;
  approval_rejection_user?: any;
  year: string;
  semester: string;
  parent_id: string;
  message?: any;
  module: string;
}
export interface CreateDebtAppResponse {
  status: number;
  data: CreateDebtAppList[];
}

export interface CreateDebtOnayRed {
  id: number;
  message:string ;
}