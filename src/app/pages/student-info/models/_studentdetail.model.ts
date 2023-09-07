export interface StudentDetailResponseData{
    status:number,
    data:StudentDetailModel
}
export interface StudentDetailModel {
    id: string
    name: string
    surname: string
    class: string
    anadal_fakulte:string
    anadal_bolum: string
    anadal_opsiyon: string
    email: string
    telefon: string
    cap_fakulte: string
    cap_bolum: string
    cap_opsiyon: string
    yandal_fakulte:string
    yandal_bolum: string
    yandal_opsiyon: string
    durum:number
    durum_tarihi: string
    burs_durumu: string
    burs_tipi: string
    alinan_ders: number
    image:string
    page?:string
    tc?:string
    kayit_tarihi?:string
    kayit_tipi?:string
    egitim_dili?:string
    toplam_akts?:number
    derece?:string
    basim_tarihi?:string
    listLoad:boolean
}