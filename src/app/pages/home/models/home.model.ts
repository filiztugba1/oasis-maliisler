export interface Report {
    yeni_ogr_osym_guz: string;
    yeni_ogr_osym_bahar: string;
    yeni_ogr_osym_toplam: string;
    devam_eden_ogr_guz: string;
    devam_eden_ogr_bahar: string;
    devam_eden_ogr_toplam: string;
    yuksek_lisans_guz: string;
    yuksek_lisans_bahar: string;
    yuksek_lisans_toplam: string;
    dgs_guz: string;
    dgs_bahar: string;
    dgs_toplam: string;
    yatay_gecis_guz: string;
    yatay_gecis_bahar: string;
    yatay_gecis_toplam: string;
    yabanci_uyruk_guz: string;
    yabanci_uyruk_bahar: string;
    yabanci_uyruk_toplam: string;
    guz_toplam: string;
    bahar_toplam: string;
    genel_toplam: string;
  }
  export interface ReportResponse {
    status: number;
    data: Report;
  }


  export interface TotalScholarshipList {
    total: string;
    name: string;
  }
  export interface TotalScholarshipListResponse {
    status: number;
    data: TotalScholarshipList[];
  }


  export interface TotalScholarshipGrafic {
    y: number;
    label:string;
  }
  export interface DeptVsPaidGrafic {
    y: number;
    name:string;
  }

  export interface DeptVsPaidList {
    odenen: string;
    odenen_usd: string;
    aliacak: string;
    alinacak_usd: string;
  }
  export interface DeptVsPaidResponse {
    status: number;
    data: DeptVsPaidList[];
  }
