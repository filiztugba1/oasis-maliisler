import React, { useEffect,useState} from 'react'
import { FeePaymentList,FeePaymentListRequest } from './models/_feepaymentslist.model'
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

const FeePaymentsListSnack: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);
  const [fList, setFList] = useState<Array<FacultyList>>([]);
  const [dList, setDList] = useState<Array<FacultyList>>([]);
  const [oList, setOList] = useState<Array<FacultyList>>([]);
  const [banks, setBanks] = useState<Array<FacultyList>>([]);
  const [feetypes, setFeetypes] = useState<Array<FacultyList>>([]);
  const [yearList, setYear] = useState<Array<FacultyList>>([]);
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

      api.banks().then((x)=>{
        setBanks(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))

      api.feeTypes().then((x)=>{
        setFeetypes(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))
      api.year().then((x)=>{
        setYear(x);
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
    })
  };

  const [selectedDepartment, setSelectedDepartment] = React.useState(null);
  const handleDepartmentChange = (selected: any) => {
    setSelectedDepartment(selected);
    formDoldur("d",JSON.stringify(selected));
    api.option({d:JSON.stringify(selected)}).then((x)=>{
      setOList(x);
    })
  };

  const [selectedOption, setSelectedOption] = React.useState(null);
  const handleOptionChange = (selected: any) => {
    setSelectedOption(selected);
    formDoldur("o",JSON.stringify(selected));
  };

  const [selectedBanks, setSelectedBanks] = React.useState(null);
  const handleBanksChange = (selected: any) => {
    setSelectedBanks(selected);
    formDoldur("banka",JSON.stringify(selected));
  };

  const [selectedFeeTypes, setSelectedFeeTypes] = React.useState(null);
  const handleFeeTypesChange = (selected: any) => {
    setSelectedFeeTypes(selected);
    formDoldur("fee_type",JSON.stringify(selected));
  };



 
  const [selectedYear, setSelectedYear] = React.useState(null);
  const handleYear = (selected: any) => {
    setSelectedYear(selected);
    formDoldur("year",selected.value);
  };

  const formDoldur = (key: any,value:any) => {
    setFormData(
      {
        f: key==='f'?value:formData.f,
        d: key==='d'?value:formData.d,
        o: key==='o'?value:formData.o,
        year: key==='year'?value:formData.year,
        semester: key==='semester'?value:formData.semester,
        banka: key==='banka'?value:formData.banka,
        fee_type: key==='fee_type'?value:formData.fee_type,
        payment_date_start: key==='payment_date_start'?value:formData.payment_date_start,
        payment_date_finish: key==='payment_date_finish'?value:formData.payment_date_finish,
      }
    );
  };


  const columns: TableColumn<typeof numberofstudentscholarshiplist[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.id, sortable: true },
    { name: 'Adı Soyadı', selector: (row) => row.name+' '+row.surname, sortable: true },
    { name: 'Durumu', selector: (row) => row.durumu, sortable: true },
    { name: 'Fakülte', selector: (row) => row.fakulte_name, sortable: true },
    { name: 'Bölüm', selector: (row) => row.name_tr, sortable: true },
    { name: 'GNO', selector: (row) => row.derece, sortable: true },
    { name: 'Ödeme Tarihi', selector: (row) => row.payment_date, sortable: true },
    { name: 'Miktarı TL.', selector: (row) => api.paymetFormat(row.payment), sortable: true },
   
    { name: 'Miktarı USD.', selector: (row) => api.paymetFormat(row.payment_dolar), sortable: true },
    { name: 'Banka', selector: (row) => row.accounts, sortable: true },
    { name: 'Kayıt Yılı', selector: (row) => row.register_year, sortable: true },
    { name: 'Kayıt Tipi', selector: (row) => row.register_type, sortable: true },
  ];


  
  const [numberofstudentscholarshiplist, setNumberofstudentscholarshiplist] = useState<Array<FeePaymentList>>([]);

  const [formData, setFormData] = useState<FeePaymentListRequest>(
    {
      f: "",
      d: "",
      o: "",
      year: "",
      semester: "",
      banka: "",
      fee_type: "",
      payment_date_start: "",
      payment_date_finish: "",
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
    api.allPaymentsList(formData).then((x) => {
      setlistLoad(false);
      setNumberofstudentscholarshiplist(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err))
  };

  const [filteredData, setFilteredData] = useState(numberofstudentscholarshiplist);
  const handleSearch = (e:any) => {
    const searchTerm = e.target.value;
    const filteredItems = numberofstudentscholarshiplist
    .filter((item) =>
      (item.name+' '+item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fakulte_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.accounts.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.register_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
        'Durumu': item.durumu,
        'Fakülte': item.fakulte_name,
        'Bölüm': item.name_tr,
        'GNO': item.derece,
        'Ödeme Tarihi': item.payment_date,
        'Miktarı TL.': api.paymetFormat(item.payment),
        'Miktarı USD.': api.paymetFormat(item.payment_dolar),
        'Banka': item.accounts,
        'Kayıt Yılı': item.register_year,
        'Kayıt Tipi': item.register_type,
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

      <div className="card mb-5 mb-xl-10">
        <div className="card-header pt-9 pb-0">
          <h4>Arama Yap</h4>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="card-body pt-9 pb-0">
          <div className='row'>
            <div className='col-lg-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span  >Fakülte</span>
              </label>

              <div className='fv-row'>
                <Select
                  value={selectedFaculty}
                  onChange={handleFacultyChange}
                  options={fList}
                  isSearchable={true}
                  isMulti={true}
                  placeholder="Fakülte Seçiniz"
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
                  isMulti={true}
                  placeholder="Bölüm Seçiniz"
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
                  isMulti={true}
                  placeholder="Opsiyon Seçiniz"
                />
              </div>
            </div>

            

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Yıl</span>
              </label>

              <Select
                value={selectedYear}
                onChange={handleYear}
                options={yearList}
                isSearchable={true}
                placeholder="Yıl seçiniz"
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
                   <option value="-1">Tümü</option>
                  {/* <option value="0">Yıllık</option> */}
                  <option value="1">1.Dönem</option>
                  <option value="2">2.Dönem</option>
                  <option  value="3">3.Dönem</option>
                  {/* <option value="7">Tek Ders</option>
                  <option value="21">Azami Süre Güz Dönemi</option>
                  <option value="22">Azami Süre Bahar Dönemi</option> */}
                </select>
              </div>
            </div>

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Bankalar</span>
              </label>

              <Select
                value={selectedBanks}
                onChange={handleBanksChange}
                options={banks}
                isSearchable={true}
                isMulti={true}
                placeholder="Banka seçiniz"
              />
            </div>

            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Ücret Tipleri</span>
              </label>

              <Select
                value={selectedFeeTypes}
                onChange={handleFeeTypesChange}
                options={feetypes}
                isSearchable={true}
                isMulti={true}
                placeholder="Ücret Tipi seçiniz"
              />
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
                name="payment_date_start"
                value={formData.payment_date_start}
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
                name="payment_date_finish"
                value={formData.payment_date_finish}
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
          <h4>Tüm Ödemeler Listesi</h4>
        </div>
        <div className='card-body pt-9 pb-0'>
       {numberofstudentscholarshiplist.length?
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

function FeePaymentsList() {
  return (
    <SnackbarProvider maxSnack={3}>
      <FeePaymentsListSnack />
    </SnackbarProvider>
  );
}
export default FeePaymentsList






