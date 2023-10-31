import React, { FC, KeyboardEvent, useEffect, useRef, useState, Component } from 'react'
import {KomisyonluListesi,KomisyonluResponse} from './models/_yaz-okulu-komisyonlu.model'
import './payments.css';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import api from '../../services/services';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';
// import 'react-data-table-component/dist/data-table.css';

const KomisyonluListSnack: React.FC = () => {
  const userItem = localStorage.getItem('user');
  const user = userItem ? JSON.parse(userItem) : null;
  const [isApi, setIsApi] = useState(true);
  const [listLoad, setlistLoad] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setlistLoad(true);
    api.komisyonluOdeyenler().then((x) => {
      setlistLoad(false);
      setKomisyonluListesi(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err))
  },[]
  );

  const columns: TableColumn<typeof KomisyonluListesi[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.stu_id, sortable: true },
    { name: 'Adı Soyadı', selector: (row) => row.name+' '+row.surname, sortable: true },
    { name: 'Fakülte', selector: (row) => row.fakulte, sortable: true },
    { name: 'Bölüm', selector: (row) => row.bolum, sortable: true },
    { name: 'Sınıf', selector: (row) => row.sinif, sortable: true },
    { name: 'Öğrenci Durumu', selector: (row) => row.ogr_durum, sortable: true },
    { name: 'Öğrenci Kayıt Tipi', selector: (row) => row.ogr_kayit_tipi, sortable: true },
    { name: 'Burs Tipi', selector: (row) => row.burs_tipi, sortable: true },
    { name: 'Burs Durumu', selector: (row) => row.burs_durumu, sortable: true },
    { name: 'Harç Tipi', selector: (row) => row.harc_tipi, sortable: true },
    { name: 'Aldığı İEU Kredisi', selector: (row) => row.aldigi_ieu_kredisi || '', sortable: true },
    { name: 'Tahsilat Ödeme', selector: (row) => api.paymetFormat(row.tahsilat_odeme) || '', sortable: true },
    { name: 'Oasis Ödeme', selector: (row) => api.paymetFormat(row.oasis_odeme) || '', sortable: true },
    { name: 'İade', selector: (row) => api.paymetFormat(row.iade) || '', sortable: true },
    { name: 'Faturalanacak Tutar', selector: (row) => api.paymetFormat(row.faturalanacak_tutar) || '', sortable: true },
    { name: 'Komisyon', selector: (row) => api.paymetFormat(row.komisyon) || '', sortable: true },

  ];

  const [KomisyonluListesi, setKomisyonluListesi] = useState<Array<KomisyonluListesi>>([]);


  const [filteredData, setFilteredData] = useState(KomisyonluListesi);
  const handleSearch = (e:any) => {
    const searchTerm = e.target.value;
    const filteredItems = KomisyonluListesi
    .filter((item) =>
      (item.name+' '+item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.stu_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bolum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fakulte.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ogr_durum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.burs_tipi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.burs_durumu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.harc_tipi.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = user.academicYear+' Yılı Yaz Okulu Komisyonlu Ödeyen Listesi';
    let x=0;
    const formattedData = filteredData.map((item) =>
    {
      x++;
      return (
        {
        'Öğrenci No': x,
        'Adı Soyadı': item.name+' '+item.surname,
        'Fakülte': item.fakulte,
        'Bölüm': item.bolum,
        'Sınıf': item.sinif,
        'Öğrenci Durumu': item.ogr_durum,
        'Öğrenci Kayıt Tipi': item.ogr_kayit_tipi,
        'Burs Tipi': item.burs_tipi,
        'Burs Durumu': item.burs_durumu,
        'Harç Tipi': item.harc_tipi,
        'Aldığı İEU Kredisi': api.paymetFormat(item.aldigi_ieu_kredisi),
        'Tahsilat Ödeme': api.paymetFormat(item.tahsilat_odeme),
        'Oasis Ödeme': api.paymetFormat(item.oasis_odeme),
        'İade': api.paymetFormat(item.iade),
        'Faturalanacak Tutar': item.faturalanacak_tutar,
        'Komisyon': item.komisyon,
      })
    }
    );

    const ws = utils .json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
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
  return (
    <>

      <div className='card mb-5 mb-xl-10'>
      {listLoad?<Loading/>:''}
        <div className='card-header pt-9 pb-0'>
          <h4>{user.academicYear} Yılı Yaz Okulu Komisyonlu Ödeyen Listesi</h4>
        </div>
        <div className='card-body pt-9 pb-0'>
       {KomisyonluListesi.length?
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

function KomisyonluResponseList() {
  return (
    <SnackbarProvider maxSnack={3}>
      <KomisyonluListSnack />
    </SnackbarProvider>
  );
}
export default KomisyonluResponseList





