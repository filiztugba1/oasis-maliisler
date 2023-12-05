export interface ParamFeesSummerx {
  id: string;
  year: string;
  fee: string;
  f: string;
  prep_status: string;
  f_text: string;
  prep_status_text: string;
}
export interface ParamFeesSummerResponse {
  status: number;
  data: Array<ParamFeesSummerx>;
}
export interface ParamFeesSummerUpdateResponse {
  status: number;
  message: string;
}

export interface ParamFeesSummerAppList {
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
export interface ParamFeesSummerAppResponse {
  status: number;
  data: ParamFeesSummerAppList[];
}

export interface ParamFeesSummerOnayRed {
  id: number;
  message:string ;
}