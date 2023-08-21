export interface IdInformationResponseData{
    status:number,
    data:IdInformationModel
}
export interface IdInformationModel
{
    id: string,
    adi:string,
    soyadi: string,
    tc:string,
    ogr_kimlik_no?: string,
    seri_no?: number,
    medeni_hal: string,
    baba_adi: string,
    anne_adi:string,
    kan_grubu: string,
    uyruk: string,
    cinsiyet: string,
    dini: string,
    dogum_tarihi: string,
    dogum_yeri: string,
    askerlik_durumu?: string,
    askerlik_subesi?: string,
    posta_kodu?: string,
    nif_kayit_il: string,
    nif_kayit_ilce: string,
    mahalle?: string,
    cild_no?: string,
    sira_no?: string,
    cuzdan_kayit_no?: string,
    hane?: string,
    kayit_no?: string,
    verilis_nedeni: string,
    verilme_tarihi?: string,
    verildigi_nifus_dairesi?: string,
    vergi_kimlik_no?: string,
    vergi_dairesi?: string,
    sex:number
}