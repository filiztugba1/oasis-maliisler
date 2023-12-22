import React, { useEffect, useState } from 'react'
import { DebtCheckLists,DebtCheckListsRequest } from './models/_debtchecklist.model'
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import { FacultyList } from '../../services/models/_faculty';
import api from '../../services/services';
// import 'react-data-table-component/dist/data-table.css';
import { SnackbarProvider,  useSnackbar } from 'notistack';
import Loading from '../Loading';
const DebtCheckListSnack: React.FC = () => {
 
  const [yearList, setYear] = useState<Array<FacultyList>>([]);
  const [feetypeList, setFeetypeList] = useState<Array<FacultyList>>([]);
  const [listLoad, setlistLoad] = useState(false);
  const [tableisActive, settableisActive] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
      api.year().then((x)=>{
        setYear(x);
      }).catch(err => catchFunc(err))

      api.feeTypes().then((x)=>{
        setFeetypeList(x);
      }).catch(err => catchFunc(err))
    },[]
  );

 
  const [selectedYear, setselectedYear] = React.useState(null);
  const handleYear = (selected: any) => {
    setselectedYear(selected);
    formDoldur("year",selected.value);
  };

  const [selectedFeetypes, setselectedFeetypes] = React.useState(null);
  const handleFeetypes = (selected: any) => {
    setselectedFeetypes(selected);
    formDoldur("keep_feeid",selected.value);
  };

  const formDoldur = (key: any,value:any) => {
    setFormData(
      {
        keep_feeid: key==='keep_feeid'?value:formData.keep_feeid,
        semester: key==='semester'?value:formData.semester,
        year: key==='year'?value:formData.year,
      }
    );
  };

  const columns: TableColumn<typeof definitiverecordlist[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.stu_id, sortable: true },
    { name: 'Adı Soyadı', selector: (row) => row.name+' '+row.surname, sortable: true },
    { name: 'Sınıfı', selector: (row) => row.class, sortable: true },
    { name: 'Fakülte', selector: (row) => row.fak, sortable: true },
    { name: 'Bölüm', selector: (row) => row.dept, sortable: true },
    { name: 'GNO', selector: (row) => row.derece, sortable: true },
    { name: 'Borç Miktarı (USD)', selector: (row) => api.paymetFormat(row.debt_dolar) || '', sortable: true },
    { name: 'Borç Miktarı (TL)', selector: (row) => api.paymetFormat(row.debt_tl) ||'', sortable: true },
    { name: 'Ödenen (TL)', selector: (row) => api.paymetFormat(row.payment)||'', sortable: true },
    { name: 'Ödenen (USD)', selector: (row) => api.paymetFormat(row.payment_dolar)||'', sortable: true },
    { name: 'Kalan Bakiye', selector: (row) => '', sortable: true },
    { name: 'Cep Telefonu', selector: (row) => row.cell_phone_s, sortable: true },
  ];
  
  const [definitiverecordlist, setDefinitiverecordlist] = useState<Array<DebtCheckLists>>([]);

  const [formData, setFormData] = useState<DebtCheckListsRequest>(
    {
     keep_feeid:'',
     semester:'',
     year:''
    }
  );

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    formDoldur(name,value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    settableisActive(true);
    setlistLoad(true);
    api.debtCheckList(formData).then((x) => {
      setlistLoad(false);
      setDefinitiverecordlist(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err))
  };

  const [filteredData, setFilteredData] = useState(definitiverecordlist);
  const handleSearch = (e:any) => {
    const searchTerm = e.target.value;
    const filteredItems = definitiverecordlist
    .filter((item) =>
      (item.name+' '+item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.stu_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fak.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';
  
    const formattedData = filteredData.map((item) => ({
      'Öğrenci No': item.stu_id,
      'Adı Soyadı': item.name+' '+item.surname,
      'Sınıfı': item.class,
      'Fakülte': item.fak,
      'Bölüm': item.dept,
      'Borç Miktarı (USD)': api.paymetFormat(item.debt_dolar),
      'Borç Miktarı (TL)': api.paymetFormat(item.debt_tl),
      'Ödenen (TL)': api.paymetFormat(item.payment),
      'Kalan Bakiye': '',
      'Cep Telefonu': item.cell_phone_s,
    }));
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
  }
  return (
    <>

      <div className="card mb-5 mb-xl-10">
        <div className="card-header pt-9 pb-0">
          <h4>Arama Yap</h4>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="card-body pt-9 pb-0">
          <div className='row'>
           
            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Eğitim Yılı</span>
              </label>
              <Select
                value={selectedYear}
                onChange={handleYear}
                options={yearList}
                isSearchable={true}
                placeholder="Yıl Seçiniz"
              />
            </div>


            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>Dönem</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="semester"
                  value={formData.semester}
                >
                  <option value="1">Güz</option>
                  <option value="2">Bahar</option>
                  <option value="3">Yaz</option>
                </select>
              </div>
            </div>
    

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Ödeme Türü</span>
              </label>
              <Select
                value={selectedFeetypes}
                onChange={handleFeetypes}
                options={feetypeList}
                isSearchable={true}
                placeholder="Ücret Tipini Seçiniz"
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
          <h4>Borç Kontrol Listesi</h4>
        </div>
        <div className='card-body pt-9 pb-0'>
       {definitiverecordlist.length?
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
      </div>:''}
    </>
  )
}

function DebtCheckList() {
  return (
    <SnackbarProvider maxSnack={3}>
      <DebtCheckListSnack />
    </SnackbarProvider>
  );
}
export default DebtCheckList






