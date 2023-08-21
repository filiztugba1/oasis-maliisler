export interface PaymentList {
    partial: string;
    year: string;
    semester: string;
    name_tr: string;
    Amount_Dolar: string;
    Amount: string;
    Payments: string;
    Move: string;
    kalan: string;
    kalan_USD: string;
    create_date: string;
    last_date: string;
    Comments?: any;
    dolar_payment: string;
    fee_id: string;
    stu_id: string;
    kullanici: string;
  }
  export interface PaymentsResponse {
    status: number;
    data: PaymentList;
  }