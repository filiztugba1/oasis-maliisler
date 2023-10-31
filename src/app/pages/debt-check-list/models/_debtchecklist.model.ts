export interface DebtCheckListsRequest {
  year?:string;
  semester?:string;
  keep_feeid?:string;
}

export interface DebtCheckLists {
  cell_phone_s: string;
  dept: string;
  fak: string;
  stu_id: string;
  name: string;
  surname: string;
  class: string;
  debt_dolar: string;
  debt_tl: string;
  payment: string;
  balance: string;
  payment_dolar:string;
  derece:string;
}
export interface DebtCheckListsResponse {
  status: number;
  data: DebtCheckLists[];
}