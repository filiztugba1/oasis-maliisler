import React, { useEffect, useState } from 'react'
import { CariNameList } from './models/_carinamelistx.model'; 
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import api from '../../services/services';
import { RegisterTypeList } from '../../services/models/_registerType';
// import 'react-data-table-component/dist/data-table.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';



const CariNameListSnack: React.FC = () => {
  const userItem = localStorage.getItem('user');
  const user = userItem ? JSON.parse(userItem) : null;
  const [rtList, setRtList] = useState<Array<RegisterTypeList>>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [listLoad, setlistLoad] = useState(false);
  const [tableisActive, settableisActive] = useState(false);

  const [selectedRegisterType, setSelectedRegisterType] = React.useState(null);
  const handleRegisterTypeChange = (selected: any) => {
    setSelectedRegisterType(selected);
    setFormData({
      register_type: selected.value,
      d: formData.d,
      f: formData.f,
      register_date_finish: formData.register_date_finish,
      register_date_start: formData.register_date_start,
      std_state: formData.std_state
    })
  };

  const [cariList, setCariList] = useState<Array<CariNameList>>([]);
  const [filteredData, setFilteredData] = useState(cariList);
  const [formData, setFormData] = useState<any>(
    {
      register_type: 0,
    }
  );
  const columns: TableColumn<typeof cariList[0]>[] = [
    { name: 'Öğrenci No', selector: (row) => row.id, sortable: true, cell: row => <div className="cell">{row.id}</div> },
    { name: 'Öğrenci Adı-Soyadı', selector: (row) => row.cari_isim, sortable: true, cell: row => <div className="cell">{row.cari_isim}</div> },
    { name: 'TC Kimlik', selector: (row) => row.tckimlik, sortable: true, cell: row => <div className="cell">{row.tckimlik}</div> },
    { name: 'Fakülte', selector: (row) => row.fadi, sortable: true, cell: row => <div className="cell">{row.fadi}</div> },
    { name: 'Bölüm', selector: (row) => row.badi, sortable: true, cell: row => <div className="cell">{row.badi}</div> },
    { name: 'GNO', selector: (row) => row.derece, sortable: true, cell: row => <div className="cell">{row.derece}</div> },
    { name: 'E-Mail', selector: (row) => row.email, sortable: true, cell: row => <div className="cell">{row.email}</div> },
    { name: 'İl', selector: (row) => row.il || '', sortable: true, cell: row => <div className="cell">{row.il}</div> },
    { name: 'İlçe', selector: (row) => row.ilce || '', sortable: true, cell: row => <div className="cell">{row.ilce}</div> },
    { name: 'Adres', selector: (row) => row.address1 || '', sortable: true, cell: row => <div className="cell">{row.address1}</div> },
  ];
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    settableisActive(true);
    setlistLoad(true);
    api.cariList(formData).then((x) => {
      setlistLoad(false);
      setCariList(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err))
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
  const handleSearch = (e: any) => {
    const searchTerm = e.target.value;
    const filteredItems = cariList.filter((item) =>
      (item.cari_isim).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      +item.tckimlik == +searchTerm ||
      item.fadi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.badi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };
  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';

    const formattedData = filteredData.map((item) => ({
      'Öğrenci No': item.id,
      'Öğrenci Adı-Soyadı': item.cari_isim,
      'TC Kimlik': item.tckimlik,
      'Fakülte': item.fadi,
      'Bölüm': item.badi,
      'E-Mail': item.email,
      'İl': item.il,
      'İlçe': item.ilce,
      'Adres': item.address1,
    }));
    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  useEffect(() => {
    setRtList([
      {
        label: "Yks Kayıt",
        value: "1"
      },
      {
        label: "Geçici Kayıt",
        value: "2"
      },
      {
        label: "Ek Yks",
        value: "3"
      },
      {
        label: "Yatay Geçiş",
        value: "4"
      },
      {
        label: "Dikey Geçiş",
        value: "5"
      },
      {
        label: "Ek DGS",
        value: "6"
      },
      {
        label: "Yabancı Uyruk",
        value: "7"
      },
      {
        label: "Enstütü",
        value: "8"
      },
    ]);
  }, []);

  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div className="card-header pt-9 pb-0">
          <h4>Arama Yap</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body pt-9 pb-0">
            <div className='row'>



              <div className='col-md-6'>
                <label className='col-form-label fw-bold fs-6'>
                  <span >Kayıt Tipi</span>
                </label>

                <Select
                  value={selectedRegisterType}
                  onChange={handleRegisterTypeChange}
                  options={rtList}
                  isSearchable={true}
                  placeholder="kayıt tipini seçiniz"
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

      {tableisActive ? <div className='card mb-5 mb-xl-10'>
        {listLoad ? <Loading /> : ''}
        <div className='card-header pt-9 pb-0'>
          <h4>{user.academicYear} {user.academicSemesterText} Cari İsim Listesi</h4>
        </div>
        <div className='card-body pt-9 pb-0'>

          {cariList.length ?
            <>
              <button style={{ float: "left" }} className='btn btn-sm btn-primary' onClick={exportToExcel}>Export to Excel</button>

              <input style={{ float: "right" }}
                type="text"
                placeholder="Arama Yap"
                onChange={handleSearch}
              />
            </> : ''}
          <DataTable
            columns={columns}
            data={filteredData}
            noDataComponent={'Kayıt bulunamadı'}
            pagination // If you want to enable pagination
            keyField="ogrno"
          />
        </div>
      </div> : ''}
    </>
  )
}

function CariNameListe() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CariNameListSnack />
    </SnackbarProvider>
  );
}
export default CariNameListe






