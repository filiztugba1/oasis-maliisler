import React, { useEffect, useState } from 'react'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import './home.css';
import axios from 'axios';
import { DeptVsPaidList, DeptVsPaidResponse, Report, ReportResponse, TotalScholarshipGrafic, TotalScholarshipList, TotalScholarshipListResponse } from './models/home.model';
import { MixedWidget11 } from '../../../_metronic/partials/widgets';
import ScolarshipTotalList from './ScolarshipTotalList';
import DeptVsPaint from './DeptVsPaid';
import api from '../../services/services';
const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Account',
    path: '/crafted/account/overview',
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

const HomePage: React.FC = () => {
  const [rapor, setRapor] = useState<Report>(
    {
      yeni_ogr_osym_guz: '',
      yeni_ogr_osym_bahar:'',
      yeni_ogr_osym_toplam: '',
      devam_eden_ogr_guz: '',
      devam_eden_ogr_bahar: '',
      devam_eden_ogr_toplam: '',
      yuksek_lisans_guz: '',
      yuksek_lisans_bahar: '',
      yuksek_lisans_toplam: '',
      dgs_guz:'',
      dgs_bahar: '',
      dgs_toplam: '',
      yatay_gecis_guz: '',
      yatay_gecis_bahar: '',
      yatay_gecis_toplam: '',
      yabanci_uyruk_guz: '',
      yabanci_uyruk_bahar: '',
      yabanci_uyruk_toplam: '',
      guz_toplam: '',
      bahar_toplam: '',
      genel_toplam:'',
    }
  );

 

  const [totalscholarshipgrafic, setTotalscholarshipgrafic] = useState<Array<TotalScholarshipGrafic>>([]);
  const [deptVsPaid, setDeptVsPaid] = useState<Array<TotalScholarshipGrafic>>([]);

  const [isApi, setIsApi] = useState(true);
  useEffect(() => {
    if(isApi)
    {
      axios.post<ReportResponse>('http://api-oasis.localhost/maliisler/maliisler/fall-spring-payment-raports',{
          }).then((res)=>{
              // setLoading(false);
              if(res.status===200)
              {
                  setRapor(res.data.data);
                  setIsApi(false);
              }
            console.log();
          }).catch(err=>{
            setIsApi(false);
          })
        
      axios.post<TotalScholarshipListResponse>('http://api-oasis.localhost/maliisler/maliisler/total-scholarship-list').then((res)=>{
                  // setLoading(false);
                  if(res.status===200)
                  {
                    let categories:Array<TotalScholarshipGrafic>=[];
                    res.data.data.forEach(scolar => {
                      categories.push({
                        label:scolar.name,
                        y:+scolar.total
                      })
                    });

                    setTotalscholarshipgrafic(categories);
                    setIsApi(false);
                  }
                console.log();
              }).catch(err=>{
                setIsApi(false);
              })

    axios.post<DeptVsPaidResponse>('http://api-oasis.localhost/maliisler/maliisler/debt-vs-paid').then((res)=>{
                // setLoading(false);
                if(res.status===200)
                {
                  let categories:Array<TotalScholarshipGrafic>=[];
                   
                  api.paymetFormat(res.data.data[0].aliacak)
                    categories.push({
                      label:'Alınacak',
                      y:+res.data.data[0].aliacak
                    })
                    categories.push({
                      label:'Alınacak USD',
                      y:+res.data.data[0].alinacak_usd
                    })

                    categories.push({
                      label:'Ödenen',
                      y:+res.data.data[0].odenen
                    })
                    categories.push({
                      label:'Ödenen USD',
                      y:+res.data.data[0].odenen_usd
                    })
                    console.log(categories);
                    setDeptVsPaid(categories);
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
    <>
      <div className='row'>
        
      
           <div className='col-md-3'>
           <div className='col-md-12'>
          <div className="card mb-5 mb-xl-10">
            <div className="card-header pt-9 pb-0">
              <h4 style={{ textAlign: "center", width: '100%' }}>Güz Gerçekleşme</h4>
            </div>
            <div className="card-body pt-9 pb-0">
              <table className="table table-bordered table-condensed  table-sm table-hover " style={{ border: "1px solid #f1f1f1 !important" }}>

                <tbody>
                  <tr key={1}>
                    <td >Yeni Öğrenci ÖSYM</td>
                    <td >{rapor.yeni_ogr_osym_guz}</td>
                  </tr>
                  <tr key={1}>
                    <td >Devam Eden Öğrenci </td>
                    <td >{rapor.devam_eden_ogr_guz}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yüksek Lisans</td>
                    <td >{rapor.yuksek_lisans_guz}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni DGS</td>
                    <td >{rapor.dgs_guz}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni Yatay Geçiş</td>
                    <td >{rapor.yatay_gecis_guz}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni Yabancı Uyruklu Öğrenci</td>
                    <td >{rapor.yabanci_uyruk_guz}</td>
                  </tr>
                  <tr key={1}>
                    <td >TOPLAM</td>
                    <td >{rapor.guz_toplam}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
        <div className='col-md-12'>
          <div className="card mb-5 mb-xl-10">
            <div className="card-header pt-9 pb-0">
              <h4 style={{ textAlign: "center", width: '100%' }}>Bahar Gerçekleşme</h4>
            </div>
            <div className="card-body pt-9 pb-0">
              <table className="table table-bordered table-condensed  table-sm table-hover " style={{ border: "1px solid #f1f1f1 !important" }}>

              <tbody>
                  <tr key={1}>
                    <td >Yeni Öğrenci ÖSYM</td>
                    <td >{rapor.yeni_ogr_osym_bahar}</td>
                  </tr>
                  <tr key={1}>
                    <td >Devam Eden Öğrenci </td>
                    <td >{rapor.devam_eden_ogr_bahar}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yüksek Lisans</td>
                    <td >{rapor.yuksek_lisans_bahar}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni DGS</td>
                    <td >{rapor.dgs_bahar}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni Yatay Geçiş</td>
                    <td >{rapor.yatay_gecis_bahar}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni Yabancı Uyruklu Öğrenci</td>
                    <td >{rapor.yabanci_uyruk_bahar}</td>
                  </tr>
                  <tr key={1}>
                    <td >TOPLAM</td>
                    <td >{rapor.bahar_toplam}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
        <div className='col-md-12'>
          <div className="card mb-5 mb-xl-10">
            <div className="card-header pt-9 pb-0">
              <h4 style={{ textAlign: "center", width: '100%' }}>Güz-Bahar Gerçekleşme</h4>
            </div>
            <div className="card-body pt-9 pb-0">
              <table className="table table-bordered table-condensed  table-sm table-hover " style={{ border: "1px solid #f1f1f1 !important" }}>

              <tbody>
                  <tr key={1}>
                    <td >Yeni Öğrenci ÖSYM</td>
                    <td >{rapor.yeni_ogr_osym_toplam}</td>
                  </tr>
                  <tr key={1}>
                    <td >Devam Eden Öğrenci </td>
                    <td >{rapor.devam_eden_ogr_toplam}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yüksek Lisans</td>
                    <td >{rapor.yuksek_lisans_toplam}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni DGS</td>
                    <td >{rapor.dgs_toplam}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni Yatay Geçiş</td>
                    <td >{rapor.yatay_gecis_toplam}</td>
                  </tr>
                  <tr key={1}>
                    <td >Yeni Yabancı Uyruklu Öğrenci</td>
                    <td >{rapor.yabanci_uyruk_toplam}</td>
                  </tr>
                  <tr key={1}>
                    <td >TOPLAM</td>
                    <td >{rapor.genel_toplam}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
           </div>
           <div className='col-md-9'>
          <div className="card mb-5 mb-xl-10">
		  <div className="card-body pt-9 pb-0">
      <ScolarshipTotalList className='card-xl-stretch mb-xl-8'
            chartColor='info'
            chartHeight='200px'
            scolarshipTotall={totalscholarshipgrafic}/>
            </div>
            </div>
            
      </div>

      <div className='col-md-12'>
          <div className="card mb-5 mb-xl-10">
		  <div className="card-body pt-9 pb-0">
      <DeptVsPaint className='card-xl-stretch mb-xl-8'
            chartColor='info'
            chartHeight='200px'
            deptVsPaidx={deptVsPaid}/>
            </div>
            </div>
            
      </div>

            </div>
      
    </>
  )
}

export default HomePage
