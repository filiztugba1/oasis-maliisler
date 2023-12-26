import React, {  useEffect, useState } from 'react'
import { StudentScholarshipNumbers,StudentScholarshipNumbersRequest } from './models/_studentscholarships'
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import { FacultyList } from '../../services/models/_faculty';
import api from '../../services/services';
import { SnackbarProvider,useSnackbar } from 'notistack';
import Loading from '../Loading';
// import 'react-data-table-component/dist/data-table.css';

const NumberOfStudentScholarshipsSnack: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);
  const [fList, setFList] = useState<Array<FacultyList>>([]);
  const [dList, setDList] = useState<Array<FacultyList>>([]);
  const [oList, setOList] = useState<Array<FacultyList>>([]);
  const [rtList, setRtList] = useState<Array<FacultyList>>([]);
  const [sssList, setSssList] = useState<Array<FacultyList>>([]);
  const [yearList, setYear] = useState<Array<FacultyList>>([]);
  const [listLoad, setlistLoad] = useState(false);
  const [tableisActive, settableisActive] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


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
    api.option({d:JSON.stringify(selected)}).then((x)=>{
      setOList(x);
    }).catch(err => catchFunc(err))
  };

  const [selectedOption, setSelectedOption] = React.useState(null);
  const handleOptionChange = (selected: any) => {
    setSelectedOption(selected);
    formDoldur("o",JSON.stringify(selected));
  };

  const [selectedRegisterType, setSelectedRegisterType] = React.useState(null);
  const handleRegisterTypeChange = (selected: any) => {
    setSelectedRegisterType(selected);
    formDoldur("register_type",JSON.stringify(selected));

  };

  const [selectedScholarship, setSelectedScholarship] = React.useState(null);
  const handleScholarshipChange = (selected: any) => {
    setSelectedScholarship(selected);
    formDoldur("credit",JSON.stringify(selected));
  };

 
  const [selectedRegisterYear, setSelectedRegisterYear] = React.useState(null);
  const handleRegisterYear = (selected: any) => {
    setSelectedRegisterYear(selected);
    formDoldur("register_year",selected.value);
  };

  const formDoldur = (key: any,value:any) => {
    setFormData(
      {
        f: key==='f'?value:formData.f,
        d: key==='d'?value:formData.d,
        o: key==='o'?value:formData.o,
        class: key==='class'?value:formData.class,
        class_type: key==='class_type'?value:formData.class_type,
        register_year: key==='register_year'?value:formData.register_year,
        register_type: key==='register_type'?value:formData.register_type,
        status: key==='status'?value:formData.status,
        fee_status: key==='fee_status'?value:formData.fee_status,
        credit: key==='credit'?value:formData.credit,
        scholarshipType: key==='scholarshipType'?value:formData.scholarshipType
      }
    );
  };

  const columns: TableColumn<typeof numberofstudentscholarshiplist[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.id, sortable: true },
    { name: 'Adı Soyadı', selector: (row) => row.ad_soyad, sortable: true },
    { name: 'Fakülte', selector: (row) => row.fak, sortable: true },
    { name: 'Bölüm', selector: (row) => row.dep, sortable: true },
    { name: 'Opsiyon', selector: (row) => row.opt, sortable: true },
    { name: 'Sınıfı', selector: (row) => row.class, sortable: true },
    { name: 'Kayıt Yılı', selector: (row) => row.register_year, sortable: true },
    { name: 'Durumu', selector: (row) => row.durumu, sortable: true },
    { name: 'Lisansüstü Sınıf Bilgisi', selector: (row) => row.lisans_ustu_sinif_bil, sortable: true },
    { name: 'Kayıt Tipi', selector: (row) => row.kayit_tipi, sortable: true },
    { name: 'Burs/İndirim Tipi', selector: (row) => row.burs_tipi, sortable: true },
    { name: 'Burs/İndirim Durumu', selector: (row) => row.burs_durumu, sortable: true },
    { name: 'GNO', selector: (row) => row.derece, sortable: true },
  ];
 
  const [numberofstudentscholarshiplist, setNumberofstudentscholarshiplist] = useState<Array<StudentScholarshipNumbers>>([]);

  const [formData, setFormData] = useState<StudentScholarshipNumbersRequest>(
    {
      f: "",
      d: "",
      o: "",
      class: "",
      class_type: "",
      register_year: "",
      register_type: "",
      status: "",
      fee_status: "",
      credit: "",
      scholarshipType:""
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
    api.studentScholarshipNumbers(formData).then((x) => {
      setlistLoad(false);
      setNumberofstudentscholarshiplist(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err))
  };

  const [filteredData, setFilteredData] = useState(numberofstudentscholarshiplist);
  const handleSearch = (e:any) => {
    // const searchTerm = e.target.value;
    const filteredItems = numberofstudentscholarshiplist
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
        'Adı Soyadı': item.ad_soyad,
        'Fakülte': item.fak,
        'Bölüm': item.dep,
        'Opsiyon': item.opt,
        'Sınıfı': item.class,
        'Kayıt Yılı': item.register_year,
        'Durumu': item.durumu,
        'Lisansüstü Sınıf Bilgisi': item.lisans_ustu_sinif_bil,
        'Kayıt Tipi': item.kayit_tipi,
        'Burs/İndirim Tipi': item.burs_tipi,
        'Burs/İndirim Durumu': item.burs_durumu,
      })
    }
    );
    const ws = utils.json_to_sheet(formattedData);
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
  useEffect(() => {
      api.faculty().then((x)=>{
        setFList(x);
      })

      api.registerType().then((x)=>{
        setRtList(x);
      })

      api.scholarshipStatus().then((x)=>{
        setSssList(x);
      })
      api.year().then((x)=>{
        setYear(x);
      })
    }
  ,[]
  );
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
              <label className='col-form-label fw-bold fs-6'>Lisansüstü Sınıf Bilgisi</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="class_type"
                  value={formData.class_type}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Ders Aşaması</option>
                  <option value='2'>Tez Aşaması</option>
                  <option value='3'>Doktora Yeterlik</option>
                  <option value='4'>Bilimsel Hazırlık Sınıfı Aşaması</option>
                </select>
              </div>
            </div>

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Kayıt Yılı</span>
              </label>

              <Select
                value={selectedRegisterYear}
                onChange={handleRegisterYear}
                options={yearList}
                isSearchable={true}
                placeholder="kayıt yılını seçiniz"
              />
            </div>

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Durum</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="status"
                  value={formData.status}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Okuyan</option>
                  <option value='2'>Mezun Olan</option>
                  <option value='3'>Ayrılmış</option>
                  <option value='4'>Pasif</option>
                </select>
              </div>
            </div>
            <div className='col-md-3'>
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

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Burs İndirim Türü</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="regulation"
                  value={formData.scholarshipType}
                >
                  <option value='0'>Tümü</option>
                  <option value='1'>Burs</option>
                  <option value='2'>İndirim</option>
                 
                </select>
              </div>
            </div>


            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Burs/İndirim Tipi</span>
              </label>

              <Select
                value={selectedScholarship}
                onChange={handleScholarshipChange}
                options={sssList}
                isSearchable={true}
                isMulti={true}
                placeholder="burs indirim tipini seçiniz"
              />
            </div>

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Burs/İndirim Durumu</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="fee_status"
                  value={formData.fee_status}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Başvurdu</option>
                  <option value='2'>Alıyor</option>
                  <option value='3'>Almıyor</option>
                  <option value='4'>Kesildi</option>
                  <option value='5'>Durduruldu</option>
                  <option value='6'>Değişti</option>
                </select>
              </div>
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
          <h4>Öğrenci Burs Listesi</h4>
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


function NumberOfStudentScholarships() {
  return (
    <SnackbarProvider maxSnack={3}>
      <NumberOfStudentScholarshipsSnack />
    </SnackbarProvider>
  );
}
export default NumberOfStudentScholarships




