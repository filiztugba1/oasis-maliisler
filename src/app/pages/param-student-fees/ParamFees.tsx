import React, { FC, KeyboardEvent, useEffect, useRef, useState, Component } from 'react'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import axios from "axios";
import {ParamFeesx, ParamFeesResponse} from './models/_paramfees'
import './payments.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, readFile, utils } from 'xlsx';
import api from '../../services/services';
import * as XLSX from 'xlsx';
import { Button, Modal } from 'react-bootstrap';
import { FacultyList } from '../../services/models/_faculty';
import { right } from '@popperjs/core';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import Loading from '../Loading';
// import 'react-data-table-component/dist/data-table.css';

const ParamFeesSnack: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);
  const [yearList, setYear] = useState<Array<FacultyList>>([]);
  const { enqueueSnackbar } = useSnackbar();
  const handlePaymentClose = () => setShowPayment(false);
  const handlePaymentShow = () => setShowPayment(true);
  const [showPayment, setShowPayment] = useState(false);
  const [listLoad, setlistLoad] = useState(false);
  const [listUpdateLoad, setlistUpdateLoad] = useState(false);
  useEffect(() => {
    
          setlistLoad(true);
          api.paramFees().then((x) => {
            setlistLoad(false);
            setSummerFeeRefundRequests(x);
            setFilteredData(x);
          }).catch(err => catchFunc(err))

     api.year(1).then((x) => {
            setYear(x);
            setIsApi(false);
          }).catch(err => catchFunc(err))
    
    },[]);

  const [selectedYear, setSelectedYear] = React.useState<null | FacultyList>(null);
  const handleRegisterYear = (selected: any) => {
    setSelectedYear(selected);
  };

  const columns: TableColumn<typeof summerFeeRefundRequests[0]>[] = [
    {
      name: 'İşlem', selector: (row) => '', cell: (row) => <div>
        <span><button className='btn  btn-warning btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => updateShow(row)}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => deleteShow(row)}><i className='fa fa-trash'></i></button></span>
      </div> ,
      sortable: true
    },
    { name: 'Fakülte', selector: (row) => row.fak_name, sortable: true },
    { name: 'Bölüm', selector: (row) => row.dep_name, sortable: true },
    { name: 'f', selector: (row) => row.f, sortable: true },
    { name: 'd', selector: (row) => row.d, sortable: true },
    { name: 'fdo', selector: (row) => row.fdo, sortable: true },
    { name: '2011 Akademik Yılı ve Öncesi', selector: (row) => row.fee || '', sortable: true },
    { name: '2012-2013-2014 Yılı', selector: (row) => api.paymetFormat(row.fee2) || '', sortable: true },
    { name: '2015-2016 Yılı', selector: (row) => api.paymetFormat(row.fee3) || '', sortable: true },
    { name: '2017-2018 Yılı', selector: (row) => api.paymetFormat(row.fee4)|| '', sortable: true },
    { name: '2019 Yılı', selector: (row) => api.paymetFormat(row.fee5) || '', sortable: true },
    { name: '2020-2021 Yılı', selector: (row) => api.paymetFormat(row.fee6) || '', sortable: true },
    { name: '2022 Yılı', selector: (row) => api.paymetFormat(row.fee7) || '', sortable: true },
    { name: '2023 Yılı', selector: (row) => api.paymetFormat(row.fee8) || '', sortable: true },
    { name: 'Hazırlık 2021 Yılı ve Öncesi', selector: (row) => api.paymetFormat(row.fee2) || '', sortable: true },
    { name: 'Hazırlık 2022 Yılı', selector: (row) => api.paymetFormat(row.fee_prep2) || '', sortable: true },
    { name: 'Hazırlık 2023 Yılı', selector: (row) => api.paymetFormat(row.fee_prep3) || '', sortable: true },
  ];


  const columns2: TableColumn<typeof summerFeeRefundRequests[0]>[] = [
   

    { name: 'Fakülte', selector: (row) =>Object.values(row)[Object.keys(row).findIndex(key => key==='Fakülte')], sortable: true },
    { name: 'Bölüm', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='Bölüm')], sortable: true },
    { name: 'f', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='f')], sortable: true },
    { name: 'd', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='d')], sortable: true },
    { name: 'fdo', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='fdo')], sortable: true },
    { name: '2011 Akademik Yılı ve Öncesi', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='2016 Akademik Yılı ve Öncesi')] || '', sortable: true },
    { name: '2012-2013-2014 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2017 Yılı')]) || '', sortable: true },
    { name: '2015-2016 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2018 Yılı')]) || '', sortable: true },
    { name: '2017-2018 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2019 Yılı')])|| '', sortable: true },
    { name: '2019 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2020 Yılı')]) || '', sortable: true },
    { name: '2020-2021 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2021 Yılı')]) || '', sortable: true },
    { name: '2022 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2022 Yılı')]) || '', sortable: true },
    { name: '2023 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2023 Yılı')]) || '', sortable: true },
    { name: 'Hazırlık 2021 Yılı ve Öncesi', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Hazırlık 2021 Yılı ve Öncesi')]) || '', sortable: true },
    { name: 'Hazırlık 2022 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Hazırlık 2022 Yılı')]) || '', sortable: true },
    { name: 'Hazırlık 2023 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Hazırlık 2023 Yılı')]) || '', sortable: true },
  ];
  const [showFees, setShowFees] = useState(false);

  const handleFeesClose = () => setShowFees(false);
  const handleFeesShow = () => setShowFees(true);


  const [deleteshowFees, setDeleteShowFees] = useState(false);

  const handleDeleteFeesClose = () => setDeleteShowFees(false);
  const handleDeleteFeesShow = () => setDeleteShowFees(true);

  const updateShow = (row: ParamFeesx) => {
    // setSelectedYear(yearList.find((x) => +x.value === +row.Year) ?? null);
    // setSelectedScholarship(sssList.find((x) => +x.value === +row.sid) ?? null);
    // setFormDataScolar({
    //   year: row.Year,
    //   semester: row.Semester,
    //   scholarship_type: row.sid,
    //   scholarship_status: row.stat_id,
    //   explanation: row.Explanation,
    //   std_state_date: row.stat_date_,
    //   update_date: row.update_date_,
    //   actionType: 'update'
    // });
    handleFeesShow();
  }

  const deleteShow = (row: ParamFeesx) => {
    // setSelectedYear(yearList.find((x) => +x.value === +row.Year) ?? null);
    // setSelectedScholarship(sssList.find((x) => +x.value === +row.sid) ?? null);
    // setFormDataScolar({
    //   year: row.Year,
    //   semester: row.Semester,
    //   scholarship_type: row.sid,
    //   scholarship_status: row.stat_id,
    //   explanation: row.Explanation,
    //   std_state_date: row.stat_date_,
    //   update_date: row.update_date_,
    //   actionType: 'delete'
    // });
    handleDeleteFeesShow();
  }
  
  const [summerFeeRefundRequests, setSummerFeeRefundRequests] = useState<Array<ParamFeesx>>([]);


  const [filteredData, setFilteredData] = useState(summerFeeRefundRequests);
  const handleSearch = (e:any) => {
    const searchTerm = e.target.value;
    const filteredItems = summerFeeRefundRequests
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
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';
    let x=0;
    const formattedData = filteredData.map((item) =>
    {
      x++;
      return (
        {
        'Fakülte': item.fak_name,
        'Bölüm': item.dep_name,
        'f': item.f,
        'd': item.d,
        'fdo': item.fdo,
        '2011 Akademik Yılı ve Öncesi': api.paymetFormat(item.fee),
        '2012-2013-2014 Yılı': api.paymetFormat(item.fee2),
        '2015-2016 Yılı': api.paymetFormat(item.fee3),
        '2017-2018 Yılı':api.paymetFormat(item.fee4),
        '2019 Yılı': api.paymetFormat(item.fee5),
        '2020-2021 Yılı': api.paymetFormat(item.fee6),
        '2022 Yılı': api.paymetFormat(item.fee7),
        '2023 Yılı': api.paymetFormat(item.fee8),
        'Hazırlık 2021 Yılı ve Öncesi': api.paymetFormat(item.fee_prep),
        'Hazırlık 2022 Yılı': api.paymetFormat(item.fee_prep2),
        'Hazırlık 2023 Yılı': api.paymetFormat(item.fee_prep3),

      })
    }
    );
    const ws = utils .json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const [jsonData, setJsonData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];

      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event: any) => {
          const workbook = XLSX.read(event.target.result, { type: 'binary' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          setJsonData(data);
      };
      reader.readAsBinaryString(file);
  };

  const handleYukleModal=()=>{
    
    if(selectedYear===null || jsonData.length===0)
    {
      enqueueSnackbar('Dosya ve yıl seçmeniz gerekmektdir', { variant:'warning',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      return 0;
    }
    handlePaymentShow();
  }

  const handleAktar = (e: any) => {
    e.preventDefault();
    let formData={
      jsonData:JSON.stringify(jsonData),
      year:selectedYear?.value
    }
    setlistUpdateLoad(true);
    api.paramFeesCu(formData).then((x) => {
      setlistUpdateLoad(false);
      if(x.status!==200)
      {
        enqueueSnackbar(x.message, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      enqueueSnackbar(x.message, { variant:'success',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
    }).catch(err => catchFunc(err)) 
  }

  
 
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

  return (
    <>
<div className='card mb-5 mb-xl-10'>
        <div className='card-header pt-9 pb-9'>
          <h4>Excel ile toplu parametre ekleme</h4>
          
          <div>
          <button className="btn btn-sm btn-success" onClick={handleYukleModal} style={{float: 'right'}}>Yüklenecek verileri gör</button>
          <div style={{float: 'right',marginRight: "4px",marginTop: "-2px"}}>
          <Select 
                      value={selectedYear}
                      onChange={handleRegisterYear}
                      options={yearList}
                      isSearchable={true}
                      placeholder="yılı seçiniz"
                    />
            </div>
          <input type="file" onChange={handleFileUpload} style={{float: 'right'}} />
          </div>
          
            {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
        </div>
</div>
      <div className='card mb-5 mb-xl-10'>
      {listLoad?<Loading/>:''}
      <div className='card-header pt-9 pb-5'>
          <h4>Yeni öğrencilere ait parametre tablosu</h4>
          
          <button className="btn btn-sm btn-success" onClick={handleYukleModal} style={{float: 'right'}}>Parametre Ekle</button>
          
        </div>
        <div className='card-body pt-9 pb-0'>
       {summerFeeRefundRequests.length?
       <>
       <button  style={{float: "left"}} className='btn btn-sm btn-primary' onClick={exportToExcel}>Export to Excel</button>
       
       <input style={{float: "right"}}
            type="text"
            placeholder="Arama Yap"
            onChange={handleSearch}
          />
          </>:''} 
          <DataTable
            columns={columns}
            data={filteredData}
            noDataComponent={'Kayıt bulunamadı'}
            pagination // If you want to enable pagination
            keyField="fdo"
          />
        </div>
      </div>
      <Modal show={showPayment} onHide={handlePaymentClose} size='xl'>
      {listUpdateLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>Yüklemiş olduğunuz veriler </Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
        <p style={{color:'red',textAlign:"right",float:'right'}}>Seçilen Yıl: {selectedYear?.value}</p>
        <DataTable
            columns={columns2}
            data={jsonData}
            noDataComponent={'Kayıt bulunamadı'}
            pagination // If you want to enable pagination
            keyField="fdo"
          />
          <form onSubmit={handleAktar}>
        <button type='submit' className="btn btn-sm btn-success"style={{float: 'right'}}>Verileri Aktar</button>
      
        </form>
        </Modal.Body>
        
    
      </Modal>

    </>
  )
}

function ParamFees() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ParamFeesSnack />
    </SnackbarProvider>
  );
}

export default ParamFees






