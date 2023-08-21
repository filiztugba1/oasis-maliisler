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
  Comments?: string;
  dolar_payment: string;
  fee_id: string;
  stu_id: string;
  kullanici: string;
  fdo: string;
  faculty?: any;
  dept?: any;
  scholarship_amount: string;
  scholarship_code: string;
  debt_amount_dolar: string;
  debt_amount: string;
  payments: string;
  return1: string;
  return_date?: any;
  dept_amount_day_date: string;
  comment?: string;
  old_dept_amount: string;
  old_scholarship_amount?: any;
  kullanici2?: any;
  computer_name?: any;
  islem_tipi?: any;
  money?: any;
  invoice_no: string;
  invoice_status: string;
  move: string;
  last_pay_date: string;
  update_date?: any;
  control_status: string;
  sadece_proje: string;
  tek_ders: string;
  sadece_staj: string;
  }
  export interface PaymentsResponse {
    status: number;
    data: Array<PaymentList>;
  }

  export interface StudentFeesUpdateRequest{
    stu_id: string;
    year: string;
    semester: string;
    fee_type_id: string;
    tek_ders: string;
    sadece_staj: string;
    sadece_proje: string;
    f?: string;
    d?: string;
    scholarship_amount: string;
    scholarship_code: string;
    debt_amount_dolar: string;
    debt_amount: string;
    payments: string;
    return_date: string;
    create_date: string;
    dept_amount_day_date: string;
    comment?: string;
    old_dept_amount: string;
    money: string;
    move: string;
    partial: string;
    last_pay_date: string;
    return1: string;
  }

  export interface StudentFeesUpdateResponse{
    status:string,
    data:string
  }


  export interface CollectionList {
    stu_id: string;
  year: string;
  semester: string;
  fee_type: string;
  payment_date: string;
  payment: string;
  payment_dolar?: string;
  dekont_no: string;
  bank_code: string;
  create_date: string;
  user: string;
  explanation: string;
  f?: string;
  user2?: any;
  computer_name?: any;
  process_type?: string;
  money: string;
  rate: string;
  loaded: string;
  old_stu_id?: any;
  is_show?: any;
  name: string;
  Payment_Dolar?: string;
  Payments: string;
  Comments: string;
  last_pay_date: string;
  up_date: string;
  payment_date_org: string;
  }
    export interface CollectionsResponse {
      status: number;
      data: Array<CollectionList>;
    }
  
    export interface StudentCollectionUpdateRequest{
      stu_id: string;
      year: string;
      semester: string;
      fee_type_id: string;
      dekont_no: string;
      process_type: string;
      payment_date: string;
      payment: string;
      payment_dolar: string;
      bank_code: string;
      create_date: string;
      explanation: string;
      rate: string;
      money: string;
      actionType: string;
    }
  
    export interface StudentCollectionUpdateResponse{
      status:string,
      data:string
    }