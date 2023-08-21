export interface RelationMaliDetailRequest {
  stu_id: string;
  mali_diploma: number;
  mali_diploma_cap: number;
  mali_kimlik: number;
  mali_borc: number;
  mali_aciklama: string;
  }
  export interface RelationMaliDetail {
    id: string;
  ogr_dek_zimmet?: any;
  odz_verilme_tar?: any;
  odz_alinma_tar?: any;
  odz_aciklama?: any;
  odz_ok: string;
  yurt_zimmet: string;
  yurt_kart: string;
  yurt_aciklama?: any;
  library_materyal?: any;
  library_materyal_ceza?: any;
  library_sabit_ceza?: any;
  library_kitap: string;
  library_dergi: string;
  library_cd: string;
  library_aciklama?: any;
  library_ok: string;
  bim_notebook: string;
  bim_card: string;
  bim_aciklama?: any;
  mali_diploma: string;
  mali_diploma_cap: string;
  mali_kimlik: string;
  mali_borc: string;
  mali_aciklama?: any;
  idari_isler_zimmet: string;
  idari_aciklama?: any;
  ogr_isl_onay: string;
  ogr_isl_onay_tar?: any;
    }
  export interface RelationMaliDetailResponse {
      status: number;
      data: RelationMaliDetail;
    }
  
  