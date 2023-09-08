export interface CariNameList {
  id: string;
  cari_isim: string;
  address1?: string;
  ilce?: string;
  il?: string;
  email: string;
  tckimlik: string;
  fadi: string;
  badi: string;
}
export interface CariNameListResponse {
  status: number;
  data: CariNameList[];
}

