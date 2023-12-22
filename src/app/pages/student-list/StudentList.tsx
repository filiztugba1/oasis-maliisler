import React, { useEffect, useState } from 'react'
import { StudentListRequest,StudentList } from './models/_studentlist.model'
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import { FacultyList } from '../../services/models/_faculty';
import api from '../../services/services';
// import 'react-data-table-component/dist/data-table.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';
const StudentListtSnack: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);
  const [fList, setFList] = useState<Array<FacultyList>>([]);
  const [dList, setDList] = useState<Array<FacultyList>>([]);
  const [ssList, setSsList] = useState<Array<FacultyList>>([]);
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
  };

  const [selectedStuStatus, setSelectedStuStatus] = React.useState(null);
  const handleStuStatusChange = (selected: any) => {
    setSelectedStuStatus(selected);
    formDoldur("stu_status",JSON.stringify(selected));
  };

  const [selectedRegisterType, setSelectedRegisterType] = React.useState(null);
  const handleRegisterTypeChange = (selected: any) => {
    setSelectedRegisterType(selected);
    formDoldur("register_type",JSON.stringify(selected));

  };

  const [selectedScholarship, setSelectedScholarship] = React.useState(null);
  const handleScholarshipChange = (selected: any) => {
    setSelectedScholarship(selected);
    formDoldur("fee_status",JSON.stringify(selected));
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
        status_date_start: key==='status_date_start'?value:formData.status_date_start,
        status_date_finish: key==='status_date_finish'?value:formData.status_date_finish,
        stu_status: key==='stu_status'?value:formData.stu_status,
        register_type: key==='register_type'?value:formData.register_type,
        regulation: key==='regulation'?value:formData.regulation,
        sex: key==='sex'?value:formData.sex,
        credit: key==='credit'?value:formData.credit,
        fee_status: key==='fee_status'?value:formData.fee_status,
        citizen: key==='citizen'?value:formData.citizen,
        status: key==='status'?value:formData.status,
        class: key==='class'?value:formData.class,
        register_year: key==='register_year'?value:formData.register_year,
        class_type: key==='class_type'?value:formData.class_type,
        khk: key==='khk'?value:formData.khk,
        ozet: key==='ozet'?value:formData.ozet
      }
    );
  };

  const columns: TableColumn<typeof definitiverecordlist[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.id, sortable: true , cell: row => <div className="cell" style={{}}>{row.id}</div>},
    { name: 'Adı Soyadı', selector: (row) => row.name+' '+row.surname, sortable: true, cell: row => <div className="cell">{ row.name+' '+row.surname}</div> },
    { name: 'Fakülte', selector: (row) => row.fadi, sortable: true , cell: row => <div className="cell">{row.fadi}</div>},
    { name: 'Bölüm', selector: (row) => row.badi, sortable: true , cell: row => <div className="cell">{row.badi}</div>},
    { name: 'Opsiyon', selector: (row) => row.opt, sortable: true, cell: row => <div className="cell">{row.opt}</div> },
    { name: 'Sınıfı', selector: (row) => row.sinif, sortable: true , cell: row => <div className="cell">{row.sinif}</div>},
    { name: 'Kayıt Tarihi', selector: (row) => row.register_date, sortable: true, cell: row => <div className="cell">{row.register_date}</div> },
    { name: 'Tarihçe Durumu', selector: (row) => row.tarihce_durumu, sortable: true , cell: row => <div className="cell">{row.tarihce_durumu}</div>},
    { name: 'Tarih', selector: (row) => row.tckimlik, sortable: true , cell: row => <div className="cell">{row.tckimlik}</div>},
    { name: 'TC Kimlik No', selector: (row) => row.tckimlik, sortable: true , cell: row => <div className="cell">{row.tckimlik}</div>},
    { name: 'Pasaport No', selector: (row) => row.pasaport_no, sortable: true , cell: row => <div className="cell">{row.pasaport_no}</div>},
    { name: 'Burs/İndirim Tipi', selector: (row) => row.burs_tipi, sortable: true, cell: row => <div className="cell">{row.burs_tipi}</div> },
    { name: 'Burs/İndirim Durumu', selector: (row) => row.burs_durumu, sortable: true , cell: row => <div className="cell">{row.burs_durumu}</div>},
    { name: 'ÇAP/YDP Durumu', selector: (row) => row.cift_durum, sortable: true, cell: row => <div className="cell">{row.cift_durum}</div> },
    { name: 'ÇAP/YDP Tarihçe Durum Tarihi', selector: (row) => row.cift_tar, sortable: true, cell: row => <div className="cell">{row.cift_tar}</div> },
    { name: 'GNO', selector: (row) => row.derece, sortable: true , cell: row => <div className="cell">{row.derece}</div>},
    { name: 'Kayıt Yılı', selector: (row) => row.register_year, sortable: true , cell: row => <div className="cell">{row.register_year}</div>},
    { name: 'D.Tarihi', selector: (row) => row.birth_date, sortable: true , cell: row => <div className="cell">{row.birth_date}</div>},
    { name: 'Uyruğu', selector: (row) => row.ulke, sortable: true , cell: row => <div className="cell">{row.ulke}</div>},
    { name: 'Lisansüstü Sınıf Bilgisi', selector: (row) => row.class_type, sortable: true , cell: row => <div className="cell">{row.class_type}</div>},
    { name: 'Hazırlıkta Geçirdiği Süre', selector: (row) => '', sortable: true , cell: row => <div className="cell">{}</div>},
    { name: 'Bölümünde Geçirdiği Süre', selector: (row) => '', sortable: true , cell: row => <div className="cell">{}</div>},
    { name: 'Toplam Geçirdiği Süre', selector: (row) => '', sortable: true , cell: row => <div className="cell">{}</div>},
    { name: '_ECHO_HISTORY', selector: (row) => row.id, sortable: true , cell: row => <div className="cell">{row.id}</div>},
    { name: 'Cinsiyet', selector: (row) => row.sexx, sortable: true , cell: row => <div className="cell">{row.sexx}</div>},
    { name: 'Kayıt Tipi', selector: (row) => row.kayit_tipi, sortable: true , cell: row => <div className="cell">{row.kayit_tipi}</div>},
    { name: 'Telefon', selector: (row) => row.Ogrenci_Telefon, sortable: true , cell: row => <div className="cell">{row.Ogrenci_Telefon}</div>},
    { name: 'Telefon1', selector: (row) => row.Telefon, sortable: true, cell: row => <div className="cell">{row.Telefon}</div> },
    { name: 'Telefon2', selector: (row) => row.Telefon_2, sortable: true , cell: row => <div className="cell">{row.Telefon_2}</div>},
    { name: 'Üniversite E-mail', selector: (row) => row.email, sortable: true , cell: row => <div className="cell">{row.email}</div>},
    { name: 'Alternatif E-mail', selector: (row) => row.alternatifEmail, sortable: true , cell: row => <div className="cell">{row.alternatifEmail}</div>},
    { name: 'Kapatılan Üniversite Bilgisi', selector: (row) => '', sortable: true, cell: row => <div className="cell">{}</div> },
    { name: 'Özel Öğrenci Olarak Öğrenim Gördüğü Üniversite', selector: (row) => '', sortable: true , cell: row => <div className="cell">{}</div>},
    { name: 'Lisansüstü Ücret Bilgisi', selector: (row) => '', sortable: true, cell: row => <div className="cell">{}</div> },
    { name: 'Birden Fazla İndirim', selector: (row) => '', sortable: true , cell: row => <div className="cell">{}</div>},
    { name: 'Birden Fazla İndirim Tipi', selector: (row) => '', sortable: true, cell: row => <div className="cell">{}</div> },
    { name: 'Puan Türü', selector: (row) => row.puanTuru, sortable: true , cell: row => <div className="cell">{row.puanTuru}</div>},
    { name: 'Yerleştirme Puani', selector: (row) => row.yerlestirmePuani, sortable: true, cell: row => <div className="cell">{row.yerlestirmePuani}</div> },
    { name: 'Yerleştirme Sirasi', selector: (row) => row.yerlestirmeSirasi, sortable: true , cell: row => <div className="cell">{row.yerlestirmeSirasi}</div>},
    { name: 'İl', selector: (row) => row.il, sortable: true, cell: row => <div className="cell">{row.il}</div> },
    { name: 'Okul Türü', selector: (row) => row.highSchool, sortable: true , cell: row => <div className="cell">{row.highSchool}</div>},
    { name: 'Anne Meslek', selector: (row) => row.momthersJob, sortable: true , cell: row => <div className="cell">{row.momthersJob}</div>},
    { name: 'Baba Meslek', selector: (row) => row.fathersJob, sortable: true , cell: row => <div className="cell">{row.fathersJob}</div>},
  ];

  const [definitiverecordlist, setDefinitiverecordlist] = useState<Array<StudentList>>([]);

  const [formData, setFormData] = useState<StudentListRequest>(
    {
      f: "",
      d: "",
      status_date_start: "",
      status_date_finish: "",
      stu_status: "",
      register_type: "",
      regulation: "",
      sex: "",
      credit: "",
      fee_status: "",
      citizen: "",
      status: "",
      class: "",
      register_year: "",
      class_type: "",
      khk: "",
      ozet: ""
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
    api.studentList(formData).then((x) => {
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
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      +item.tckimlik=== +searchTerm ||
      item.fadi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.badi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.opt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kayit_tipi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // item.status_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // (item.burs_tipi?item.burs_tipi.toLowerCase().includes(searchTerm.toLowerCase()):false) ||
      // (item.burs_durumu?item.burs_durumu.toLowerCase().includes(searchTerm.toLowerCase()):false) ||
      item.sexx.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';
  
    const formattedData = filteredData.map((item) => ({
      'Öğrenci No': item.id,
      'Adı Soyadı': item.name+' '+item.surname,
      'Fakülte': item.fadi,
      'Bölüm': item.badi,
      'Opsiyon': item.opt,
      'Sınıfı': item.sinif,
      'Kayıt Tarihi': item.register_date,
      'Tarihçe Durumu': item.tarihce_durumu,
      'Tarih': item.status_date,
      'TC Kimlik No': item.tckimlik,
      'Pasaport No': item.pasaport_no,
      'Burs/İndirim Tipi': item.burs_tipi,
      'Burs/İndirim Durumu': item.burs_durumu,
      'ÇAP/YDP Durumu': item.cift_durum,
      'ÇAP/YDP Tarihçe Durum Tarihi': item.cift_tar,
      'GNO': '',
      'Kayıt Yılı': item.register_year,
      'D.Tarihi': item.birth_date,
      'Uyruğu': item.ulke,
      'Lisansüstü Sınıf Bilgisi': item.class_type,
      'Hazırlıkta Geçirdiği Süre': '',
      'Bölümünde Geçirdiği Süre': '',
      'Toplam Geçirdiği Süre': '',
      '_ECHO_HISTORY': item.explanation,
      'Cinsiyet': item.sexx,
      'Kayıt Tipi': item.kayit_tipi,
      'Telefon': item.Ogrenci_Telefon,
      'Telefon1': item.Telefon,
      'Telefon2': item.Telefon_2,
      'Üniversite E-mail': item.email,
      'Alternatif E-mail': item.alternatifEmail,
      'Kapatılan Üniversite Bilgisi': "",
      'Özel Öğrenci Olarak Öğrenim Gördüğü Üniversite': "",
      'Lisansüstü Ücret Bilgisi': "",
      'Birden Fazla İndirim': "",
      'Birden Fazla İndirim Tipi': "",
      'Puan Türü': item.puanTuru,
      'Yerleştirme Puani': item.yerlestirmePuani,
      'Yerleştirme Sirasi': item.yerlestirmeSirasi,
      'İl': item.il,
      'Okul Türü': item.highSchool,
      'Anne Meslek': item.momthersJob,
      'Baba Meslek': item.fathersJob
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

 
  useEffect(() => {
    if(isApi)
    {
      api.faculty().then((x)=>{
        setFList(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))

      api.stuStatus().then((x)=>{
        setSsList(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))

      api.registerType().then((x)=>{
        setRtList(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))

      api.scholarshipStatus().then((x)=>{
        setSssList(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))
      api.year().then((x)=>{
        setYear(x);
        setIsApi(false);
      }).catch(err => catchFunc(err))
    }
  },[]
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
                  isMulti={true}
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
                  isMulti={true}
                  isSearchable={true}
                  placeholder="Bölüm Seçiniz"
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

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Durum Tarihi Başlangıç</span>
              </label>
              <input
                type='date'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleChange}
                name="status_date_start"
                value={formData.status_date_start}
              />

            </div>

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Durum Tarihi Bitiş</span>
              </label>
              <input
                type='date'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleChange}
                name="status_date_finish"
                value={formData.status_date_finish}
              />

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
              <label className='col-form-label fw-bold fs-6'>Bağlı olduğu plan</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="regulation"
                  value={formData.regulation}
                >
                  <option value='2'>Tümü</option>
                  <option value='1'>Yeni Plan</option>
                  <option value='0'>Eski Plan</option>
                 
                </select>
              </div>
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
              <label className='col-form-label fw-bold fs-6'>Cinsiyet</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="sex"
                  value={formData.sex}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Erkek</option>
                  <option value='2'>Kadın</option>
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

       

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Uyruk</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="citizen"
                  value={formData.citizen}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>TC</option>
                  <option value='2'>Yabancı</option>
                </select>
              </div>
            </div>

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>Tümü/Özet</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="ozet"
                  value={formData.ozet}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>Özet</option>
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

            {/* <div className='col-md-3'>
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
            </div> */}

            <div className='col-md-3'>
              <label className='col-form-label fw-bold fs-6'>KHK</label>
              <div className='col-lg-12 fv-row'>
                <select
                  className='form-select'
                  onChange={handleChange}
                  name="khk"
                  value={formData.khk}
                >
                  <option value=''>Tümü</option>
                  <option value='1'>KHK hariç</option>
                  <option value='2'>Sadece KHKlılar</option>
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
          <h4>Öğrenci Listesi</h4>
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
            className="dataTableHeader"
          />
        </div>
      </div>:''}
    </>
  )
}

function StudentListt() {
  return (
    <SnackbarProvider maxSnack={3}>
      <StudentListtSnack />
    </SnackbarProvider>
  );
}
export default StudentListt





