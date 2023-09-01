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
// import 'react-data-table-component/dist/data-table.css';

const ParamFeesSnack: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);
  const [yearList, setYear] = useState<Array<FacultyList>>([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if(isApi)
    {
      axios.post<ParamFeesResponse>('http://api-oasis.localhost/maliisler/maliisler/param-fees').then((res)=>{
              // setLoading(false);
              if(res.status===200)
              {
                setSummerFeeRefundRequests(res.data.data);
                setFilteredData(res.data.data);
                setIsApi(false);
              }
          }).catch(err=>{
              if (err.response && err.response.data && err.response.data.message) {
                   enqueueSnackbar(err.response.data.message, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
              }
          })  

     api.year(1).then((x) => {
            setYear(x);
            setIsApi(false);
          }).catch(err=>{
            if (err.response && err.response.data && err.response.data.message) {
                 enqueueSnackbar(err.response.data.message, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
            }
        }) 
    
    }
  }
  );

  const [selectedYear, setSelectedYear] = React.useState<null | FacultyList>(null);
  const handleRegisterYear = (selected: any) => {
    setSelectedYear(selected);
  };

  const columns: TableColumn<typeof summerFeeRefundRequests[0]>[] = [
    { name: 'Fakülte', selector: (row) => row.fak_name, sortable: true },
    { name: 'Bölüm', selector: (row) => row.dep_name, sortable: true },
    { name: 'f', selector: (row) => row.f, sortable: true },
    { name: 'd', selector: (row) => row.d, sortable: true },
    { name: 'fdo', selector: (row) => row.fdo, sortable: true },
    { name: '2016 Akademik Yılı ve Öncesi', selector: (row) => row.fee || '', sortable: true },
    { name: '2017 Yılı', selector: (row) => api.paymetFormat(row.fee2) || '', sortable: true },
    { name: '2018 Yılı', selector: (row) => api.paymetFormat(row.fee3) || '', sortable: true },
    { name: '2019 Yılı', selector: (row) => api.paymetFormat(row.fee4)|| '', sortable: true },
    { name: '2020 Yılı', selector: (row) => api.paymetFormat(row.fee5) || '', sortable: true },
    { name: '2021 Yılı', selector: (row) => api.paymetFormat(row.fee6) || '', sortable: true },
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
    { name: '2016 Akademik Yılı ve Öncesi', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='2016 Akademik Yılı ve Öncesi')] || '', sortable: true },
    { name: '2017 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2017 Yılı')]) || '', sortable: true },
    { name: '2018 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2018 Yılı')]) || '', sortable: true },
    { name: '2019 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2019 Yılı')])|| '', sortable: true },
    { name: '2020 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2020 Yılı')]) || '', sortable: true },
    { name: '2021 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2021 Yılı')]) || '', sortable: true },
    { name: '2022 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2022 Yılı')]) || '', sortable: true },
    { name: '2023 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='2023 Yılı')]) || '', sortable: true },
    { name: 'Hazırlık 2021 Yılı ve Öncesi', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Hazırlık 2021 Yılı ve Öncesi')]) || '', sortable: true },
    { name: 'Hazırlık 2022 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Hazırlık 2022 Yılı')]) || '', sortable: true },
    { name: 'Hazırlık 2023 Yılı', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Hazırlık 2023 Yılı')]) || '', sortable: true },
  ];


  
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
        '2016 Akademik Yılı ve Öncesi': api.paymetFormat(item.fee),
        '2017 Yılı': api.paymetFormat(item.fee2),
        '2018 Yılı': api.paymetFormat(item.fee3),
        '2019 Yılı':api.paymetFormat(item.fee4),
        '2020 Yılı': api.paymetFormat(item.fee5),
        '2021 Yılı': api.paymetFormat(item.fee6),
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
    axios.post<ParamFeesResponse>('http://api-oasis.localhost/maliisler/maliisler/param-fees-cu',formData).then((res)=>{
      // setLoading(false);
        // if(res.status===200)
        // {
        //   setSummerFeeRefundRequests(res.data.data);
        //   setFilteredData(res.data.data);
        //   setIsApi(false);
        // }
        console.log(res);
      }).catch(err=>{
          if (err.response && err.response.data && err.response.data.message) {
              enqueueSnackbar(err.response.data.message, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
          }
      }) 
  }

  
  const handlePaymentClose = () => setShowPayment(false);
  const handlePaymentShow = () => setShowPayment(true);
  const [showPayment, setShowPayment] = useState(false);
  return (
    <>

      <div className='card mb-5 mb-xl-10'>
        <div className='card-header pt-9 pb-0'>
          <h4>Yeni öğrencilere ait parametre tablosu</h4>
          
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






