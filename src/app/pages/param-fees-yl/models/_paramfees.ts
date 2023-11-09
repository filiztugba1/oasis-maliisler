export interface ParamFeesYlx {
  year: string;
  f: string;
  d: string;
  fee: string;
  fee_prep: string;
  fdo: string;
  dep_name: string;
  fak_name: string;
}
export interface ParamFeesYlResponse {
  status: number;
  data: Array<ParamFeesYlx>;
}
export interface ParamFeesYlUpdateResponse {
  status: number;
  message: string;
}

export interface ParamFeesYlAppList {
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
export interface ParamFeesYlAppResponse {
  status: number;
  data: ParamFeesYlAppList[];
}

export interface ParamFeesYlOnayRed {
  id: number;
  message:string ;
}