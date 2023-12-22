import React, {  useEffect, useState } from 'react'
import {MahsupListesi} from './models/_mahsup.model'
import './payments.css';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import api from '../../services/services';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';
// import 'react-data-table-component/dist/data-table.css';

const MahsupListSnack: React.FC = () => {
  const userItem = localStorage.getItem('user');
  const user = userItem ? JSON.parse(userItem) : null;
  // const [isApi, setIsApi] = useState(true);
  const [listLoad, setlistLoad] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setlistLoad(true);
    api.mahsupResponse().then((x) => {
      setlistLoad(false);
      setMahsupListesi(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err))
  },[]
  );

  const columns: TableColumn<typeof MahsupListesi[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.id, sortable: true },
    { name: 'Adı Soyadı', selector: (row) => row.name+' '+row.surname, sortable: true },
    { name: 'Fakülte', selector: (row) => row.fakulte, sortable: true },
    { name: 'Bölüm', selector: (row) => row.bolum, sortable: true },
    { name: 'Sınıf', selector: (row) => row.class, sortable: true },
    { name: 'GNO', selector: (row) => row.derece || '', sortable: true },
    { name: 'TL Güz Borcu', selector: (row) => api.paymetFormat(row.tl_guz_borcu) || '', sortable: true },
    { name: 'Dolar Güz Borcu', selector: (row) => api.paymetFormat(row.dolar_guz_borcu) || '', sortable: true },
    { name: 'TL Bahar Borcu', selector: (row) => api.paymetFormat(row.tl_bahar_borcu) || '', sortable: true },
    { name: 'Dolar Bahar Borcu', selector: (row) => api.paymetFormat(row.dolar_bahar_borcu) || '', sortable: true },
    { name: 'Mahsup İşlenilen Dönem', selector: (row) => row.mahsup_islenilen_donem, sortable: true },
  ];

  const [MahsupListesi, setMahsupListesi] = useState<Array<MahsupListesi>>([]);


  const [filteredData, setFilteredData] = useState(MahsupListesi);
  const handleSearch = (e:any) => {
    const searchTerm = e.target.value;
    const filteredItems = MahsupListesi
    .filter((item) =>
      (item.name+' '+item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bolum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fakulte.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mahsup_islenilen_donem.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = user.academicYear+' Yılı Mahsup Listesi';
    let x=0;
    const formattedData = filteredData.map((item) =>
    {
      x++;
      return (
        {
        'Sıra No': x,
        'Öğrenci No': item.id,
        'Adı Soyadı': item.name+' '+item.surname,
        'Fakülte': item.fakulte,
        'Bölüm': item.bolum,
        'Sınıf': item.class,
        'GNO': item.derece,
        'TL Güz Borcu': api.paymetFormat(item.tl_guz_borcu),
        'Dolar Güz Borcu': api.paymetFormat(item.dolar_guz_borcu),
        'TL Bahar Borcu': api.paymetFormat(item.tl_bahar_borcu),
        'Dolar Bahar Borcu': api.paymetFormat(item.dolar_bahar_borcu),
        'Mahsup İşlenilen Dönem': item.mahsup_islenilen_donem,
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
    // setIsApi(false);
  }
  return (
    <>

      <div className='card mb-5 mb-xl-10'>
      {listLoad?<Loading/>:''}
        <div className='card-header pt-9 pb-0'>
          <h4>{user.academicYear} Yılı Mahsup Listesi</h4>
        </div>
        <div className='card-body pt-9 pb-0'>
       {MahsupListesi.length?
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

function MahsupResponseList() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MahsupListSnack />
    </SnackbarProvider>
  );
}
export default MahsupResponseList





