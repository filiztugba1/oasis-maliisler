export interface DefinitiveRecordRequest {
  f: string;
  d: string;
  std_state: string;
  register_type: string;
  register_date_start: string;
  register_date_finish: string;
}

export interface DefinitiveRecordList {
  status_en: string;
  status_tr: string;
  id_no: string;
  id: string;
  name: string;
  surname: string;
  sex: string;
  credit: string;
  register_date: string;
  fdo: string;
  faculty: string;
  ogrno: string;
  std_state: string;
  f: string;
  name_tr: string;
  scholarship: string;
  register_type: string;
  regtype: string;
  sexx:string;
}
export interface DefinitiveRecordResponse {
  status: number;
  data: DefinitiveRecordList[];
}

export interface faculty {
  value:string;
  label: string;
}