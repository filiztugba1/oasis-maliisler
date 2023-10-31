export interface AllPayablesListRequest {
  f?:string;
  d?:string;
  o?:string;
  year?:string;
  semester?:string;
  class?:string;
  status?:string;
  fee_status?:string;
  fee_id?:string;
  list_type?:string;
  register_year?:string;
  interest?:string;
  payables_date_start?:string;
  payables_date_finish?:string;
}

export interface AllPayablesLists {
  year: string;
  semester: string;
  id?: any;
  name?: any;
  surname?: any;
  name_tr?: any;
  create_date: string;
  class?: any;
  register_type?: any;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  borc_tl: string;
  borc_usd: string;
  odeme_tl: string;
  odeme_usd: string;
  money: string;
  harc_tipi: string;
  burstip?: any;
  fee_status?: any;
  tarihce?: any;
  tarihce_date?: any;
  aktarilan: string;
  move: string;
  fakulte_name?: any;
  derece?: any;
}
export interface AllPayablesListResponse {
  status: number;
  data: AllPayablesLists[];
}