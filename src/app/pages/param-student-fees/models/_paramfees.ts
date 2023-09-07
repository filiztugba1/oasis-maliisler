export interface ParamFeesx {
  year: string;
  f: string;
  d: string;
  fee: string;
  fee2: string;
  fee3: string;
  fee4: string;
  fee5: string;
  fee6: string;
  fee7: string;
  fee8?: any;
  fee_prep: string;
  fee_prep2: string;
  fee_prep3?: any;
  fdo: string;
  ikinci_ogretim?: any;
  yabanci_dille_egitim?: any;
  dep_name: string;
  fak_name: string;
}
export interface ParamFeesResponse {
  status: number;
  data: Array<ParamFeesx>;
}
export interface ParamFeesUpdateResponse {
  status: number;
  message: string;
}
