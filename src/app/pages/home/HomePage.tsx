import React, { useEffect, useState } from 'react'
import '../style.css';
import { Report, TotalScholarshipGrafic} from './models/home.model';
import ScolarshipTotalList from './ScolarshipTotalList';
import DeptVsPaint from './DeptVsPaid';
import api from '../../services/services';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';

const catchFunc = (err: any,enqueueSnackbar:any) => {
  if (err.response && err.response.data && err.response.data.message) {
    enqueueSnackbar(err.response.data.message, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
    if (err.response.data.message === 'Expired token' || err.response.data.message === 'Undefined index: password') {
      localStorage.clear();
      window.location.href = '/auth';
      // navigate('/auth');
    }
  }
  // setIsApi(false);
}

const HomePageSnack: React.FC = () => {
  const [rapor, setRapor] = useState<Report>(
    {
      yeni_ogr_osym_guz: '',
      yeni_ogr_osym_bahar: '',
      yeni_ogr_osym_toplam: '',
      devam_eden_ogr_guz: '',
      devam_eden_ogr_bahar: '',
      devam_eden_ogr_toplam: '',
      yuksek_lisans_guz: '',
      yuksek_lisans_bahar: '',
      yuksek_lisans_toplam: '',
      dgs_guz: '',
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
      genel_toplam: '',
    }
  );
  const [totalscholarshipgrafic, setTotalscholarshipgrafic] = useState<Array<TotalScholarshipGrafic>>([]);
  const [deptVsPaid, setDeptVsPaid] = useState<Array<TotalScholarshipGrafic>>([]);
  // const [isApi, setIsApi] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  const [guzGLoad, setguzGLoad] = useState(false);
  const [baharGLoad, setbaharGLoad] = useState(false);
  const [guzbaharGLoad, setguzbaharGLoad] = useState(false);
  const [bursLoad, setbursLoad] = useState(false);
  const [alinacakLoad, setalinacakLoad] = useState(false);

  useEffect(() => {
    setguzGLoad(true);
    setbaharGLoad(true);
    setguzbaharGLoad(true);
    api.fallSpringPaymentRaports().then((x) => {
      setRapor(x);
      setguzGLoad(false);
      setbaharGLoad(false);
      setguzbaharGLoad(false);
    }).catch(err => catchFunc(err,enqueueSnackbar))

    setbursLoad(true);
    api.totalScholarshipList().then((x) => {
      let categories: Array<TotalScholarshipGrafic> = [];
      x.forEach(scolar => {
        categories.push({
          label: scolar.name,
          y: +scolar.total
        })
      });
      setbursLoad(false);
      setTotalscholarshipgrafic(categories);
      // setIsApi(false);
    }).catch(err => catchFunc(err,enqueueSnackbar))

    setalinacakLoad(true);
    api.debtVsPaid().then((x: any) => {
      let categories: Array<TotalScholarshipGrafic> = [];

      api.paymetFormat(x[0].aliacak)
      categories.push({
        label: 'Alınacak',
        y: +x[0].aliacak
      })
      categories.push({
        label: 'Alınacak USD',
        y: +x[0].alinacak_usd
      })

      categories.push({
        label: 'Ödenen',
        y: +x[0].odenen
      })
      categories.push({
        label: 'Ödenen USD',
        y: +x[0].odenen_usd
      })
      console.log(categories);
      setalinacakLoad(false);
      setDeptVsPaid(categories);
      // setIsApi(false);
    }).catch(err => catchFunc(err,enqueueSnackbar))
  }, [enqueueSnackbar]);


  return (
    
    <>
   
      <div className='row'>
        <div className='col-md-3'>
          <div className='col-md-12'>
        
            <div className="card mb-5 mb-xl-10">
              {guzGLoad?<Loading/>:''}
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
                    <tr key={2}>
                      <td >Devam Eden Öğrenci </td>
                      <td >{rapor.devam_eden_ogr_guz}</td>
                    </tr>
                    <tr key={3}>
                      <td >Yüksek Lisans</td>
                      <td >{rapor.yuksek_lisans_guz}</td>
                    </tr>
                    <tr key={4}>
                      <td >Yeni DGS</td>
                      <td >{rapor.dgs_guz}</td>
                    </tr>
                    <tr key={5}>
                      <td >Yeni Yatay Geçiş</td>
                      <td >{rapor.yatay_gecis_guz}</td>
                    </tr>
                    <tr key={6}>
                      <td >Yeni Yabancı Uyruklu Öğrenci</td>
                      <td >{rapor.yabanci_uyruk_guz}</td>
                    </tr>
                    <tr key={7}>
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
            {baharGLoad?<Loading/>:''}
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
                    <tr key={2}>
                      <td >Devam Eden Öğrenci </td>
                      <td >{rapor.devam_eden_ogr_bahar}</td>
                    </tr>
                    <tr key={3}>
                      <td >Yüksek Lisans</td>
                      <td >{rapor.yuksek_lisans_bahar}</td>
                    </tr>
                    <tr key={5}>
                      <td >Yeni DGS</td>
                      <td >{rapor.dgs_bahar}</td>
                    </tr>
                    <tr key={6}>
                      <td >Yeni Yatay Geçiş</td>
                      <td >{rapor.yatay_gecis_bahar}</td>
                    </tr>
                    <tr key={7}>
                      <td >Yeni Yabancı Uyruklu Öğrenci</td>
                      <td >{rapor.yabanci_uyruk_bahar}</td>
                    </tr>
                    <tr key={8}>
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
            {guzbaharGLoad?<Loading/>:''}
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
                    <tr key={2}>
                      <td >Devam Eden Öğrenci </td>
                      <td >{rapor.devam_eden_ogr_toplam}</td>
                    </tr>
                    <tr key={3}>
                      <td >Yüksek Lisans</td>
                      <td >{rapor.yuksek_lisans_toplam}</td>
                    </tr>
                    <tr key={4}>
                      <td >Yeni DGS</td>
                      <td >{rapor.dgs_toplam}</td>
                    </tr>
                    <tr key={5}>
                      <td >Yeni Yatay Geçiş</td>
                      <td >{rapor.yatay_gecis_toplam}</td>
                    </tr>
                    <tr key={6}>
                      <td >Yeni Yabancı Uyruklu Öğrenci</td>
                      <td >{rapor.yabanci_uyruk_toplam}</td>
                    </tr>
                    <tr key={7}>
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
            {bursLoad?<Loading/>:''}
              <ScolarshipTotalList className='card-xl-stretch mb-xl-8'
                chartColor='info'
                chartHeight='200px'
                scolarshipTotall={totalscholarshipgrafic} />
            </div>
          </div>

        </div>

        <div className='col-md-12'>
          <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
            {alinacakLoad?<Loading/>:''}
              <DeptVsPaint className='card-xl-stretch mb-xl-8'
                chartColor='info'
                chartHeight='200px'
                deptVsPaidx={deptVsPaid} />
            </div>
          </div>

        </div>

      </div>

    </>
  )
}
function HomePage() {
  return (
    <SnackbarProvider maxSnack={3}>
      <HomePageSnack />
    </SnackbarProvider>
  );
}
export default HomePage
