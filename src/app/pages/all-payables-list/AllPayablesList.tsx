import React, { useEffect, useState } from 'react'
import { AllPayablesListRequest,AllPayablesLists } from './models/_allpayableslist.model'
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import { FacultyList } from '../../services/models/_faculty';
import api from '../../services/services';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';
// import 'react-data-table-component/dist/data-table.css';

const AllPayablesListSnack: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);
  const [fList, setFList] = useState<Array<FacultyList>>([]);
  const [dList, setDList] = useState<Array<FacultyList>>([]);
  const [oList, setOList] = useState<Array<FacultyList>>([]);
  // const [ssList, setSsList] = useState<Array<FacultyList>>([]);
  // const [rtList, setRtList] = useState<Array<FacultyList>>([]);
  const [sssList, setSssList] = useState<Array<FacultyList>>([]);
  const [yearList, setYear] = useState<Array<FacultyList>>([]);
  const [feetypeList, setFeetypeList] = useState<Array<FacultyList>>([]);
  const [listLoad, setlistLoad] = useState(false);
  const [tableisActive, settableisActive] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if(isApi)
    {
      api.faculty().then((x)=>{
        setFList(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))


      // api.registerType().then((x)=>{
      //   setRtList(x);
      //   setIsApi(false);
      // }).catch(err => catchFunc(err))

      api.scholarshipStatus().then((x)=>{
        setSssList(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))
      api.year().then((x)=>{
        setYear(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))

      api.feeTypes().then((x)=>{
        setFeetypeList(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))
    }
  }
  );

  const [selectedFaculty, setSelectedFaculty] = React.useState(null);
  const handleFacultyChange = (selected: any) => {
    setSelectedFaculty(selected);
    formDoldur("f",JSON.stringify(selected));
    /// burası seçildiğinde bölüm bilgisi doldurulacak
    api.department({f:JSON.stringify(selected)}).then((x)=>{
      setDList(x);
    }).catch(err => catchFunc(err))
  };

  const [selectedDepartment, setSelectedDepartment] = React.useState(null);
  const handleDepartmentChange = (selected: any) => {
    setSelectedDepartment(selected);
    formDoldur("d",JSON.stringify(selected));
    api.option({f:formData.f,d:JSON.stringify(selected)}).then((x)=>{
      setOList(x);
    }).catch(err => catchFunc(err))
  };

  const [selectedOption, setSelectedOption] = React.useState(null);
  const handleOptionChange = (selected: any) => {
    setSelectedOption(selected);
    formDoldur("o",JSON.stringify(selected));
  };

  const [selectedScholarship, setSelectedScholarship] = React.useState(null);
  const handleScholarshipChange = (selected: any) => {
    setSelectedScholarship(selected);
    formDoldur("fee_status",JSON.stringify(selected));
  };

 
  const [selectedYear, setselectedYear] = React.useState(null);
  const handleYear = (selected: any) => {
    setselectedYear(selected);
    formDoldur("register_year",selected.value);
  };

  const [selectedFeetypes, setselectedFeetypes] = React.useState(null);
  const handleFeetypes = (selected: any) => {
    setselectedFeetypes(selected);
    formDoldur("fee_id",JSON.stringify(selected));
  };

  const formDoldur = (key: any,value:any) => {
    setFormData(
      {
        f: key==='f'?value:formData.f,
        d: key==='d'?value:formData.d,
        o: key==='o'?value:formData.o,
        year: key==='year'?value:formData.year,
        semester: key==='semester'?value:formData.semester,
        class: key==='class'?value:formData.class,
        status: key==='status'?value:formData.status,
        fee_status: key==='fee_status'?value:formData.fee_status,
        fee_id: key==='fee_id'?value:formData.fee_id,
        list_type: key==='list_type'?value:formData.list_type,
        register_year: key==='register_year'?value:formData.register_year,
        interest: key==='interest'?value:formData.interest,
        payables_date_start: key==='payables_date_start'?value:formData.payables_date_start,
        payables_date_finish: key==='payables_date_finish'?value:formData.payables_date_finish,
      }
    );
  };


  const columns: TableColumn<typeof definitiverecordlist[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.id, sortable: true },
    { name: 'Adı Soyadı', selector: (row) => row.name+' '+row.surname, sortable: true },
    { name: 'Sınıfı', selector: (row) => row.class, sortable: true },
    { name: 'Fakülte', selector: (row) => row.fakulte_name, sortable: true },
    { name: 'Bölüm', selector: (row) => row.name_tr, sortable: true },
    { name: 'Yılı', selector: (row) => row.year, sortable: true },
    { name: 'Dönemi', selector: (row) => +row.semester===1?'Güz':(+row.semester===2?'Bahar':'Yaz'), sortable: true },
    { name: 'Borç Tarihi', selector: (row) => row.create_date, sortable: true },
    { name: 'Borç Miktarı (TL)', selector: (row) =>  api.paymetFormat(row.p1), sortable: true },
    { name: 'Ödeme Miktarı TL', selector: (row) => api.paymetFormat(row.p3), sortable: true },
    { name: 'Bakiye', selector: (row) => api.paymetFormat((+row.p1-(+row.p3)-(+row.move))+''), sortable: true },
    { name: 'Borç Miktarı (USD)', selector: (row) => api.paymetFormat(row.p2), sortable: true },
    { name: 'Ödeme Miktarı USD.', selector: (row) => api.paymetFormat(row.p4), sortable: true },
    { name: 'Türü', selector: (row) => row.harc_tipi, sortable: true },
    { name: 'Burs', selector: (row) => (row.burstip!==null?row.burstip:'')+' '+(+row.fee_status===4?'Kesildi!':''), sortable: true },
    { name: 'Son Tarihçe', selector: (row) => row.tarihce, sortable: true },
    { name: 'Tarihçe Tarihi', selector: (row) => row.tarihce_date, sortable: true },
    { name: 'Kayıt Tipi', selector: (row) => row.register_type, sortable: true },
    { name: 'GNO', selector: (row) => row.derece, sortable: true },
  ];

  const [definitiverecordlist, setDefinitiverecordlist] = useState<Array<AllPayablesLists>>([]);

  const [formData, setFormData] = useState<AllPayablesListRequest>(
    {
      f:"",
      d:"",
      o:"",
      year:"",
      semester:"",
      class:"",
      status:"",
      fee_status:"",
      fee_id:"",
      list_type:"",
      register_year:"",
      interest:"",
      payables_date_start:"",
      payables_date_finish:"",
    }
  );

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    settableisActive(true);
    setlistLoad(true);
    api.allPaymentsList2(formData).then((x) => {
      setlistLoad(false);
      setDefinitiverecordlist(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err))
  };

  const [filteredData, setFilteredData] = useState(definitiverecordlist);
  const handleSearch = (e:any) => {
    // const searchTerm = e.target.value;
    const filteredItems = definitiverecordlist
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
  
    const formattedData = filteredData.map((item) => ({
      'Öğrenci No': item.id,
      'Adı Soyadı': item.name+' '+item.surname,
      'Sınıfı': item.class,
      'Fakülte': item.fakulte_name,
      'Bölüm': item.name_tr,
      'Yılı': item.year,
      'Dönemi': item.semester,
      'Borç Tarihi': item.create_date,
      'Borç Miktarı (TL)': api.paymetFormat(item.p1),
      'Ödeme Miktarı TL': api.paymetFormat(item.p3),
      'Bakiye': api.paymetFormat((+item.p1-(+item.p3)-(+item.move))+''),
      'Borç Miktarı (USD)': api.paymetFormat(item.p2),
      'Ödeme Miktarı USD.': api.paymetFormat(item.p4),
      
      'Türü': item.harc_tipi,
      'Burs': item.burstip+' '+(+item.fee_status===4?'Kesildi!':''),
      'Son Tarihçe': item.tarihce,
      'Tarihçe Tarihi': item.tarihce_date,
      'Kayıt Tipi': item.register_type,
      'GNO': item.derece,
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
    setIsApi(false);
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
            <div className='col-lg-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Fakülte</span>
              </label>

              <div className='fv-row'>
                <Select
                  value={selectedFaculty}
                  onChange={handleFacultyChange}
                  options={fList}
                  isSearchable={true}
                  placeholder="Fakülte Seçiniz"
                  isMulti={true}
                />
              </div>
            </div>

            <div className='col-md-4'>
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
                  isMulti={true}
                />
              </div>
            </div>

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Opsiyon</span>
              </label>

              <div className='fv-row'>
                <Select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  options={oList}
                  isSearchable={true}
                  placeholder="Opsiyon Seçiniz"
                  isMulti={true}
                />
              </div>
            </div>

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Yıl</span>
              </label>

              <Select
                value={selectedYear}
                onChange={handleYear}
                options={yearList}
                isSearchable={true}
                placeholder="Yıl Seçiniz"
              />
            </div>


            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Dönem</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="semester"
                  value={formData.semester}
                >
                  <option value="-1">Tümü</option>
                  {/* <option value="0">Yıllık</option> */}
                  <option value="1">1.Dönem</option>
                  <option value="2">2.Dönem</option>
                  <option value="3">3.Dönem</option>
                  {/* <option value="7">Tek Ders</option>
                  <option value="21">Azami Süre Güz Dönemi</option>
                  <option value="22">Azami Süre Bahar Dönemi</option> */}
                </select>
              </div>
            </div>
            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Sınıfı</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="class"
                  value={formData.class}
                >
                  <option value=''>Tümü</option>
                  <option value='0'>0</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                </select>
              </div>
            </div>

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Liste Tipi</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="list_type"
                  value={formData.list_type}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Sadece Borcu Olanlar</option>
                  <option value='2'>Sadece Ödeme Yapanlar</option>
                </select>
              </div>
            </div>
    

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>Öğrenci Durumu</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="status"
                  value={formData.status}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Okuyor Durumda Pasifler Dahil</option>
                  <option value='2'>Mezun veya Ayrılmış</option>
                  <option value='3'>Okuyor Durumda Pasifler Hariç</option>
                </select>
              </div>
            </div>

           
            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Burs Tipi</span>
              </label>

              <Select
                value={selectedScholarship}
                onChange={handleScholarshipChange}
                options={sssList}
                isSearchable={true}
                placeholder="Burs Tipini Seçiniz"
                isMulti={true}
              />
            </div>

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Ücret Tipleri</span>
              </label>
              <Select
                value={selectedFeetypes}
                onChange={handleFeetypes}
                options={feetypeList}
                isSearchable={true}
                placeholder="Ücret Tipini Seçiniz"
                isMulti={true}
              />
            </div>

          
          

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>Faizler</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="status"
                  value={formData.status}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Faiz Kayıtları Hariç</option>
                </select>
              </div>
            </div>
            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Başlangıç Tarihi</span>
              </label>
              <input
                type='date'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleChange}
                name="payables_date_start"
                value={formData.payables_date_start}
              />

            </div>

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Bitiş Tarihi</span>
              </label>
              <input
                type='date'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleChange}
                name="payables_date_finish"
                value={formData.payables_date_finish}
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
          <h4>Tüm Borçlar Listesi</h4>
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

function AllPayablesList() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AllPayablesListSnack />
    </SnackbarProvider>
  );
}
export default AllPayablesList






