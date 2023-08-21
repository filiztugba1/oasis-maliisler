import React, {FC, KeyboardEvent, useEffect, useRef, useState,Component} from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import ContactInformation from './components/ContactInformation'
import IdInformation from './components/IdInformation'
import GeneralInformation from './components/GeneralInformation'
import { StudentInfoHeader } from './StudentInfoHeader'
import axios from "axios";
import { StudentDetail } from '../../modules/auth'
import { StudentDetailModel, StudentDetailResponseData } from './models/_studentdetail.model'
import { GeneralInformationModel, GeneralInformationResponseData } from './models/_generalinformation.model'
import { IdInformationModel, IdInformationResponseData } from './models/_idinformation.model'
import { ContactInformationModel, ContactInformationResponseData } from './models/_contactimformation.model'


const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Student Info',
    path: '/student-info',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]


const StudentDetailPage: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<StudentDetailModel>(
    {
      id: "",
      name: "",
      surname: "",
      class: "",
      anadal_fakulte: "",
      anadal_bolum: "",
      anadal_opsiyon: "",
      email: "",
      telefon: "",
      cap_fakulte: "",
      cap_bolum: "",
      cap_opsiyon: "",
      yandal_fakulte: "",
      yandal_bolum: "",
      yandal_opsiyon: "",
      durum:0,
      durum_tarihi: "",
      burs_durumu: "",
      burs_tipi: "",
      alinan_ders: 0,
      image: "",
      page:""
    }
  );

  const [generalInformation, setGeneralInformation] = useState<GeneralInformationModel>(
    {
      id:'',
              name:'',
              surname:'',
              class:0,
              register_year:0,
              register_date:'',
              lisansUstuSinif:'',
              uyruk:'',
              mezuniyet_ayrilma_tarihi:'',
              yatay_gecis_kayit_tarihi:'',
              yatay_gecis_birim_id:0,
              kayit_tipi:'',
              cap_durumu:'',
              yandal_durumu:'',
              cap_durum_tarihi:'',
              yandal_durum_tarihi:'',
              ikinci_yabanci_dil:'',
              mut_tercumanlik_dili:'',
              disiplin_cezasi:'',
              tc_kimlik_no:'',
              danisman:'',
              cap_danisman:'',
              yandal_danisman:'',
              ogr_hakkini_kaybettigi_tarih:'',
              gno_hesabi:'',
              tabi_oldugu_plan:'',
              lisans_ustu_ucret:'',
              ayni_programi_tekrar_okuma:'',
              tabi_olunan_musredat:'',
              ilave_burs:'',
              anadal_fakulte:'',
              anadal_bolum:'',
              anadal_opsiyon:'',
              email:'',
              telefon:'',
              cap_fakulte:'',
              cap_bolum:'',
              cap_opsiyon:'',
              yandal_fakulte:'',
              yandal_bolum:'',
              yandal_opsiyon:'',
              std_state:'',
              state_date:'',
              burs_durumu:'',
              burs_tipi:'',
              alinan_ders:0,
    }
  );
  const [idInformationn, setIdInformationn] = useState<IdInformationModel>(
    {
      id:'',
      adi:'',
      soyadi:'',
      tc:'',
      ogr_kimlik_no:'',
      seri_no:0,
      medeni_hal:'',
      baba_adi:'',
      anne_adi:'',
      kan_grubu:'',
      uyruk:'',
      cinsiyet:'',
      dini:'',
      dogum_tarihi:'',
      dogum_yeri:'',
      askerlik_durumu:'',
      askerlik_subesi:'',
      posta_kodu:'',
      nif_kayit_il:'',
      nif_kayit_ilce:'',
      mahalle:'',
      cild_no:'',
      sira_no:'',
      cuzdan_kayit_no:'',
      hane:'',
      kayit_no:'',
      verilis_nedeni:'',
      verilme_tarihi:'',
      verildigi_nifus_dairesi:'',
      vergi_kimlik_no:'',
      vergi_dairesi:'',
      sex:0
    }
  );
  const [contactInformationn, setContactInformationn] = useState<ContactInformationModel>(
    {
      address1: '',
      address2:  '',
      address3:  '',
      posta_kodu:  '',
      il: '',
      telefon1: '',
      telefon2:'',
      cep_tel:  '',
      cep_mezun_tel: '',
      akademik_bilgi:  '',
      aile_address1: '',
      aile_address2:  '',
      aile_address3: '',
      aile_posta_kodu: '',
      aile_sehir: '',
      baba_cep_tel:'',
      anne_cep_tel: '',
      acil_address1:  '',
      acil_address2: '',
      acil_address3: '',
      acil_posta_kodu: '',
      acil_sehir:  '',
      acil_telefon: '',
      acil_cep_tel: '',
      acil_mail: '',
      acil_durumda_aranacak: '',
      yakinlik:  '',
      fatura_address1: '',
      fatura_address2: '',
      fatura_address3: '',
      fatura_posta_kodu: '',
      fatura_sehir:  '',
      fatura_telefon:'',
      fatura_vergi_numarasi: '',
      fatura_vergi_dairesi: '',
      fatura_cep_tel: '',
      fatura_mail: '',
      yurttami:''
    }
  );

  const [isApi, setIsApi] = useState(true);
  useEffect(() => {
    if(isApi)
    {
      
    axios.post<StudentDetailResponseData>('http://api-oasis.localhost/maliisler/maliisler/active-student-detail',{
      stu_id:localStorage.getItem('search-student-id')
        }).then((res)=>{
            // setLoading(false);
            if(res.status===200)
            {
                setStudentInfo(res.data.data);
                setIsApi(false);
            }
          console.log();
        }).catch(err=>{
          setIsApi(false);
        })

    axios.post<GeneralInformationResponseData>('http://api-oasis.localhost/maliisler/maliisler/general-information',{
          stu_id:localStorage.getItem('search-student-id')
            }).then((res)=>{
                // setLoading(false);
                if(res.status===200)
                {
                  setGeneralInformation(res.data.data);
                    setIsApi(false);
                }
              console.log();
            }).catch(err=>{
              setIsApi(false);
      })

      axios.post<IdInformationResponseData>('http://api-oasis.localhost/maliisler/maliisler/id-information',{
        stu_id:localStorage.getItem('search-student-id')
          }).then((res)=>{
              // setLoading(false);
              if(res.status===200)
              {
                setIdInformationn(res.data.data);
                  setIsApi(false);
              }
            console.log();
          }).catch(err=>{
            setIsApi(false);
    })


  axios.post<ContactInformationResponseData>('http://api-oasis.localhost/maliisler/maliisler/contact-information',{
    stu_id:localStorage.getItem('search-student-id')
      }).then((res)=>{
          // setLoading(false);
          if(res.status===200)
          {
            setContactInformationn(res.data.data);
              setIsApi(false);
          }
           console.log();
          }).catch(err=>{
            setIsApi(false);
    })

  }
  
}
);
  return (
    <Routes>
    <Route
      element={
        <>
           <StudentInfoHeader 
                id= {studentInfo.id}
                name= {studentInfo.name}
                surname= {studentInfo.surname}
                class= {studentInfo.class}
                anadal_fakulte= {studentInfo.anadal_fakulte}
                anadal_bolum= {studentInfo.anadal_bolum}
                anadal_opsiyon= {studentInfo.anadal_opsiyon}
                email= {studentInfo.email}
                telefon= {studentInfo.telefon}
                cap_fakulte= {studentInfo.cap_fakulte}
                cap_bolum= {studentInfo.cap_bolum}
                cap_opsiyon= {studentInfo.cap_opsiyon}
                yandal_fakulte= {studentInfo.yandal_fakulte}
                yandal_bolum= {studentInfo.yandal_bolum}
                yandal_opsiyon= {studentInfo.yandal_opsiyon}
                durum= {studentInfo.durum}
                durum_tarihi= {studentInfo.durum_tarihi}
                burs_durumu= {studentInfo.burs_durumu}
                burs_tipi= {studentInfo.burs_tipi}
                alinan_ders= {studentInfo.alinan_ders}
                image= {studentInfo.image}
                page={'student-detail'}
                />
          <Outlet />
        </>
      }
    >
      <Route
        path='general-information'
        element={
          <>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Genel Bilgiler</PageTitle>
            <GeneralInformation id={generalInformation.id}
              name={generalInformation.name}
              surname={generalInformation.surname}
              class={+generalInformation.class}
              register_year={+generalInformation.register_year}
              register_date={generalInformation.register_date}
              lisansUstuSinif={generalInformation.lisansUstuSinif}
              uyruk={generalInformation.uyruk}
              mezuniyet_ayrilma_tarihi={generalInformation.mezuniyet_ayrilma_tarihi}
              yatay_gecis_kayit_tarihi={generalInformation.yatay_gecis_kayit_tarihi}
              yatay_gecis_birim_id={+generalInformation.yatay_gecis_birim_id}
              kayit_tipi={generalInformation.kayit_tipi}
              cap_durumu={generalInformation.cap_durumu}
              yandal_durumu={generalInformation.yandal_durumu}
              cap_durum_tarihi={generalInformation.cap_durum_tarihi}
              yandal_durum_tarihi={generalInformation.yandal_durum_tarihi}
              ikinci_yabanci_dil={generalInformation.ikinci_yabanci_dil}
              mut_tercumanlik_dili={generalInformation.mut_tercumanlik_dili}
              disiplin_cezasi={generalInformation.disiplin_cezasi}
              tc_kimlik_no={generalInformation.tc_kimlik_no}
              danisman={generalInformation.danisman}
              cap_danisman={generalInformation.cap_danisman}
              yandal_danisman={generalInformation.yandal_danisman}
              ogr_hakkini_kaybettigi_tarih={generalInformation.ogr_hakkini_kaybettigi_tarih}
              gno_hesabi={generalInformation.gno_hesabi}
              tabi_oldugu_plan={generalInformation.id}
              lisans_ustu_ucret={generalInformation.lisans_ustu_ucret}
              ayni_programi_tekrar_okuma={generalInformation.ayni_programi_tekrar_okuma}
              tabi_olunan_musredat={generalInformation.tabi_olunan_musredat}
              ilave_burs={generalInformation.ilave_burs}
              anadal_fakulte={generalInformation.anadal_fakulte}
              anadal_bolum={generalInformation.anadal_bolum}
              anadal_opsiyon={generalInformation.anadal_opsiyon}
              email={generalInformation.email}
              telefon={generalInformation.telefon}
              cap_fakulte={generalInformation.cap_fakulte}
              cap_bolum={generalInformation.cap_bolum}
              cap_opsiyon={generalInformation.cap_opsiyon}
              yandal_fakulte={generalInformation.yandal_fakulte}
              yandal_bolum={generalInformation.yandal_bolum}
              yandal_opsiyon={generalInformation.yandal_opsiyon}
              std_state={generalInformation.std_state}
              state_date={generalInformation.state_date}
              burs_durumu={generalInformation.burs_durumu}
              burs_tipi={generalInformation.burs_tipi}
              alinan_ders={+generalInformation.alinan_ders} />
          </>
        }
      />
      <Route
        path='id-information'
        element={
          <>
            <PageTitle breadcrumbs={accountBreadCrumbs}>Kimlik Bilgileri</PageTitle>
            <IdInformation 
            id= {idInformationn.id}
            adi= {idInformationn.adi}
            soyadi= {idInformationn.soyadi}
            tc= {idInformationn.tc}
            ogr_kimlik_no= {idInformationn.ogr_kimlik_no}
            seri_no= {idInformationn.seri_no}
            medeni_hal= {idInformationn.medeni_hal}
            baba_adi= {idInformationn.baba_adi}
            anne_adi= {idInformationn.anne_adi}
            kan_grubu= {idInformationn.kan_grubu}
            uyruk= {idInformationn.uyruk}
            cinsiyet= {idInformationn.cinsiyet}
            dini= {idInformationn.dini}
            dogum_tarihi= {idInformationn.dogum_tarihi}
            dogum_yeri= {idInformationn.dogum_yeri}
            askerlik_durumu= {idInformationn.askerlik_durumu}
            askerlik_subesi= {idInformationn.askerlik_subesi}
            posta_kodu= {idInformationn.posta_kodu}
            nif_kayit_il= {idInformationn.nif_kayit_il}
            nif_kayit_ilce= {idInformationn.nif_kayit_ilce}
            mahalle= {idInformationn.mahalle}
            cild_no= {idInformationn.cild_no}
            sira_no= {idInformationn.sira_no}
            cuzdan_kayit_no= {idInformationn.cuzdan_kayit_no}
            hane= {idInformationn.hane}
            kayit_no= {idInformationn.kayit_no}
            verilis_nedeni= {idInformationn.verilis_nedeni}
            verilme_tarihi= {idInformationn.verilme_tarihi}
            verildigi_nifus_dairesi= {idInformationn.verildigi_nifus_dairesi}
            vergi_kimlik_no= {idInformationn.vergi_kimlik_no}
            vergi_dairesi= {idInformationn.vergi_dairesi}
            sex={idInformationn.sex}
            />
          </>
        }
      />
      <Route
        path='contact-information'
        element={
          <>
            <PageTitle breadcrumbs={accountBreadCrumbs}>İletişim Bilgileri</PageTitle>
            <ContactInformation 
            
              address1={contactInformationn.address1}
              address2={contactInformationn.address2}
              address3={contactInformationn.address3}
              posta_kodu={contactInformationn.posta_kodu}
              il={contactInformationn.il}
              telefon1={contactInformationn.telefon1}
              telefon2={contactInformationn.telefon2}
              cep_tel={contactInformationn.cep_tel}
              cep_mezun_tel={contactInformationn.cep_mezun_tel}
              akademik_bilgi={contactInformationn.akademik_bilgi}
              aile_address1={contactInformationn.aile_address1}
              aile_address2={contactInformationn.aile_address2}
              aile_address3={contactInformationn.aile_address3}
              aile_posta_kodu={contactInformationn.aile_posta_kodu}
              aile_sehir={contactInformationn.aile_sehir}
              baba_cep_tel={contactInformationn.baba_cep_tel}
              anne_cep_tel={contactInformationn.anne_cep_tel}
              acil_address1={contactInformationn.acil_address1}
              acil_address2={contactInformationn.acil_address2}
              acil_address3={contactInformationn.acil_address3}
              acil_posta_kodu={contactInformationn.acil_posta_kodu}
              acil_sehir={contactInformationn.acil_sehir}
              acil_telefon={contactInformationn.acil_telefon}
              acil_cep_tel={contactInformationn.acil_cep_tel}
              acil_mail={contactInformationn.acil_mail}
              acil_durumda_aranacak={contactInformationn.acil_durumda_aranacak}
              yakinlik={contactInformationn.yakinlik}
              fatura_address1={contactInformationn.fatura_address1}
              fatura_address2={contactInformationn.fatura_address2}
              fatura_address3={contactInformationn.fatura_address3}
              fatura_posta_kodu={contactInformationn.fatura_posta_kodu}
              fatura_sehir={contactInformationn.fatura_sehir}
              fatura_telefon={contactInformationn.fatura_telefon}
              fatura_vergi_numarasi={contactInformationn.fatura_vergi_numarasi}
              fatura_vergi_dairesi={contactInformationn.fatura_vergi_dairesi}
              fatura_cep_tel={contactInformationn.fatura_cep_tel}
              fatura_mail={contactInformationn.fatura_mail}
              yurttami={contactInformationn.yurttami}
             />
          </>
        }
      />

      <Route index element={<Navigate to='/student-info/general-information' />} />
    </Route>
  </Routes>
  )
}

export default StudentDetailPage






