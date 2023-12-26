import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { StudentInfoHeader } from '../student-info/StudentInfoHeader'
import { StudentDetailModel } from '../student-info/models/_studentdetail.model'
import {  HistoryList, ScholarshipHistoryList, ScholarshipHistoryRequest } from './models/_history.model'
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Modal } from 'react-bootstrap';
import { FacultyList } from '../../services/models/_faculty';
import api from '../../services/services';
import Loading from '../Loading';
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

const catchFunc = (err: any,enqueueSnackbar:any) => {
  if (err.response && err.response.data && err.response.data.message) {
    enqueueSnackbar(err.response.data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
    if (err.response.data.message === 'Expired token') {
      localStorage.clear();
      window.location.href = '/auth';
      // navigate('/auth');
    }
  }
  // setIsApi(false);
}

const StudentHistorySnack: React.FC = () => {
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
      listLoad: false
    }
  );


  // const [isApi, setIsApi] = useState(true);
  const [listLoad, setlistLoad] = useState(false);
  const [listPyLoad, setlistPyLoad] = useState(false);
  const [listModalLoad, setlistModalLoad] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {

    let formdata = {
      stu_id: localStorage.getItem('search-student-id')
    };
    setlistLoad(true);
    api.activeStudentDetail(formdata).then((x) => {
      setlistLoad(false);
      setStudentInfo(x);
    }).catch(err => catchFunc(err,enqueueSnackbar))

    setlistPyLoad(true);
    api.studentHistoryList(formdata).then((x) => {
      setlistPyLoad(false);
      setHistlistx(x);
      setFilteredDataHist(x);
    }).catch(err => catchFunc(err,enqueueSnackbar))

    api.scholarshipHistoryLList(formdata).then((x) => {
      setlistPyLoad(false);
      setHistlistScolaar(x);
      setFilteredDataScolaarHist(x);
    }).catch(err => catchFunc(err,enqueueSnackbar))

    api.historyScholarshipStatus().then((x) => {
      setSssList(x);
      // setIsApi(false);
    }).catch(err => catchFunc(err,enqueueSnackbar))

    api.year().then((x) => {
      setYear(x);
      // setIsApi(false);
    }).catch(err => catchFunc(err,enqueueSnackbar))

  }, [enqueueSnackbar]
  );


  const columnsHistory: TableColumn<typeof Histlistx[0]>[] = [
    { name: 'Yıl', selector: (row) => row.year, sortable: true, cell: row => <div className="cell" style={{}}>{row.year}</div> },
    { name: 'Dönem', selector: (row) => row.semester, sortable: true, cell: row => <div className="cell">{+row.semester === 1 ? 'Güz' : (+row.semester === 2 ? 'Bahar' : 'Yaz')}</div> },
    { name: 'Sınıfı', selector: (row) => row.class, sortable: true, cell: row => <div className="cell">{row.class}</div> },
    { name: 'Tarihçe Durumu', selector: (row) => row.status_name, sortable: true, cell: row => <div className="cell">{row.status_name}</div> },
    { name: 'Tarihçe Durum Tarihi', selector: (row) => row.status_date, sortable: true, cell: row => <div className="cell">{row.status_date}</div> },
    { name: 'Açıklama', selector: (row) => row.explanation, sortable: true, cell: row => <div className="cell">{row.explanation}</div> },
    { name: 'Kullanıcı', selector: (row) => row.user_name, sortable: true, cell: row => <div className="cell">{row.user_name}</div> },
    // { name: 'İşlem', selector: (row) => '', sortable: true , cell: row => 
    // <div className="cell"> <span><button className='btn  btn-warning btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-pen'></i></button></span>
    // <span><button className='btn  btn-danger btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-trash'></i></button></span></div>},


  ];
  const [Histlistx, setHistlistx] = useState<Array<HistoryList>>([]);

  const exportToExcelhistory = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = studentInfo.id + ' - ' + studentInfo.name + ' ' + studentInfo.surname + ' ' + ' Tarihçe listesi';

    const formattedData = filteredDataHist.map((item) => ({
      'Yıl': item.year,
      'Dönem': +item.semester === 1 ? 'Güz' : (+item.semester === 2 ? 'Bahar' : 'Yaz'),
      'Sınıfı': item.class,
      'Tarihçe Durumu': item.status_name,
      'Tarihçe Durum Tarihi': item.status_date,
      'Açıklama': item.explanation,
      'Kullanıcı': item.user_name,
    }));


    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const [filteredDataHist, setFilteredDataHist] = useState(Histlistx);
  const handleSearch = (e: any) => {
    // const searchTerm = e.target.value;
    const filteredItems = Histlistx
    // .filter((item) =>
    //   (item.name+' '+item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.ogrno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   +item.id_no== +searchTerm ||
    //   item.name_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.scholarship.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.status_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.regtype.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.sexx.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    setFilteredDataHist(filteredItems);
  };




  const columnsHistoryScolaar: TableColumn<typeof HistlistScolaar[0]>[] = [
    { name: 'Yıl', selector: (row) => row.Year, sortable: true, cell: row => <div className="cell" style={{}}>{row.Year}</div> },
    { name: 'Dönem', selector: (row) => row.Semester, sortable: true, cell: row => <div className="cell">{+row.Semester === 1 ? 'Güz' : (+row.Semester === 2 ? 'Bahar' : 'Yaz')}</div> },
    { name: 'Bölüm', selector: (row) => row.badi, sortable: true, cell: row => <div className="cell">{row.badi}</div> },
    { name: 'Tarihçe Durumu', selector: (row) => row.stat, sortable: true, cell: row => <div className="cell">{row.stat}</div> },
    { name: 'Tarihçe Durum Tarihi', selector: (row) => row.stat_date, sortable: true, cell: row => <div className="cell">{row.stat_date}</div> },
    { name: 'Kullanıcı', selector: (row) => row.adi + ' ' + row.soyadi, sortable: true, cell: row => <div className="cell">{row.adi + ' ' + row.soyadi}</div> },
    {
      name: 'İşlem', selector: (row) => '', cell: (row) => +row.sid === 119 || +row.sid === 99 ? <div>
        <span><button className='btn  btn-warning btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => updateShow(row)}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => deleteShow(row)}><i className='fa fa-trash'></i></button></span>
      </div> : '',
      sortable: true
    },


  ];

  const updateShow = (row: ScholarshipHistoryList) => {
    setSelectedYear(yearList.find((x) => +x.value === +row.Year) ?? null);
    setSelectedScholarship(sssList.find((x) => +x.value === +row.sid) ?? null);
    setFormDataScolar({
      year: row.Year,
      semester: row.Semester,
      scholarship_type: row.sid,
      scholarship_status: row.stat_id,
      explanation: row.Explanation,
      std_state_date: row.stat_date_,
      update_date: row.update_date_,
      actionType: 'update'
    });
    handlePaymentShow();
  }

  const deleteShow = (row: ScholarshipHistoryList) => {
    setSelectedYear(yearList.find((x) => +x.value === +row.Year) ?? null);
    setSelectedScholarship(sssList.find((x) => +x.value === +row.sid) ?? null);
    setFormDataScolar({
      year: row.Year,
      semester: row.Semester,
      scholarship_type: row.sid,
      scholarship_status: row.stat_id,
      explanation: row.Explanation,
      std_state_date: row.stat_date_,
      update_date: row.update_date_,
      actionType: 'delete'
    });
    handleDeleteScolarShow();
  }

  const createPaymentShow = () => {
    setSelectedYear(null);
    setSelectedScholarship(null);
    setFormDataScolar({
      year: "",
      semester: "",
      scholarship_type: "",
      scholarship_status: "",
      explanation: "",
      std_state_date: "",
      update_date: "",
      actionType: 'insert'
    });
    handlePaymentShow();
  }


  const [HistlistScolaar, setHistlistScolaar] = useState<Array<ScholarshipHistoryList>>([]);

  const exportToExcelScolaarhistory = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = studentInfo.id + ' - ' + studentInfo.name + ' ' + studentInfo.surname + ' ' + 'Burs Tarihçesi';

    const formattedData = filteredDataScolaarHist.map((item) => ({
      'Yıl': item.Year,
      'Dönem': +item.Semester === 1 ? 'Güz' : (+item.Semester === 2 ? 'Bahar' : 'Yaz'),
      'Bölüm': item.badi,
      'Tarihçe Durumu': item.stat,
      'Tarihçe Durum Tarihi': item.stat_date,
      'Kullanıcı': item.adi + ' ' + item.soyadi,
    }));


    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const [filteredDataScolaarHist, setFilteredDataScolaarHist] = useState(HistlistScolaar);
  const handleSearchScolaar = (e: any) => {
    // const searchTerm = e.target.value;
    const filteredItems = Histlistx
    // .filter((item) =>
    //   (item.name+' '+item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.ogrno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   +item.id_no== +searchTerm ||
    //   item.name_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.scholarship.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.status_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.regtype.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   item.sexx.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    setFilteredDataHist(filteredItems);
  };
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentClose = () => setShowPayment(false);
  const handlePaymentShow = () => setShowPayment(true);


  const [deleteshowPayment, setDeleteShowPayment] = useState(false);

  const handleDeleteScolarClose = () => setDeleteShowPayment(false);
  const handleDeleteScolarShow = () => setDeleteShowPayment(true);
  const [formDataScolar, setFormDataScolar] = useState<ScholarshipHistoryRequest>(
    {
      year: "",
      semester: "",
      scholarship_type: "",
      scholarship_status: "",
      explanation: "",
      std_state_date: "",
      update_date: "",
      actionType: 'insert'

    }
  );

  const handleScolarSubmit = (e: any) => {
    e.preventDefault();
    let cu = 'Güncelleme';
    if (formDataScolar.actionType === 'insert') {
      cu = 'Ekleme';
    }
    setlistModalLoad(true);
    api.scholarshipHistoryUpdate(formDataScolar).then((x) => {
      setlistModalLoad(false);
      if (+x.status === 200) {
        enqueueSnackbar(cu + ' işlemi başarılı bir şekilde gerçekleşmiştir', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
        handlePaymentClose();
      }
      else {
        enqueueSnackbar(cu + ' işlemi sırasında hata oluştu.Oluşan Hata:' + x.data, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
      }
    }).catch(err => catchFunc(err,enqueueSnackbar))
  
  };


  const handleDeletePaymentSubmit = (e: any) => {
    e.preventDefault();
    setlistModalLoad(true);
    api.scholarshipHistoryDelete(formDataScolar).then((x) => {
      setlistModalLoad(false);
      if (+x.status === 200) {
        enqueueSnackbar(x.data, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
        handlePaymentClose();
      }
      else {
        enqueueSnackbar(x.data, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
      }
    }).catch(err => catchFunc(err,enqueueSnackbar))
  };


  const handleScolarChange = (e: any) => {
    const { name, value } = e.target;
    formDoldurPayment(name, value)
    // setFormData({ ...formData, [name]: value });
  };
  const formDoldurPayment = (key: any, value: any) => {
    setFormDataScolar(
      {
        year: key === 'year' ? value : formDataScolar.year,
        semester: key === 'semester' ? value : formDataScolar.semester,
        scholarship_type: key === 'scholarship_type' ? value : formDataScolar.scholarship_type,
        scholarship_status: key === 'scholarship_status' ? value : formDataScolar.scholarship_status,
        explanation: key === 'explanation' ? value : formDataScolar.explanation,
        std_state_date: key === 'std_state_date' ? value : formDataScolar.std_state_date,
        update_date: key === 'update_date' ? value : formDataScolar.update_date,
        actionType: key === 'actionType' ? value : formDataScolar.actionType,

      }
    );
  };
  const [selectedYear, setSelectedYear] = React.useState<null | FacultyList>(null);
  const handleRegisterYear = (selected: any) => {
    setSelectedYear(selected);
    formDoldurPayment("year", selected.value);
  };
  const [sssList, setSssList] = useState<Array<FacultyList>>([]);
  const [yearList, setYear] = useState<Array<FacultyList>>([]);

  const [selectedScholarship, setSelectedScholarship] = React.useState<null | FacultyList>(null);
  const handleScholarshipChange = (selected: any) => {
    setSelectedScholarship(selected);
    formDoldurPayment("year", selected.value);
  };



  return (

    <>
      <Routes>
        <Route
          element={
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
                page={'student-history'}
                listLoad={listLoad}
              />
              <Outlet />
            </>
          }
        >
          <Route
            path='history'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Tarihçe Bilgileri</PageTitle>
                <div className='card mb-5 mb-xl-10'>
                {listPyLoad?<Loading/>:''}
                
                
                  <div className='card-header pt-9 pb-0'>
                    Tarihçe Bilgileri
                  </div>
                  <div className='card-body pt-9 pb-0'>
                    {Histlistx.length ?
                      <>
                        <button style={{ float: "left" }} className='btn btn-sm btn-primary' onClick={exportToExcelhistory}>Export to Excel</button>

                        <input style={{ float: "right" }}
                          type="text"
                          placeholder="Arama Yap"
                          onChange={handleSearch}
                        />
                      </> : ''}
                    <DataTable
                      columns={columnsHistory}
                      data={filteredDataHist}
                      noDataComponent={'Kayıt bulunamadı'}
                      pagination // If you want to enable pagination
                      keyField="ogrno"
                      className="dataTableHeader"
                    />
                  </div>

                </div>
              </>
            }
          />


          <Route
            path='scholarship-history'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Burs Tarihçesi</PageTitle>
                <div className='card mb-5 mb-xl-10'>
                {listPyLoad?<Loading/>:''}
                  <div className='card-header pt-9 pb-0'>
                    <h4> Burs Tarihçesi</h4>
                    <span><button className='btn btn-sm btn-primary' onClick={createPaymentShow}>Burs Ekle</button></span>
                  </div>

                  <div className='card-body pt-9 pb-0'>
                    {HistlistScolaar.length ?
                      <>
                        <button style={{ float: "left" }} className='btn btn-sm btn-primary' onClick={exportToExcelScolaarhistory}>Export to Excel</button>

                        <input style={{ float: "right" }}
                          type="text"
                          placeholder="Arama Yap"
                          onChange={handleSearchScolaar}
                        />
                      </> : ''}
                    <DataTable
                      columns={columnsHistoryScolaar}
                      data={filteredDataScolaarHist}
                      noDataComponent={'Kayıt bulunamadı'}
                      pagination // If you want to enable pagination
                      keyField="ogrno"
                      className="dataTableHeader"
                    />
                  </div>


                </div>
              </>
            }
          />


          <Route index element={<Navigate to='/student-history/history' />} />
        </Route>
      </Routes>

      <Modal show={showPayment} onHide={handlePaymentClose} size='xl'>
      {listModalLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>{(selectedYear !== null ? selectedYear.label : '') + (+formDataScolar.semester === 1  || formDataScolar.semester===''? ' Güz' : (+formDataScolar.semester === 2 ? ' Bahar' : ' Yaz')) + ' dönemi "' + (selectedScholarship !== null ? selectedScholarship.label : '') + '" Tahsilat Bilgilerini ' + (formDataScolar.actionType === 'insert' ? 'Ekleme' : 'Güncelleme')}</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleScolarSubmit}>
          <div className="card mb-5 mb-xl-10">

            <div className="card-body pt-9 pb-0">

              <Modal.Body>

                <div className='row'>


                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Yıl</span>
                    </label>

                    <Select
                      value={selectedYear}
                      onChange={handleRegisterYear}
                      options={yearList}
                      isSearchable={true}
                      placeholder="yılı seçiniz"
                      name='year'
                    />
                  </div>

                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>Dönem</label>
                    <div className='col-lg-12 fv-row'>
                      <select
                        className='form-select'
                        onChange={handleScolarChange}
                        name="semester"
                        value={formDataScolar.semester}
                      >
                        <option value='1'>Güz</option>
                        <option value='2'>Bahar</option>
                        <option value='3'>Yaz</option>
                      </select>
                    </div>
                  </div>


                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Burs/İndirim Tipi</span>
                    </label>

                    <Select
                      value={selectedScholarship}
                      onChange={handleScholarshipChange}
                      options={sssList}
                      isSearchable={true}
                      placeholder="burs indirim tipini seçiniz"
                    />
                  </div>


                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>Burs/İndirim Durumu</label>
                    <div className='col-lg-12 fv-row'>
                      <select
                        className='form-select'
                        onChange={handleScolarChange}
                        name="scholarship_status"
                        value={formDataScolar.scholarship_status}
                      >
                        <option value="">Seçiniz</option>
                        <option value="1">Başvurdu</option>
                        <option value="2">Alıyor</option>
                        <option value="3">Almıyor</option>
                        <option value="4">Kesildi</option>
                        <option value="5">Durduruldu</option>
                        <option value="6">Değişti</option>
                      </select>
                    </div>
                  </div>




                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Tarihçe Durum Tarihi</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleScolarChange}
                      name="std_state_date"
                      value={formDataScolar.std_state_date}
                    />

                  </div>
                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Güncelleme Tarihi</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleScolarChange}
                      name="update_date"
                      value={formDataScolar.update_date}
                    />

                  </div>

                  <div className='col-md-12'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Açıklama</span>
                    </label>
                    <textarea className='form-control' onChange={handleScolarChange} name="explanation"
                      value={formDataScolar.explanation} >{formDataScolar.explanation}</textarea>

                  </div>
                </div>


              </Modal.Body>

            </div>


          </div>
          <Modal.Footer>
            <a className='btn btn-secondary btn-xs' onClick={handlePaymentClose}>
              Kapat
            </a>
            <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
              Kaydet
            </button>
          </Modal.Footer>
        </form>

      </Modal>

      <Modal show={deleteshowPayment} onHide={handleDeleteScolarClose} >
      {listModalLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>{(selectedYear !== null ? selectedYear.label : '') + (+formDataScolar.semester === 1 ? ' Güz' : (+formDataScolar.semester === 2 ? ' Bahar' : ' Yaz')) + ' dönemi "' + (selectedScholarship !== null ? selectedScholarship.label : '') + '" Bilgilerini Silme'}</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleDeletePaymentSubmit}>
          <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
              <Modal.Body>
                <div className='row'>
                  Silmek istediğinize emin misiniz?
                </div>
              </Modal.Body>
            </div>
          </div>
          <Modal.Footer>
            <a className='btn btn-secondary btn-xs' onClick={handleDeleteScolarClose}>
              Kapat
            </a>
            <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
              Sil
            </button>
          </Modal.Footer>
        </form>

      </Modal>

    </>
  )
}
function StudentHistory() {
  return (
    <SnackbarProvider maxSnack={3}>
      <StudentHistorySnack />
    </SnackbarProvider>
  );
}

export default StudentHistory






