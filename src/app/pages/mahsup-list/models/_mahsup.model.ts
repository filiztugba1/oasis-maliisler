export interface MahsupListesi {
  id: string;
  name: string;
  surname: string;
  fakulte: string;
  bolum: string;
  class: string;
  derece?: string;
  tl_guz_borcu: string;
  dolar_guz_borcu: string;
  tl_bahar_borcu: string;
  dolar_bahar_borcu: string;
  mahsup_islenilen_donem: string;
}
export interface MahsupResponse {
  status: number;
  data: MahsupListesi[];
}




