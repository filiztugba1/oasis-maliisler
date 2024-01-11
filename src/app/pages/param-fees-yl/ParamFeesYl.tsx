import React, { useEffect,useState } from 'react'
import {ParamFeesYlx, ParamFeesYlAppList, ParamFeesYlOnayRed} from './models/_paramfees'
import './payments.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX,utils } from 'xlsx';
import api from '../../services/services';
import * as XLSX from 'xlsx';
import {  Modal } from 'react-bootstrap';
import { FacultyList } from '../../services/models/_faculty';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';
// import 'react-data-table-component/dist/data-table.css';
const catchFunc = (err: any,enqueueSnackbar:any) => {
  if (err.response && err.response.data && err.response.data.message) {
    enqueueSnackbar(err.response.data.message, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
    if (err.response.data.message === 'Expired token' || err.response.data.message === 'Undefined index: password') {
      localStorage.clear();
      window.location.href = '/auth';
      // navigate('/auth');
    }
  }
}
const ParamFeesYlSnack: React.FC = () => {
 
  // const [yearList, setYear] = useState<Array<FacultyList>>([]);
  const { enqueueSnackbar } = useSnackbar();
  const handlePaymentClose = () => setShowPayment(false);
  const handlePaymentShow = () => setShowPayment(true);
  const [showPayment, setShowPayment] = useState(false);
  const handleAddPaymentClose = () => setShowAddPayment(false);
  const handleAddPaymentShow = () => setShowAddPayment(true);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [fList, setFList] = useState<Array<FacultyList>>([]);
  const [dList, setDList] = useState<Array<FacultyList>>([]);
  
  const [listLoad, setlistLoad] = useState(false);
  const [listUpdateLoad, setlistUpdateLoad] = useState(false);

  const [modalFormTitle, setModalFormTitle] = useState('');
  const [modalFormuButton, setModalFormButton] = useState('');
  

  const handleparametreRedClose = () => setparametreRed(false);
  const handleparametreRedShow = () => setparametreRed(true);
  const [parametreRed, setparametreRed] = useState(false);

  useEffect(() => {
    
          setlistLoad(true);
          paramList();
          paramAppList();

    //  api.year(1).then((x) => {
    //         setYear(x);
    //       }).catch(err => catchFunc(err))
          api.faculty().then((x)=>{
            setFList(x);
          }).catch(err => catchFunc(err,enqueueSnackbar))
    },[enqueueSnackbar]);

  const [selectedYear, setSelectedYear] = React.useState<null | FacultyList>(null);
  // const handleRegisterYear = (selected: any) => {
  //   setSelectedYear(selected);
  // };

  const paramList = () => {
    api.paramFeesYl().then((x) => {
      setlistLoad(false);
      setSummerFeeRefundRequests(x);
      setFilteredData(x);
    }).catch(err => catchFunc(err,enqueueSnackbar))
  }

  const paramAppList = () => {
    api.paramAppFees({module:'param-fees-yl'}).then((x) => {
      setlistLoad(false);
      setSummerFeeAppRefundRequests(x);
      setFilteredAppData(x);
    }).catch(err => catchFunc(err,enqueueSnackbar))
  }

  const columns: TableColumn<typeof summerFeeRefundRequests[0]>[] = [
    {
      name: 'İşlem', selector: (row) => '', cell: (row) => <div>
        <span><button className='btn  btn-warning btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => updateShow(row)}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => deleteShow(row)}><i className='fa fa-trash'></i></button></span>
      </div> ,
      sortable: true
    },
    { name: 'Fakülte', selector: (row) => row.fak_name, sortable: true },
    { name: 'Bölüm', selector: (row) => row.dep_name, sortable: true },
    { name: 'f', selector: (row) => row.f, sortable: true },
    { name: 'd', selector: (row) => row.d, sortable: true },
    { name: 'fdo', selector: (row) => row.fdo, sortable: true },
    { name: 'Yüksek Lisans', selector: (row) => api.paymetFormat(row.fee) || '', sortable: true },
    { name: 'Yüksek Lisans Hazırlık', selector: (row) => api.paymetFormat(row.fee_prep) || '', sortable: true },
   ];


  const columns2: TableColumn<typeof summerFeeRefundRequests[0]>[] = [
   

    { name: 'Fakülte', selector: (row) =>Object.values(row)[Object.keys(row).findIndex(key => key==='Fakülte')], sortable: true },
    { name: 'Bölüm', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='Bölüm')], sortable: true },
    { name: 'f', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='f')], sortable: true },
    { name: 'd', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='d')], sortable: true },
    { name: 'fdo', selector: (row) => Object.values(row)[Object.keys(row).findIndex(key => key==='fdo')], sortable: true },
    { name: 'Yüksek Lisans', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Yüksek Lisans')]) || '', sortable: true },
    { name: 'Yüksek Lisans Hazırlık', selector: (row) => api.paymetFormat(Object.values(row)[Object.keys(row).findIndex(key => key==='Yüksek Lisans Hazırlık')]) || '', sortable: true },
    ];

  const [summerFeeReAppfundRequests, setSummerFeeAppRefundRequests] = useState<Array<ParamFeesYlAppList>>([]);
  const columnsOnay: TableColumn<typeof summerFeeReAppfundRequests[0]>[] = [
    { name: 'Ekleme zamanı', selector: (row) => row.created_date, sortable: true },
    { name: 'Ekleyen Kullanıcı', selector: (row) => row.createUser, sortable: true },
    {
      name: 'Gönderilen Parametre Listesi', selector: (row) => '', cell: (row) =>    <div style={{ textAlign: 'center' }}>
      <span style={{ display: 'inline-block', textAlign: 'center' }}>
        <button 
          className='btn btn-warning btn-sm' 
          style={{ padding: "3px 9px", margin: "0px 1px", display: 'inline-block' }}
          onClick={() => paramFeeOnayList(row)}
        >
          <i className='fa fa-search'></i> Görüntüle
        </button>
      </span>
    </div>,
      sortable: true
    },
    { name: 'Onaylayan / Reddeden Kullanıcı', selector: (row) => row.appUser, sortable: true },
    {
      name: 'Onay / Red Durumu', selector: (row) => '', cell: (row) =>    <div style={{ textAlign: 'center' }}>
        {row.approval_rejection===null?
           <>
           <button 
           className="btn btn-success btn-sm"
           style={{ padding: "3px 9px", margin: "0px 1px", display: 'inline-block' }}
           onClick={() => handleparamFeeOnay(row)}
         >
           Onayla
         </button>
        <button 
          className="btn btn-danger btn-sm"
          style={{ padding: "3px 9px", margin: "0px 1px", display: 'inline-block' }}
          onClick={() => handleparamFeeRed(row)}
        >
          Reddet
        </button>
        </>

        
        :<span style={{ display: 'inline-block', textAlign: 'center' }}>
        <button 
          className={`btn btn-${row.approval_rejection===1?'success':'danger'} btn-sm`}
          style={{ padding: "3px 9px", margin: "0px 1px", display: 'inline-block' }}
        >
          {row.approval_rejection===1?'Onaylandı':'Red Edildi'}
        </button>
      </span>}
      
    </div>,
      sortable: true
    },
    { name: 'Onay / Red Tarihi', selector: (row) => row.approval_rejection_date, sortable: true },
    { name: 'Mesaj',selector: (row) => row.message, sortable: true },
  ];

  const [filteredAppData, setFilteredAppData] = useState(summerFeeReAppfundRequests);


  // const columnsAppJsonList: TableColumn<typeof summerFeeRefundRequests[0]>[] = [
  //   { name: 'Fakülte', selector: (row) => row.fak_name, sortable: true },
  //   { name: 'Bölüm', selector: (row) => row.dep_name, sortable: true },
  //   { name: 'f', selector: (row) => row.f, sortable: true },
  //   { name: 'd', selector: (row) => row.d, sortable: true },
  //   { name: 'fdo', selector: (row) => row.fdo, sortable: true },
  //   { name: 'Yüksek Lisans', selector: (row) => api.paymetFormat(row.fee) || '', sortable: true },
  //   { name: 'Yüksek Lisans Hazırlık', selector: (row) => api.paymetFormat(row.fee_prep) || '', sortable: true },
  // ];


  // const [showFees, setShowFees] = useState(false);

  // const handleFeesClose = () => setShowFees(false);
  // const handleFeesShow = () => setShowFees(true);


  const [deleteshowFees, setDeleteShowFees] = useState(false);

  const handleDeleteFeesClose = () => setDeleteShowFees(false);
  const handleDeleteFeesShow = () => setDeleteShowFees(true);

  const [showAppFees, setShowAppFees] = useState(false);
  const handleFeesAppClose = () => setShowAppFees(false);
  const handleFeesAppShow = () => setShowAppFees(true);

  const paramFeeOnayList=(row:ParamFeesYlAppList)=>{
    setJsonDataApp(JSON.parse(row.json_data));
    handleFeesAppShow();
  }

  const updateShow = (row: ParamFeesYlx) => {
    let selectFac:any=fList.find((x) => +x.value === +row.f);
    setSelectedFaculty(selectFac);
    api.department({f:JSON.stringify([selectFac])}).then((x)=>{
      setDList(x);

      // api.department işlemi tamamlandığında yeni x değeri ile selectDep'i bul
      const selectDep:any = x.find((item) => +item.value === +row.fdo);

      if (selectDep) {
        setSelectedDepartment(selectDep);
        const newFormData: ParamFeesYlx = {
          f: JSON.stringify(selectFac),
          d: JSON.stringify(selectDep),
          fee:row.fee!==null?formatNumber(row.fee) + '':'',
          fee_prep:  row.fee_prep!==null?formatNumber(row.fee_prep) + '':'',
          fdo: row.fdo,
          dep_name: row.dep_name,
          fak_name: row.fak_name,
          year: ''
        };
        
        setFormData(newFormData);
      }
    })
 
    setModalFormTitle('Parametre Güncelleme');
    setModalFormButton('Güncelle');

    handleAddPaymentShow();
  }
  const addShow = () => {
    setModalFormTitle('Parametre Ekleme');
    setModalFormButton('Ekleme');
    setFormData(formNull);
    setSelectedFaculty(null);
    setSelectedDepartment(null);
    setDList([]);
    handleAddPaymentShow();
  }
  const deleteShow = (row: ParamFeesYlx) => {
    // setSelectedYear(yearList.find((x) => +x.value === +row.Year) ?? null);
    // setSelectedScholarship(sssList.find((x) => +x.value === +row.sid) ?? null);
    // setFormDataScolar({
    //   year: row.Year,
    //   semester: row.Semester,
    //   scholarship_type: row.sid,
    //   scholarship_status: row.stat_id,
    //   explanation: row.Explanation,
    //   std_state_date: row.stat_date_,
    //   update_date: row.update_date_,
    //   actionType: 'delete'
    // });
    setFormData(row);
    handleDeleteFeesShow();
  }
  
  const [summerFeeRefundRequests, setSummerFeeRefundRequests] = useState<Array<ParamFeesYlx>>([]);


  const [filteredData, setFilteredData] = useState(summerFeeRefundRequests);
  const handleSearch = (e:any) => {
    // const searchTerm = e.target.value;
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
        'Yüksek Lisans': api.paymetFormat(item.fee),
        'Yüksek Lisans Hazırlık': api.paymetFormat(item.fee_prep),

      })
    }
    );
    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const [jsonData, setJsonData] = useState<any[]>([]);
  const [jsonDataApp, setJsonDataApp] = useState<any[]>([]);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      console.log(file);
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
    
    if(jsonData.length===0)
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
      year:selectedYear?.value,
      type:'param-fees-yl'
    }
    setlistUpdateLoad(true);
    api.paramFeesCu(formData).then((x) => {
      setlistUpdateLoad(false);
      if(x.status!==200)
      {
        enqueueSnackbar(x.message, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      enqueueSnackbar(x.message, { variant:'success',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      setShowPayment(false);
    }).catch(err => catchFunc(err,enqueueSnackbar)) 
  }

  
 

  const [selectedFaculty, setSelectedFaculty] = React.useState(null);
  const handleFacultyChange = (selected: any) => {
    setSelectedFaculty(selected);
    formDoldur("f",JSON.stringify(selected));
    setSelectedDepartment(null);
    /// burası seçildiğinde bölüm bilgisi doldurulacak
    api.department({f:JSON.stringify([selected])}).then((x)=>{
      setDList(x);
    })
  };

  const [selectedDepartment, setSelectedDepartment] = React.useState(null);
  const handleDepartmentChange = (selected: any) => {
    setSelectedDepartment(selected);
    formDoldur("d",JSON.stringify(selected));
  };
  const formNull={
    year: "",
    f: "",
    d: "",
    fee: "",
    fee_prep: "",
    fdo: "",
    dep_name: "",
    fak_name: "",
  };
  const [formData, setFormData] = useState<ParamFeesYlx>(
    formNull
  );
  const [formRedData, setFormRedData] = useState<ParamFeesYlOnayRed>(
    {
      id: 0,
      message:''
    }
  );

  const handleRedChange = (e:any) => {
    const { name, value } = e.target;
    setFormRedData({ ...formRedData, [name]: value });
  };

  
  const formDoldur = (key: any,value:any) => {
    setFormData(
      {
        f: key==='f'?value:formData.f,
        d: key==='d'?value:formData.d,
        fee: key==='fee'?value:formData.fee,
        fee_prep: key==='fee_prep'?value:formData.fee_prep,
        fdo: key==='fdo'?value:formData.fdo,
        dep_name: key==='dep_name'?value:formData.dep_name,
        fak_name: key==='fak_name'?value:formData.fak_name,
        year:''
      }
    );
  };
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if(name==='fee' ||
    name==='fee2' ||
    name==='fee3' ||
    name==='fee4' ||
    name==='fee5' ||
    name==='fee6' ||
    name==='fee7' ||
    name==='fee8' ||
    name==='fee_prep' ||
    name==='fee_prep2' ||
    name==='fee_prep3' )
    {
      const rawValue = e.target.value.replace(/[^0-9,.]/g, ''); // Sadece sayılar, nokta ve virgülü kabul et
      const formattedValue = formatNumber(rawValue); // Sayıyı istediğiniz formata dönüştür
      setFormData({ ...formData, [name]: formattedValue });
      // formDoldur
    }
    else
    {

      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setlistLoad(true);
    api.paramfeeyladd(formData).then((x) => {
      setlistLoad(false);
      paramList();
      if(x.status!==200)
      {
        enqueueSnackbar(x.data, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      else
      {

        enqueueSnackbar(x.data, { variant:'success',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      handleAddPaymentClose()
    }).catch(err => catchFunc(err,enqueueSnackbar))
  };

  const handleSubmitParametreRed = (e:any) => {
    e.preventDefault();
    setlistLoad(true);
    api.paramfeered(formRedData).then((x) => {
      setlistLoad(false);
      if(x.status!==200)
      {
        enqueueSnackbar(x.data, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      else
      {
        handleparametreRedClose();
        enqueueSnackbar(x.data, { variant:'success',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      paramAppList();
     
    }).catch(err => catchFunc(err,enqueueSnackbar))
    
  };
  
  const handleSubmitParametreDelete = (e:any) => {
    e.preventDefault();
    setlistLoad(true);
    console.log(formData);
    api.paramfeeyldelete(formData).then((x) => {
      setlistLoad(false);
      
      if(x.status!==200)
      {
        enqueueSnackbar(x.data, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      else
      {
        paramList();
        handleDeleteFeesClose();
        enqueueSnackbar(x.data, { variant:'success',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
     
    }).catch(err => catchFunc(err,enqueueSnackbar))
    
  };

  const handleparamFeeOnay = (row:ParamFeesYlAppList) => {
    setFormRedData({
      id:+row.id,
      message:''
    })
    setlistLoad(true);
    api.paramfeeonay({
      id:+row.id,
      message:''
    }).then((x) => {
      setlistLoad(false);
      paramAppList();
      paramList();
      if(x.status!==200)
      {
        enqueueSnackbar(x.data, { variant:'error',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
      else
      {

        enqueueSnackbar(x.data, { variant:'success',anchorOrigin:{ vertical: 'top',horizontal: 'right',} });
      }
    }).catch(err => catchFunc(err,enqueueSnackbar))
    
  };

  

  const handleparamFeeRed = (row:ParamFeesYlAppList) => {
    setFormRedData({
      id:+row.id,
      message:''
    })

    handleparametreRedShow();
  };

  

  const formatNumber = (value:any) => {
    // Sayıyı istediğiniz formata dönüştürme mantığını burada ekleyebilirsiniz
    const parts = value.split(',');
    parts[0] = parts[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    if (parts[1]) {
      parts[1] = parts[1].replace(/\D/g, '');
    }
    return parts.join(',');
  };
  return (
    <>
<div className='card mb-5 mb-xl-10'>
        <div className='card-header pt-9 pb-9'>
          <h4>Excel ile toplu parametre ekleme</h4>
          
          <div>
          <button className="btn btn-sm btn-success" onClick={handleYukleModal} style={{float: 'right'}}>Yüklenecek verileri gör</button>
          {/* <div style={{float: 'right',marginRight: "4px",marginTop: "-2px"}}>
          <Select 
                      value={selectedYear}
                      onChange={handleRegisterYear}
                      options={yearList}
                      isSearchable={true}
                      placeholder="yılı seçiniz"
                    />
            </div> */}
          <input type="file" onChange={handleFileUpload} style={{float: 'right'}} />
          </div>
          
            {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
        </div>
</div>

<div className='card mb-5 mb-xl-10'>
      <div className='card-header pt-9 pb-5'>
          <h4>Parametre Tablosu Onaylanma Durumları</h4>
      </div>
      <div className='card-body pt-9 pb-0'>
      
          <DataTable
            columns={columnsOnay}
            data={filteredAppData}
            noDataComponent={'Kayıt bulunamadı'}
            pagination // If you want to enable pagination
            keyField="fdo"
          />
      </div>
    </div>


      <div className='card mb-5 mb-xl-10'>
      {listLoad?<Loading/>:''}
      <div className='card-header pt-9 pb-5'>
          <h4>Yüksek lisans parametre tablosu</h4>
          
          <button className="btn btn-sm btn-success" onClick={addShow} style={{float: 'right'}}>Parametre Ekle</button>
          
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
      {listUpdateLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>Yüklemiş olduğunuz veriler </Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
        {/* <p style={{color:'red',textAlign:"right",float:'right'}}>Seçilen Yıl: {selectedYear?.value}</p> */}
        <DataTable
            columns={columns2}
            data={ jsonData}
            noDataComponent={'Kayıt bulunamadı'}
            pagination // If you want to enable pagination
            keyField="fdo"
          />
          <form onSubmit={handleAktar}>
        <button type='submit' className="btn btn-sm btn-success"style={{float: 'right'}}>Onaya Gönder</button>
      
        </form>
        </Modal.Body>
        
    
      </Modal>

      <Modal show={showAppFees} onHide={handleFeesAppClose} size='xl'>
      {listUpdateLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>Onaya Göndermiş Olduğunuz Parametre Listesi</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
        <DataTable
            columns={columns2}
            data={jsonDataApp}
            noDataComponent={'Kayıt bulunamadı'}
            pagination // If you want to enable pagination
            keyField="fdo"
          />
        </Modal.Body>
      </Modal>


      <Modal show={showAddPayment} onHide={handleAddPaymentClose} size='xl'>
      {listUpdateLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>{modalFormTitle}</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
        {/* <p style={{color:'red',textAlign:"right",float:'right'}}>Seçilen Yıl: {selectedYear?.value}</p> */}
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
                  isMulti={false}
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
                  isSearchable={true}
                  isMulti={false}
                  placeholder="Bölüm Seçiniz"
                  isDisabled={selectedFaculty===null?true:false}
                />
              </div>
            </div>

            <div className='col-md-6'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Yüksek Lisans</span>
              </label>
              <input
                type='text'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleChange}
                name="fee"
                value={formData.fee}
                placeholder="000.000,00"
              />
            </div>


            <div className='col-md-6'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Yüksek Lisans Hazırlık</span>
              </label>
              <input
                type='text'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleChange}
                name="fee_prep"
                value={formData.fee_prep}
                placeholder="000.000,00"
              />
            </div>

       
            <div className='card-footer d-flex justify-content-end mt-10' style={{ height: "43px" }}>
              <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
              {modalFormuButton}
              </button>
            </div>


            <br /><br />
          </div>

        </div>
        </form>
        </Modal.Body>
      </Modal>


      <Modal show={parametreRed} onHide={handleparametreRedClose} size='xl'>
      {listUpdateLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>Parametre Reddetme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <p style={{color:'red',textAlign:"right",float:'right'}}>Seçilen Yıl: {selectedYear?.value}</p> */}
        <form onSubmit={handleSubmitParametreRed}>
        <div className="card-body pt-9 pb-0">
          <div className='row'>
            <div className='col-md-12'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Red Mesajı</span>
              </label>
              <input type='hidden' name='id' value={formRedData.id}></input>
              <input
                type='text'
                className='form-control'
                data-kt-search-element='input'
                onChange={handleRedChange}
                name="message"
                value={formRedData.message}
                required={true}
              />
            </div>       
            <div className='card-footer d-flex justify-content-end mt-10' style={{ height: "43px" }}>
              <button type='submit' className='btn btn-danger' style={{ height: "43px" }}>
                Reddet
              </button>
            </div>

            <br />
          </div>

        </div>
        </form>
        </Modal.Body>
      </Modal>


      
      <Modal show={deleteshowFees} onHide={handleDeleteFeesClose} size='sm'>
      {listUpdateLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>Parametre Silme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <p style={{color:'red',textAlign:"right",float:'right'}}>Seçilen Yıl: {selectedYear?.value}</p> */}
        <form onSubmit={handleSubmitParametreDelete}>
        <div className="card-body pt-9 pb-0">
          <div className='row'>
            <div className='col-md-12'>
              <label className='col-form-label fw-bold fs-6'>
                <span>Parametreyi silmek istediğinize emin misiniz?</span>
              </label>
              <input type='hidden' name='year' value={formData.year}></input>
              <input type='hidden' name='f' value={formData.f}></input>
              <input type='hidden' name='d' value={formData.d}></input>
              <input type='hidden' name='fdo' value={formData.fdo}></input>
            </div>       
            <div className='card-footer d-flex justify-content-end mt-10' style={{ height: "43px" }}>
              <button type='submit' className='btn btn-danger' style={{ height: "43px" }}>
                Sil
              </button>
            </div>

            <br />
          </div>

        </div>
        </form>
        </Modal.Body>
      </Modal>

    </>
  )
}

function ParamFeesYl() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ParamFeesYlSnack />
    </SnackbarProvider>
  );
}

export default ParamFeesYl






