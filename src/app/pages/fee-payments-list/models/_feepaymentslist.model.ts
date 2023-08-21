export interface FeePaymentListRequest {
  f?: string;
  d?: string;
  o?: string;
  year?: string;
  semester?: string;
  banka?: string;
  fee_type?: string;
  payment_date_start?: string;
  payment_date_finish?: string;
}

export interface FeePaymentList {
  yoksis_faculty_code?: any;
  id?: any;
  name?: any;
  surname?: any;
  name_tr?: any;
  payment_date: string;
  p1: string;
  p2: string;
  payment: string;
  payment_dolar: string;
  money: string;
  accounts: string;
  durumu?: any;
  fakulte_name?: any;
  register_year?: any;
  register_type?: any;
}
export interface FeePaymentListResponse {
  status: number;
  data: FeePaymentList[];
}