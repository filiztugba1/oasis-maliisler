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
export interface InstallmentCURequest {
  faiz_0?: string;
  min_payment_0?: string;
  taksit_sayisi_0?: string;
  plus_sayisi_0?: string;
  faiz_2?: string;
  min_payment_2?: string;
  taksit_sayisi_2?: string;
  plus_sayisi_2?: string;
  faiz_3?: string;
  min_payment_3?: string;
  taksit_sayisi_3?: string;
  plus_sayisi_3?: string;
  faiz_4?: string;
  min_payment_4?: string;
  taksit_sayisi_4?: string;
  plus_sayisi_4?: string;
  faiz_5?: string;
  min_payment_5?: string;
  taksit_sayisi_5?: string;
  plus_sayisi_5?: string;
  faiz_6?: string;
  min_payment_6?: string;
  taksit_sayisi_6?: string;
  plus_sayisi_6?: string;
  faiz_7?: string;
  min_payment_7?: string;
  taksit_sayisi_7?: string;
  plus_sayisi_7?: string;
  faiz_8?: string;
  min_payment_8?: string;
  taksit_sayisi_8?: string;
  plus_sayisi_8?: string;
  faiz_9?: string;
  min_payment_9?: string;
  taksit_sayisi_9?: string;
  plus_sayisi_9?: string;
  faiz_10?: string;
  min_payment_10?: string;
  taksit_sayisi_10?: string;
  plus_sayisi_10?: string;
  faiz_11?: string;
  min_payment_11?: string;
  taksit_sayisi_11?: string;
  plus_sayisi_11?: string;
  faiz_12?: string;
  min_payment_12?: string;
  taksit_sayisi_12?: string;
  plus_sayisi_12?: string;
  faiz_99?: string;
  min_payment_99?: string;
  taksit_sayisi_99?: string;
  plus_sayisi_99?: string;
  id?: string;
}
