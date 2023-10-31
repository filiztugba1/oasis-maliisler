export interface StudentListRequest {
  f?: string;
  d?: string;
  status_date_start?: string;
  status_date_finish?: string;
  stu_status?: string;
  register_type?: string;
  regulation?: string;
  sex?: string;
  credit?: string;
  fee_status?: string;
  citizen?: string;
  status?: string;
  class?: string;
  register_year?: string;
  class_type?: string;
  khk?: string;
  ozet?: string;
}

export interface StudentList {
  kayit_tipi: string;
  Ogrenci_Telefon?: string;
  Telefon: string;
  Telefon_2: string;
  class_type: string;
  o: string;
  badi: string;
  pasaport_no?: any;
  register_year: string;
  register_date: string;
  tckimlik: string;
  id: string;
  name: string;
  surname: string;
  sinif: string;
  tarihce_sinifi: string;
  durumu: string;
  tarihce_durumu: string;
  opt: string;
  fadi: string;
  burs_durumu?: string;
  burs_tipi?: string;
  cift_durum?: string;
  cift_tar?: string;
  birth_date: string;
  ulke: string;
  explanation: string;
  sex: string;
  email: string;
  alternatifEmail?: string;
  status_date:string;
  sexx:string;
  highSchool:string;
  momthersJob:string;
  fathersJob:string;
  il:string;
  puanTuru:string;
  yerlestirmePuani:string;
  yerlestirmeSirasi:string;
  derece:string;
}
export interface StudentListResponse {
  status: number;
  data: StudentList[];
}