export interface KomisyonluListesi {
  stu_id: string;
  name: string;
  surname: string;
  fakulte: string;
  bolum: string;
  sinif: string;
  ogr_durum: string;
  ogr_kayit_tipi: string;
  burs_tipi: string;
  burs_durumu: string;
  yil: string;
  donem: string;
  harc_tipi: string;
  aldigi_ieu_kredisi: string;
  tahsilat_odeme: string;
  oasis_odeme: string;
  iade: string;
  faturalanacak_tutar: string;
  komisyon: string;
}
export interface KomisyonluResponse {
  status: number;
  data: KomisyonluListesi[];
}




