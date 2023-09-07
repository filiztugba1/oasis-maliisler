export interface ContactInformationResponseData{
    status:number,
    data:ContactInformationModel
}

export interface ContactInformationModel
{
    address1: string,
    address2:  string,
    address3:  string,
    posta_kodu?:  string,
    il:  string,
    telefon1:  string,
    telefon2:  string,
    cep_tel:  string,
    cep_mezun_tel:  string,
    akademik_bilgi:  string,
    aile_address1: string,
    aile_address2:  string,
    aile_address3:  string,
    aile_posta_kodu:  string,
    aile_sehir:  string,
    baba_cep_tel:  string,
    anne_cep_tel:  string,
    acil_address1:  string,
    acil_address2?:  string,
    acil_address3?:  string,
    acil_posta_kodu:  string,
    acil_sehir:  string,
    acil_telefon?:  string,
    acil_cep_tel:  string,
    acil_mail:  string,
    acil_durumda_aranacak:  string,
    yakinlik:  string,
    fatura_address1?:  string,
    fatura_address2?:  string,
    fatura_address3?:  string,
    fatura_posta_kodu?:  string,
    fatura_sehir?:  string,
    fatura_telefon?:  string,
    fatura_vergi_numarasi?:  string,
    fatura_vergi_dairesi?:  string,
    fatura_cep_tel?:  string,
    fatura_mail?:  string
    yurttami:string
    listLoad:boolean
}