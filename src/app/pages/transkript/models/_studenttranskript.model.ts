export interface Datum {
    ag: number;
    semx: number;
    year: number;
    class: number;
    grade: string;
    point: number;
    credit: number;
    ortkat: number;
    status: number;
    average: number;
    faculty: number;
    name_en: string;
    name_tr: string;
    grade_en: string;
    grade_tr: string;
    group_no: number;
    harf_not: number;
    new_code?: any;
    ogr_ects: number;
    semester: number;
    uni_code: string;
    course_id: number;
    pool_code?: any;
    uni_code2: string;
    change_code: number;
    ects_credit: number;
    aktarim_kodu: number;
    double_minor: number;
    repeat_count: number;
    stu_new_code?: any;
    course_status: number;
    register_code: string;
    course_id_taken: number;
    change_course_id: number;
    transkript_order: number;
    credit_semester_1?: any;
    graduation_date_y?: any;
    course_id_taken_change: number;
    ects_credit2?:number;
    newcredit?: number;
    newag?: number;
  }
  
 
  export interface OrtHesap {
    gnoOrt: string;
    gnoAkts: number;
    gnoIeu: number;
    gnoPuan: number;
    dnoOrt: number;
    dnoAkts: number;
    dnoIeu: number;
    dnoPuan: number;
    genelgnoAkts: number;
    genelgnoIeu: number;
    geneldnoAkts: number;
    geneldnoIeu: number;
    puansiz_akts: number;
  }

  export interface Capyandaldersler {
    title_tr: string;
    title_en: string;
    data: Datum[];
    ortHesap: OrtHesap;
  }


  export interface Donem {
    title_tr: string;
    title_en: string;
    ortHesap: OrtHesap;
    tarihceDurumu_en?: string;
    tarihceDurumu_tr?: string;
    semx: number[];
    data:Datum[]
  }
  export interface year {
    guz: Donem;
    ek_sinav_guz_sonu: Donem;
    azami_guz_sonu: Donem;
    azami_guz_basi: Donem;
    azami_bahar_basi: Donem;
    bahar: Donem;
    ek_sınav_yaz_oncesi: Donem;
    azami_bahar_sonu: Donem;
    yaz_okulu: Donem;
    ek_sinav_yaz_okulu_sonrasi: Donem;
    tip_desleri: Donem;
  }
  export interface Alinandersler {
    year: year;
  }
  export interface Dersler {
    alinan_dersler: any;
    cap_yandal_dersler?:Capyandaldersler;
  }
  export  interface Info {
    ogr_no: string;
    tc: string;
    adi: string;
    soyadi: string;
    fakulte_tr: string;
    bolum_tr: string;
    option_tr?: any;
    ayrilma_or_mezun_tr: string;
    fakulte_en: string;
    bolum_en: string;
    option_en?: any;
    ayrilma_or_mezun_en: string;
    ayrilma_or_mezun_tarih: string;
    kayit_tarihi: string;
    dogum_tarihi: string;
    basim_tarihi: string;
    akts: number;
    derece: string;
    gnoIeu: number;
    plan_tr: string;
    plan_en: string;
    register_type_en: string;
    register_type_tr: string;
    class: string;
    egitim_dili_en: string;
    egitim_dili_tr: string;
    tmp_haric_akts: number;
  }
  export interface TranscriptCourses {
    dersler: Dersler;
    info: Info;
  }
  export interface OimSef {
    id: string;
    name: string;
    surname: string;
    name_tr: string;
    name_en: string;
  }
  export interface StudentTranskriptData {
    transcriptCourses: TranscriptCourses;
    type: number;
    title: string;
    studentId: string;
    fdo: number;
    oimSef: OimSef[];
  }
  export interface StudentTranskript {
    status: number;
    data: StudentTranskriptData;
  }