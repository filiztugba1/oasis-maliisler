import React, { FC, KeyboardEvent, useEffect, useRef, useState, Component } from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { StudentInfoHeader } from '../student-info/StudentInfoHeader'
import axios from "axios";
import { StudentDetailModel, StudentDetailResponseData } from '../student-info/models/_studentdetail.model'
import { RelationMaliDetailRequest, RelationMaliDetailResponse, RelationMaliDetail, } from './models/_relationmali.model'
import { Switch } from '@mui/material';
import '../style.css';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

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



const RelationMaliSnack: React.FC = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<RelationMaliDetailRequest>(
    {
      mali_aciklama:"",
      mali_borc:0,
      mali_diploma:0,
      mali_diploma_cap:0,
      mali_kimlik:0,
      stu_id:""
    }
  );
  
  
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      durum: 0,
      durum_tarihi: "",
      burs_durumu: "",
      burs_tipi: "",
      alinan_ders: 0,
      image: "",
      page: "",
      listLoad:false
    }
  );

  const [relationMaliDetail, setRelationMaliDetail] = useState<RelationMaliDetail>();


  const [isApi, setIsApi] = useState(true);
  useEffect(() => {
    if (isApi) {

      axios.post<StudentDetailResponseData>('http://api-oasis.localhost/maliisler/maliisler/active-student-detail', {
        stu_id: localStorage.getItem('search-student-id')
      }).then((res) => {
        // setLoading(false);
        if (res.status === 200) {
          setStudentInfo(res.data.data);
          setIsApi(false);
        }
        console.log();
      }).catch(err => {
        setIsApi(false);
      })

      axios.post<RelationMaliDetailResponse>('http://api-oasis.localhost/maliisler/maliisler/financial-affairs-associated-information', {
        stu_id: localStorage.getItem('search-student-id')
      }).then((res) => {
        // setLoading(false);
        if (res.status === 200) {
          const datam=res.data.data;
          setFormData(
            {
              mali_aciklama: datam.mali_aciklama,
              mali_borc: +datam.mali_borc,
              mali_diploma: +datam.mali_diploma,
              mali_diploma_cap: +datam.mali_diploma_cap,
              mali_kimlik: +datam.mali_kimlik,
              stu_id: datam.id,
            }
          );

          setIsApi(false);
        }
        console.log();
      }).catch(err => {
        setIsApi(false);
      })
    }

  }
  );
  const toggle = (key:any) => {
    setFormData(
      {
        mali_aciklama: formData.mali_aciklama,
        mali_borc: key=='mali_borc'?(formData.mali_borc?0:1):formData.mali_borc,
        mali_diploma: key=='mali_diploma'?(formData.mali_diploma?0:1):formData.mali_diploma,
        mali_diploma_cap: key=='mali_diploma_cap'?(formData.mali_diploma_cap?0:1):formData.mali_diploma_cap,
        mali_kimlik: key=='mali_kimlik'?(formData.mali_kimlik?0:1):formData.mali_kimlik,
        stu_id: formData.stu_id,
      }
    );

  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
      axios.post<RelationMaliDetailResponse>('http://api-oasis.localhost/maliisler/maliisler/faai-update',formData).then((res)=>{
              // setLoading(false);
              if(res.status===200)
              {
                enqueueSnackbar('Kaydetme işleminiz başarılı bir şekilde gerçekleştirilmiştir.', { variant:'success',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
              }
              else
              {
                enqueueSnackbar('Kaydetme işlemi sırasında hata oluştu.Oluşan Hata:'+res.data, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
              }
          }).catch(err => {
            enqueueSnackbar('Kaydetme işlemi sırasında hata oluştu.Lütfen YBS ye bildirin!', { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
          })
  };

  return (
    <>
      <StudentInfoHeader
        id={studentInfo.id}
        name={studentInfo.name}
        surname={studentInfo.surname}
        class={studentInfo.class}
        anadal_fakulte={studentInfo.anadal_fakulte}
        anadal_bolum={studentInfo.anadal_bolum}
        anadal_opsiyon={studentInfo.anadal_opsiyon}
        email={studentInfo.email}
        telefon={studentInfo.telefon}
        cap_fakulte={studentInfo.cap_fakulte}
        cap_bolum={studentInfo.cap_bolum}
        cap_opsiyon={studentInfo.cap_opsiyon}
        yandal_fakulte={studentInfo.yandal_fakulte}
        yandal_bolum={studentInfo.yandal_bolum}
        yandal_opsiyon={studentInfo.yandal_opsiyon}
        durum={studentInfo.durum}
        durum_tarihi={studentInfo.durum_tarihi}
        burs_durumu={studentInfo.burs_durumu}
        burs_tipi={studentInfo.burs_tipi}
        alinan_ders={studentInfo.alinan_ders}
        image={studentInfo.image}
        page={'student-relationMaliDetail'}
        listLoad={false}
      />
      <PageTitle breadcrumbs={accountBreadCrumbs}>Öğrencinin mali işler ilişik bilgileri</PageTitle>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header pt-9 pb-0'>
          Öğrencinin mali işler ilişik bilgileri
        </div>
        <div className='card-body pt-9 pb-0'>
        <form onSubmit={handleSubmit}>
        <div className='row'>
     
          <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >DİPLOMA BEDELİ (ANADAL)</span>
                    </label>
                  
                    <Switch
                      checked={+formData.mali_diploma===0?false:true}
                      onChange={()=>toggle('mali_diploma')}
                      name="mali_diploma"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

          </div>

          <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >DİPLOMA BEDELİ (ÇAP/YDP)</span>
                    </label>
                  
                    <Switch
                      checked={+formData.mali_diploma_cap===0?false:true}
                      onChange={()=>toggle('mali_diploma_cap')}
                      name="mali_diploma_cap"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

          </div>


        <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >ÖĞRETİM ÜCRETİ BORCU</span>
                    </label>
                  
                    <Switch
                      checked={+formData.mali_kimlik===0?false:true}
                      onChange={()=>toggle('mali_kimlik')}
                      name="mali_kimlik"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

                </div>
          

          <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >ÖĞRETİM ÜCRETİ BORCU</span>
                    </label>
                  
                    <Switch
                      checked={+formData.mali_borc===0?false:true}
                      onChange={()=>toggle('mali_borc')}
                      name="mali_borc"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

                </div>
                

          <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span>AÇIKLAMA</span>
              </label>
              <input
                type='text'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleChange}
                name="mali_aciklama"
                value={formData.mali_aciklama}
              />
          </div>
          
          <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>İLİŞİĞİ</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  value={relationMaliDetail?.mali_diploma=="0" && relationMaliDetail?.mali_diploma_cap=="0"
                    && relationMaliDetail?.mali_kimlik=="0" && relationMaliDetail?.mali_borc=="0"?'':'1'
                    }
                >
                  <option value=''>Yok</option>
                  <option value='1'>Var</option>
                </select>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end mt-10' style={{ height: "43px" }}>
              <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
                Kaydet
              </button>
            </div>

            </div>
            </form>
            <br />
            <br />
        </div>
      </div>
    </>

  )
}

function RelationMali() {
  return (
    <SnackbarProvider maxSnack={3}>
      <RelationMaliSnack />
    </SnackbarProvider>
  );
}
export default RelationMali






