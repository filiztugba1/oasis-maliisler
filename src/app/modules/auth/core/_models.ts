export interface AuthModel {
  api_token: string
  refreshToken?: string
  status:number
  data?:string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel {
  username: string;
  name: string;
  surname: string;
  email: string;
  title: string;
  tckimlik: string;
  type: string;
  sub_type: string;
  cell_nr?: any;
  language?: 'en' | 'tr';
  first_name?:any;
  academicYear?:number;
  academicSemester?:number;
}

export interface UserModelResponse {
  status: number;
  data: UserModel;
  
}

////////////////// yeni medeller ekleniyor  ///////////

export interface StudentModel {
    id: number
    name: string
    surname: string
    image:string
}
export interface StudentDetail {
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
        image:string,
}

export interface ResponseData{
  status:number,
  data?:any
}
