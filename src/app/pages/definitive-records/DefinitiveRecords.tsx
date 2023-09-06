import React, { FC, KeyboardEvent, useEffect, useRef, useState, Component } from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import axios from "axios";
import { DefinitiveRecordRequest, DefinitiveRecordList, DefinitiveRecordResponse } from './models/_definitiverecords.model'
import { DefinitiveRecordlistColumn } from './components/DefinitiveRecordlistColumn'
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, readFile, utils } from 'xlsx';
import api from '../../services/services';
import { DepartmentList } from '../../services/models/_department';
import { FacultyList } from '../../services/models/_faculty';
import { StuStatusList } from '../../services/models/_stuStatus';
import { RegisterTypeList } from '../../services/models/_registerType';
import { ScholarshipHistoryList } from '../student-history/models/_history.model';
import { YearList } from '../../services/models/_year';
// import 'react-data-table-component/dist/data-table.css';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
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


const DefinitiveRecordsSnack: React.FC = () => {
  const [isApi, setIsApi] = useState(true);
  const [fList, setFList] = useState<Array<FacultyList>>([]);
  const [dList, setDList] = useState<Array<DepartmentList>>([]);
  const [ssList, setSsList] = useState<Array<StuStatusList>>([]);
  const [rtList, setRtList] = useState<Array<RegisterTypeList>>([]);
  const [bDisabled, setBDisabled] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [listLoad, setlistLoad] = useState(false);
  const [tableisActive, settableisActive] = useState(false);


  const [selectedFaculty, setSelectedFaculty] = React.useState(null);
  const handleFacultyChange = (selected: any) => {
    setSelectedFaculty(selected);
    setFormData({
      register_type: formData.register_type,
      d: formData.d,
      f: selected.value,
      register_date_finish: formData.register_date_finish,
      register_date_start: formData.register_date_start,
      std_state: formData.std_state
    })
    api.department({ f: selected.value }).then((x) => {
      setDList(x);
      setBDisabled(false);
    }).catch(err => catchFunc(err))
  };

  const [selectedDepartment, setSelectedDepartment] = React.useState(null);
  const handleDepartmentChange = (selected: any) => {
    setSelectedDepartment(selected);
    setFormData({
      register_type: formData.register_type,
      d: selected.value,
      f: formData.f,
      register_date_finish: formData.register_date_finish,
      register_date_start: formData.register_date_start,
      std_state: formData.std_state
    })
  };

  const [selectedStuStatus, setSelectedStuStatus] = React.useState(null);
  const handleStuStatusChange = (selected: any) => {
    setSelectedStuStatus(selected);
    let secim = [];
    for (let i = 0; i < selected.length; i++) {
      secim.push(+selected[i].value);
    }
    setFormData({
      register_type: formData.register_type,
      d: formData.d,
      f: formData.f,
      register_date_finish: formData.register_date_finish,
      register_date_start: formData.register_date_start,
      std_state: JSON.stringify(secim)
    })
  };

  const [selectedRegisterType, setSelectedRegisterType] = React.useState(null);
  const handleRegisterTypeChange = (selected: any) => {
    setSelectedRegisterType(selected);
    setFormData({
      register_type: selected.value,
      d: formData.d,
      f: formData.f,
      register_date_finish: formData.register_date_finish,
      register_date_start: formData.register_date_start,
      std_state: formData.std_state
    })
  };

  const [definitiverecordlist, setDefinitiverecordlist] = useState<Array<DefinitiveRecordList>>([]);
  const [filteredData, setFilteredData] = useState(definitiverecordlist);
  const [formData, setFormData] = useState<DefinitiveRecordRequest>(
    {
      d: '',
      f: '',
      register_date_finish: '',
      register_date_start: '',
      register_type: 0,
      std_state: ''
    }
  );
  const columns: TableColumn<typeof definitiverecordlist[0]>[] = [
    { name: 'TC Kimlik No', selector: (row) => row.id_no, sortable: true, cell: row => <div className="cell">{row.id_no}</div> },
    { name: 'Öğrenci No', selector: (row) => row.ogrno, sortable: true, cell: row => <div className="cell">{row.ogrno}</div> },
    { name: 'Öğrenci Adı-Soyadı', selector: (row) => row.name + ' ' + row.surname, sortable: true, cell: row => <div className="cell">{row.name + ' ' + row.surname}</div> },
    { name: 'Fakülte', selector: (row) => row.faculty, sortable: true, cell: row => <div className="cell">{row.faculty}</div> },
    { name: 'Bölüm', selector: (row) => row.name_tr, sortable: true, cell: row => <div className="cell">{row.name_tr}</div> },
    { name: 'Cinsiyeti', selector: (row) => row.sexx, sortable: true, cell: row => <div className="cell">{row.sexx}</div> },
    { name: 'Kayıt Kontenjanı', selector: (row) => row.scholarship, sortable: true, cell: row => <div className="cell">{row.scholarship}</div> },
    { name: 'Kayıt Tarihi', selector: (row) => row.register_date, sortable: true, cell: row => <div className="cell">{row.register_date}</div> },
    { name: 'Kayıt Tipi', selector: (row) => row.regtype, sortable: true, cell: row => <div className="cell">{row.regtype}</div> },
    { name: 'Durum', selector: (row) => row.status_tr, sortable: true, cell: row => <div className="cell">{row.regtype}</div> },
  ];
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    settableisActive(true);
    setlistLoad(true);
    api.definitiveRecords(formData).then((x) => {
      setlistLoad(false);
        setDefinitiverecordlist(x);
        setFilteredData(x);
      setIsApi(false);
    }).catch(err => catchFunc(err))
  };

  const catchFunc = (err: any) => {
    if (err.response && err.response.data && err.response.data.message) {
      enqueueSnackbar(err.response.data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
      if (err.response.data.message === 'Expired token') {
        localStorage.clear();
        window.location.href = '/auth';
        // navigate('/auth');
      }
    }
    setIsApi(false);
  }
  const handleSearch = (e: any) => {
    const searchTerm = e.target.value;
    const filteredItems = definitiverecordlist.filter((item) =>
      (item.name + ' ' + item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ogrno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      +item.id_no == +searchTerm ||
      item.name_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scholarship.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.regtype.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sexx.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';

    const formattedData = filteredData.map((item) => ({
      'TC Kimlik No': item.id_no,
      'Öğrenci No': item.ogrno,
      'Öğrenci Adı-Soyadı': item.name + ' ' + item.surname,
      'Fakülte': item.faculty,
      'Bölüm': item.name_tr,
      'Cinsiyeti': item.sexx,
      'Kayıt Kontenjanı': item.scholarship,
      'Kayıt Tarihi': item.register_date,
      'Kayıt Tipi': item.regtype,
      'Durum': item.status_tr,
    }));
    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  useEffect(() => {
    api.faculty().then((x) => {
      setFList(x);
      setIsApi(false);
    }).catch(err => catchFunc(err))

    api.stuStatus().then((x) => {
      setSsList(x);
      setIsApi(false);
    }).catch(err => catchFunc(err))

    api.registerType().then((x) => {
      setRtList(x);
      setIsApi(false);
    }).catch(err => catchFunc(err))
  },[]);
  
  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div className="card-header pt-9 pb-0">
          <h4>Arama Yap</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body pt-9 pb-0">
            <div className='row'>
              <div className='col-lg-6'>
                <label className='col-form-label fw-bold fs-6'>
                  <span  >Fakülte</span>
                </label>

                <div className='fv-row'>
                  <Select
                    value={selectedFaculty}
                    onChange={handleFacultyChange}
                    options={fList}
                    isSearchable={true}
                    placeholder="Fakülte Seçiniz"
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <label className='col-form-label fw-bold fs-6'>
                  <span >Bölüm</span>
                </label>

                <div className='fv-row'>
                  <Select
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    options={dList}
                    isSearchable={true}
                    placeholder="Bölüm Seçiniz"
                    isDisabled={bDisabled}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <label className='col-form-label fw-bold fs-6'>
                  <span >Öğrenci Durumları</span>
                </label>
                <Select
                  value={selectedStuStatus}
                  onChange={handleStuStatusChange}
                  options={ssList}
                  isSearchable={true}
                  isMulti={true}
                  placeholder="Öğrenci durumu seçiniz"
                />

              </div>

              <div className='col-md-6'>
                <label className='col-form-label fw-bold fs-6'>
                  <span >Kayıt Tipi</span>
                </label>

                <Select
                  value={selectedRegisterType}
                  onChange={handleRegisterTypeChange}
                  options={rtList}
                  isSearchable={true}
                  isMulti={true}
                  placeholder="kayıt tipini seçiniz"
                />
              </div>

              <div className='col-md-6'>
                <label className='col-form-label fw-bold fs-6'>
                  <span>Kayıt Tarihi Başlangıç</span>
                </label>
                <input
                  type='date'
                  className='form-control'
                  data-kt-search-element='input'
                  onChange={handleChange}
                  name="register_date_start"
                  value={formData.register_date_start}
                />

              </div>

              <div className='col-md-6'>
                <label className='col-form-label fw-bold fs-6'>
                  <span>Kayıt Tarihi Bitiş</span>
                </label>
                <input
                  type='date'
                  className='form-control'
                  data-kt-search-element='input'
                  onChange={handleChange}
                  name="register_date_finish"
                  value={formData.register_date_finish}
                />

              </div>
              <div className='card-footer d-flex justify-content-end mt-10' style={{ height: "43px" }}>
                <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
                  Ara
                </button>
              </div>

              <br />
              <br /><br /><br /><br />

              <br /><br />
            </div>

          </div>
        </form>
      </div>

      {tableisActive?<div className='card mb-5 mb-xl-10'>
      {listLoad?<Loading/>:''}
        <div className='card-header pt-9 pb-0'>
          <h4>Kesin Kayıtlar</h4>
        </div>
        <div className='card-body pt-9 pb-0'>
       
          {definitiverecordlist.length ?
            <>
              <button style={{ float: "left" }} className='btn btn-sm btn-primary' onClick={exportToExcel}>Export to Excel</button>

              <input style={{ float: "right" }}
                type="text"
                placeholder="Arama Yap"
                onChange={handleSearch}
              />
            </> : ''}
          <DataTable
            columns={columns}
            data={filteredData}
            noDataComponent={'Kayıt bulunamadı'}
            pagination // If you want to enable pagination
            keyField="ogrno"
          />
        </div>
      </div>:''}
    </>
  )
}

function DefinitiveRecords() {
  return (
    <SnackbarProvider maxSnack={3}>
      <DefinitiveRecordsSnack />
    </SnackbarProvider>
  );
}
export default DefinitiveRecords






