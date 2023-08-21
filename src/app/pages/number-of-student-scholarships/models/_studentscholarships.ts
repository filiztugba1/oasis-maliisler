export interface StudentScholarshipNumbersRequest {
  f: string;
  d: string;
  o: string;
  class: string;
  class_type: string;
  register_year: string;
  register_type: string;
  status: string;
  fee_status: string;
  credit: string;
  scholarshipType:string;
}

export interface StudentScholarshipNumbers {
  id: string;
  ad_soyad: string;
  class: string;
  fak: string;
  dep: string;
  opt: string;
  register_year: string;
  lisans_ustu_sinif_bil: string;
  durumu: string;
  kayit_tipi: string;
  burs_tipi?: any;
  burs_durumu?: any;
}
export interface StudentScholarshipNumbersResponse {
  status: number;
  data: StudentScholarshipNumbers[];
}


