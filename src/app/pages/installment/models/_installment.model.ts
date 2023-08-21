export interface InstallmentListsRequest {
  bank?:string;
  credit_card?:string;
}

export interface InstallmentLists {
  id: string;
  taksit_no: string;
  faiz: string;
  min_payment: string;
  taksit_sayisi: string;
  plus_sayisi: string;
  u_name: string;
  u_date: string;
}
export interface InstallmentListsResponse {
  status: number;
  data: InstallmentLists[];
}