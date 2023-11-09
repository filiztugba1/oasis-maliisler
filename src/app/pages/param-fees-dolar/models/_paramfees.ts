export interface ParamFeesDolarx {
  year: string;
  f: string;
  d: string;
  fee: string;
  fee_prep: string;
  fdo: string;
  dep_name: string;
  fak_name: string;
}
export interface ParamFeesDolarResponse {
  status: number;
  data: Array<ParamFeesDolarx>;
}
export interface ParamFeesDolarUpdateResponse {
  status: number;
  message: string;
}

export interface ParamFeesDolarAppList {
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
export interface ParamFeesDolarAppResponse {
  status: number;
  data: ParamFeesDolarAppList[];
}

export interface ParamFeesDolarOnayRed {
  id: number;
  message:string ;
}