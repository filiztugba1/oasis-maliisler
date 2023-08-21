export interface SummerFeeRefundRequests {
  id: string;
  name: string;
  surname: string;
  faculty: string;
  department: string;
  kayit_tipi: string;
  burs_tipi?: string;
  burs_durumu?: string;
  class: string;
  payments: string;
  ieu_credit?: string;
  ects_credit?: string;
  IBAN: string;
  account_name: string;
  phone: string;
}
export interface SummerFeeRefundRequestsResponse {
  status: number;
  data: SummerFeeRefundRequests[];
}


