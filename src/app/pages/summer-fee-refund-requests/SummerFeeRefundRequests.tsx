import React, { FC, KeyboardEvent, useEffect, useRef, useState, Component } from 'react'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import axios from "axios";
import {SummerFeeRefundRequests,SummerFeeRefundRequestsResponse} from './models/_summerfeerefund'
import './payments.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, readFile, utils } from 'xlsx';
import api from '../../services/services';
// import 'react-data-table-component/dist/data-table.css';

const SummerFeeRefundRequestList: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);

  useEffect(() => {
    if(isApi)
    {
      axios.post<SummerFeeRefundRequestsResponse>('http://api-oasis.localhost/maliisler/maliisler/summer-school-fee-refund-requests').then((res)=>{
              // setLoading(false);
              if(res.status===200)
              {
                setSummerFeeRefundRequests(res.data.data);
                setFilteredData(res.data.data);
                setIsApi(false);
              }
          }).catch(err=>{
          })  
    }
  }
  );



  const columns: TableColumn<typeof summerFeeRefundRequests[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.id, sortable: true },
    { name: 'Adı Soyadı', selector: (row) => row.name+' '+row.surname, sortable: true },
    { name: 'Fakülte', selector: (row) => row.faculty, sortable: true },
    { name: 'Bölüm', selector: (row) => row.department, sortable: true },
    { name: 'Kayıt Tipi', selector: (row) => row.kayit_tipi, sortable: true },
    { name: 'Burs/İndirim Tipi', selector: (row) => row.burs_tipi || '', sortable: true },
    { name: 'Burs/İndirim Durumu', selector: (row) => row.burs_durumu || '', sortable: true },
    { name: 'Sınıfı', selector: (row) => row.class, sortable: true },
    { name: 'Ödeme Tutarı', selector: (row) => api.paymetFormat(row.payments)||'', sortable: true },
    { name: 'IEÜ Kredisi', selector: (row) => row.ieu_credit || '', sortable: true },
    { name: 'ECTS Kredisi', selector: (row) => row.ects_credit || '', sortable: true },
    { name: 'IBAN', selector: (row) => row.IBAN, sortable: true },
    { name: 'Hesap Sahibinin Adı Soyadı	', selector: (row) => row.account_name, sortable: true },
    { name: 'Telefon', selector: (row) => row.phone, sortable: true },
   
  ];


  
  const [summerFeeRefundRequests, setSummerFeeRefundRequests] = useState<Array<SummerFeeRefundRequests>>([]);


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
        'Sıra No': x,
        'Öğrenci No': item.id,
        'Adı Soyadı': item.name+' '+item.surname,
        'Fakülte': item.faculty,
        'Bölüm': item.department,
        'Kayıt Tipi': item.class,
        'Burs/İndirim Tipi': item.burs_tipi,
        'Burs/İndirim Durumu': item.burs_durumu,
        'Sınıfı': item.class,
        'Ödeme Tutarı': api.paymetFormat(item.payments),
        'IEÜ Kredisi': item.ieu_credit,
        'ECTS Kredisi': item.ects_credit,
        'IBAN': item.IBAN,
        'Hesap Sahibinin Adı Soyadı': item.account_name,
        'Telefon': item.phone,
      })
    }
    );
    const ws = utils .json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  return (
    <>

      <div className='card mb-5 mb-xl-10'>
        <div className='card-header pt-9 pb-0'>
          <h4>Yaz Okulu Ücreti İade Talepleri</h4>
        </div>
        <div className='card-body pt-9 pb-0'>
       {summerFeeRefundRequests.length?
       <>
       <button style={{float: "left"}} className='btn btn-sm btn-primary' onClick={exportToExcel}>Export to Excel</button>
       
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
            keyField="ogrno"
          />
        </div>
      </div>
    </>
  )
}

export default SummerFeeRefundRequestList






