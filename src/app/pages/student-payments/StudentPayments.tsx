import React, {useEffect, useState } from 'react'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { StudentInfoHeader } from '../student-info/StudentInfoHeader'
import { StudentDetailModel } from '../student-info/models/_studentdetail.model'
import { CollectionList, PaymentList, StudentCollectionUpdateRequest, StudentFeesUpdateRequest } from './models/_payments.model'
import '../style.css';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, utils } from 'xlsx';
import api from '../../services/services';
import {  Modal } from 'react-bootstrap';
import { FacultyList } from '../../services/models/_faculty';
import Select from 'react-select';
import { Switch } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';
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

const accountBreadCrumbs: Array<PageLink> = [
  {
    title: 'Student Info',
    path: '/student-info',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]


const StudentPaymentsSnack: React.FC = () => {
  const [listLoad, setlistLoad] = useState(false);
  const [listPyLoad, setlistPyLoad] = useState(false);
  const [listModalLoad, setlistModalLoad] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentDetailModel>(
    {
      id: "",
      name: "",
      surname: "",
      class: "",
      anadal_fakulte: "",
      anadal_bolum: "",
      anadal_opsiyon: "",
      email: "",
      telefon: "",
      cap_fakulte: "",
      cap_bolum: "",
      cap_opsiyon: "",
      yandal_fakulte: "",
      yandal_bolum: "",
      yandal_opsiyon: "",
      durum: 0,
      durum_tarihi: "",
      burs_durumu: "",
      burs_tipi: "",
      alinan_ders: 0,
      image: "",
      page: "",
      listLoad: false
    }
  );


  const [sssList, setSssList] = useState<Array<FacultyList>>([]);
  const [yearList, setYear] = useState<Array<FacultyList>>([]);
  const [feetypes, setFeetypes] = useState<Array<FacultyList>>([]);
  const [banks, setBanks] = useState<Array<FacultyList>>([]);
  // const [isApi, setIsApi] = useState(true);
  useEffect(() => {
      let formdata = {
        stu_id: localStorage.getItem('search-student-id')
      };
      setlistLoad(true);
      api.activeStudentDetail(formdata).then((x) => {
        setlistLoad(false);
        setStudentInfo(x);
      }).catch(err => catchFunc(err,enqueueSnackbar))
      setlistPyLoad(true);
      api.studentFees(formdata).then((x) => {
        setlistPyLoad(false);
        setPaymentListOdemeBilgileri(x);
        setfilteredDataOdemeBilgileri(x);
      }).catch(err => catchFunc(err,enqueueSnackbar))

      api.studentPayments(formdata).then((x) => {
        setlistPyLoad(false);
        setPaymentList(x);
        setFilteredData(x);
      }).catch(err => catchFunc(err,enqueueSnackbar))

      api.scholarshipStatus().then((x) => {
        setSssList(x);
        // setIsApi(false);
      }).catch(err => catchFunc(err,enqueueSnackbar))

      api.year().then((x) => {
        setYear(x);
        // setIsApi(false);
      }).catch(err => catchFunc(err,enqueueSnackbar))


      api.feeTypes().then((x) => {
        setFeetypes(x);
        // setIsApi(false);
      }).catch(err => catchFunc(err,enqueueSnackbar))

      api.banks().then((x) => {
        setBanks(x);
        // setIsApi(false);
      }).catch(err => catchFunc(err,enqueueSnackbar))

  },[]
  );

  const columns: TableColumn<typeof paymentList[0]>[] = [
    { name: 'Yıl', selector: (row) => row.year, sortable: true },
    { name: 'Dönem', selector: (row) => +row.semester === 1 ? 'Güz' : (+row.semester === 2 ? 'Bahar' : 'Yaz'), sortable: true },
    { name: 'Harç Tipi', selector: (row) => row.name, sortable: true },
    { name: 'Ödenen (USD)', selector: (row) => api.paymetFormat(row.Payment_Dolar || '') || '', sortable: true },
    { name: 'Ödenen (TL)', selector: (row) => api.paymetFormat(row.Payments) || '', sortable: true },
    { name: 'TARİH', selector: (row) => row.payment_date, sortable: true },
    { name: 'Son Ödeme Tarihi', selector: (row) => row.last_pay_date, sortable: true },
    { name: 'Açıklama', selector: (row) => row.Comments || '', sortable: true },
    {
      name: 'İşlem', selector: (row) => '', cell: (row) => <div>
        <span><button className='btn  btn-warning btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => updatePaymentShow(row)}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => deletePaymentShow(row)}><i className='fa fa-trash'></i></button></span>
      </div>,
      sortable: true
    },
  ];
  const [paymentList, setPaymentList] = useState<Array<CollectionList>>([]);

  const handleSearch = (e: any) => {
    const searchTerm = e.target.value;
    const filteredItems = paymentList.filter((item) =>
      (item.year).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_pay_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Comments.toLowerCase().includes(searchTerm.toLowerCase())
      // ||
      // item.Comments.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';

    const formattedData = filteredData.map((item) => ({
      'Yıl': item.year,
      'Dönem': +item.semester === 1 ? 'Güz' : (+item.semester === 2 ? 'Bahar' : 'Yaz'),
      'Harç Tipi': item.name,
      'Ödenen (USD)': api.paymetFormat(item.Payment_Dolar || ''),
      'Ödenen (TL)': api.paymetFormat(item.Payments),
      'TARİH': item.payment_date,
      'Son Ödeme Tarihi': item.last_pay_date,
      'Açıklama': item.Comments,
    }));


    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };


  const [filteredData, setFilteredData] = useState(paymentList);





  const columnsOdemeBilgileri: TableColumn<typeof paymentListOdemeBilgileri[0]>[] = [
    { name: 'Yıl', selector: (row) => row.year, sortable: true },
    { name: 'Dönem', selector: (row) => +row.semester === 1 ? 'Güz' : (+row.semester === 2 ? 'Bahar' : 'Yaz'), sortable: true },
    { name: 'Ödeme Türü', selector: (row) => row.name_tr, sortable: true },
    { name: 'Borç Miktarı (USD)', selector: (row) => api.paymetFormat(row.Amount_Dolar) || '', sortable: true },
    { name: 'Ödenen (USD)', selector: (row) => api.paymetFormat(row.dolar_payment) || '', sortable: true },
    { name: 'Kalan Bakiye (USD)', selector: (row) => api.paymetFormat(row.kalan_USD) || '', sortable: true },
    { name: 'Borç Miktarı (TL)', selector: (row) => api.paymetFormat(row.Amount) || '', sortable: true },
    { name: 'Ödenen (TL)', selector: (row) => api.paymetFormat(row.Payments) || '', sortable: true },
    { name: 'Kalan Bakiye (TL)', selector: (row) => api.paymetFormat(row.kalan) || '', sortable: true },
    { name: 'TARİH', selector: (row) => row.create_date, sortable: true },
    { name: 'Açıklama', selector: (row) => row.Comments || '', sortable: true },
    {
      name: 'İşlem', selector: (row) => '', cell: (row) => <div>
        <span><button className='btn  btn-warning btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => updateShow(row)}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{ padding: "3px 9px", margin: "0px 1px" }} onClick={() => deleteShow(row)}><i className='fa fa-trash'></i></button></span>
      </div>,
      sortable: true
    },
  ];



  const updateShow = (row: PaymentList) => {
    setSelectedYear(yearList.find((x) => +x.value === +row.year) ?? null);
    setSelectedFeeTypes(feetypes.find((x) => +x.value === +row.fee_id) ?? null);
    setSelectedScholarship(sssList.find((x) => +x.value === +row.fee_id) ?? null);
    setFormData({
      comment: row.Comments,
      create_date: row.create_date,
      debt_amount: row.Amount,
      debt_amount_dolar: row.Amount_Dolar,
      dept_amount_day_date: row.dept_amount_day_date,
      fee_type_id: row.fee_id,
      last_pay_date: row.last_pay_date,
      money: row.money,
      move: row.move,
      old_dept_amount: row.old_dept_amount,
      partial: row.partial,
      payments: row.payments,
      return1: row.return1,
      return_date: row.return_date,
      sadece_proje: row.sadece_proje,
      sadece_staj: row.sadece_staj,
      scholarship_amount: row.scholarship_amount,
      scholarship_code: row.scholarship_code,
      semester: row.semester,
      stu_id: row.stu_id,
      tek_ders: row.tek_ders,
      year: row.year,
      d: row.dept,
      f: row.faculty
    });
    handleShow();
  }

  const deleteShow = (row: PaymentList) => {
    setSelectedYear(yearList.find((x) => +x.value === +row.year) ?? null);
    setSelectedFeeTypes(feetypes.find((x) => +x.value === +row.fee_id) ?? null);
    setSelectedScholarship(sssList.find((x) => +x.value === +row.fee_id) ?? null);
    setFormData({
      comment: row.Comments,
      create_date: row.create_date,
      debt_amount: row.Amount,
      debt_amount_dolar: row.Amount_Dolar,
      dept_amount_day_date: row.dept_amount_day_date,
      fee_type_id: row.fee_id,
      last_pay_date: row.last_pay_date,
      money: row.money,
      move: row.move,
      old_dept_amount: row.old_dept_amount,
      partial: row.partial,
      payments: row.payments,
      return1: row.return1,
      return_date: row.return_date,
      sadece_proje: row.sadece_proje,
      sadece_staj: row.sadece_staj,
      scholarship_amount: row.scholarship_amount,
      scholarship_code: row.scholarship_code,
      semester: row.semester,
      stu_id: row.stu_id,
      tek_ders: row.tek_ders,
      year: row.year,
      d: row.dept,
      f: row.faculty
    });
    handleDeleteShow();
  }

  const createPaymentShow = () => {
    setSelectedYear(null);
    setSelectedFeeTypes(null);
    setSelectedBanks(null);
    setFormDataPayment({
      stu_id: '',
      year: '',
      semester: '',
      fee_type_id: '',
      dekont_no: '',
      process_type: '',
      payment_date: '',
      payment: '',
      payment_dolar: '',
      bank_code: '',
      create_date: '',
      explanation: '',
      rate: '',
      money: '',
      actionType: 'insert'
    });
    handlePaymentShow();
  }


  const updatePaymentShow = (row: CollectionList) => {
    setSelectedYear(yearList.find((x) => +x.value === +row.year) ?? null);
    setSelectedFeeTypes(feetypes.find((x) => +x.value === +row.fee_type) ?? null);
    setSelectedBanks(banks.find((x) => +x.value === +row.bank_code) ?? null);
    setFormDataPayment({
      stu_id: row.stu_id,
      year: row.year,
      semester: row.semester,
      fee_type_id: row.fee_type,
      dekont_no: row.dekont_no,
      process_type: row.process_type + '',
      payment_date: row.payment_date_org,
      payment: row.payment,
      payment_dolar: (row.payment_dolar === null ? '0' : row.payment_dolar) + '',
      bank_code: row.bank_code,
      create_date: row.up_date,
      explanation: row.explanation,
      rate: row.rate,
      money: row.money,
      actionType: 'update'
    });
    handlePaymentShow();
  }

  const deletePaymentShow = (row: CollectionList) => {
    setSelectedYear(yearList.find((x) => +x.value === +row.year) ?? null);
    setSelectedFeeTypes(feetypes.find((x) => +x.value === +row.fee_type) ?? null);
    setSelectedBanks(banks.find((x) => +x.value === +row.bank_code) ?? null);
    setFormDataPayment({
      stu_id: row.stu_id,
      year: row.year,
      semester: row.semester,
      fee_type_id: row.fee_type,
      dekont_no: row.dekont_no,
      process_type: row.process_type + '',
      payment_date: row.payment_date,
      payment: row.payment,
      payment_dolar: row.payment_dolar + '',
      bank_code: row.bank_code,
      create_date: row.create_date,
      explanation: row.explanation,
      rate: row.rate,
      money: row.money,
      actionType: 'delete'
    });
    handleDeletePaymentShow();
  }


  const [paymentListOdemeBilgileri, setPaymentListOdemeBilgileri] = useState<Array<PaymentList>>([]);

  const handleSearchOdemeBilgileri = (e: any) => {
    const searchTerm = e.target.value;
    const filteredItems = paymentListOdemeBilgileri.filter((item) =>
      (item.year).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Amount_Dolar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dolar_payment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kalan_USD.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Payments.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kalan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.create_date.toLowerCase().includes(searchTerm.toLowerCase())
      // ||
      // item.Comments.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setfilteredDataOdemeBilgileri(filteredItems);
  };

  const exportToExcelOdemeBilgileri = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';

    const formattedData = filteredDataOdemeBilgileri.map((item) => ({
      'Yıl': item.year,
      'Dönem': +item.semester === 1 ? 'Güz' : (+item.semester === 2 ? 'Bahar' : 'Yaz'),
      'Ödeme Türü': item.name_tr,
      'Borç Miktarı (USD)': api.paymetFormat(item.Amount_Dolar),
      'Ödenen (USD)': api.paymetFormat(item.dolar_payment),
      'Kalan Bakiye (USD)': api.paymetFormat(item.kalan_USD),
      'Borç Miktarı (TL)': api.paymetFormat(item.Amount),
      'Ödenen (TL)': api.paymetFormat(item.Payments),
      'Kalan Bakiye (TL)': api.paymetFormat(item.kalan),
      'TARİH': item.create_date,
      'Açıklama': item.Comments,
    }));


    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };


  const [filteredDataOdemeBilgileri, setfilteredDataOdemeBilgileri] = useState(paymentListOdemeBilgileri);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [deleteshow, setDeleteShow] = useState(false);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentClose = () => setShowPayment(false);
  const handlePaymentShow = () => setShowPayment(true);


  const [deleteshowPayment, setDeleteShowPayment] = useState(false);

  const handleDeletePaymentClose = () => setDeleteShowPayment(false);
  const handleDeletePaymentShow = () => setDeleteShowPayment(true);


  const [selectedYear, setSelectedYear] = React.useState<null | FacultyList>(null);
  const handleRegisterYear = (selected: any) => {
    setSelectedYear(selected);
    formDoldur("year", selected.value);
    formDoldurPayment("year", selected.value);
  };

  const [selectedBanks, setSelectedBanks] = React.useState<null | FacultyList>(null);
  const handleBanksChange = (selected: any) => {
    setSelectedBanks(selected);
    formDoldur("bank_code", selected.value);
    formDoldurPayment("bank_code", selected.value);
  };
  const [formData, setFormData] = useState<StudentFeesUpdateRequest>(
    {
      stu_id: "",
      year: "",
      semester: "",
      fee_type_id: "",
      tek_ders: "",
      sadece_staj: "",
      sadece_proje: "",
      f: "",
      d: "",
      scholarship_amount: "",
      scholarship_code: "",
      debt_amount_dolar: "",
      debt_amount: "",
      payments: "",
      return_date: "",
      create_date: "",
      dept_amount_day_date: "",
      comment: "",
      old_dept_amount: "",
      money: "",
      move: "",
      partial: "",
      last_pay_date: "",
      return1: "",
    }
  );

  const [formDataPayment, setFormDataPayment] = useState<StudentCollectionUpdateRequest>(
    {
      stu_id: "",
      year: "",
      semester: "",
      fee_type_id: "",
      dekont_no: "",
      process_type: "",
      payment_date: "",
      payment: "",
      payment_dolar: "",
      bank_code: "",
      create_date: "",
      explanation: "",
      rate: "",
      money: "",
      actionType: 'insert'
    }
  );
  const formDoldur = (key: any, value: any) => {
    setFormData(
      {
        stu_id: key === 'stu_id' ? value : formData.stu_id,
        year: key === 'year' ? value : formData.year,
        semester: key=== 'semester' ? value : formData.semester,
        fee_type_id: key === 'fee_type_id' ? value : formData.fee_type_id,
        tek_ders: key === 'tek_ders' ? (+formData.tek_ders === 1 ? 0 : 1) + '' : formData.tek_ders,
        sadece_staj: key === 'sadece_staj' ? (+formData.sadece_staj === 1 ? 0 : 1) + '' : formData.sadece_staj,
        sadece_proje: key=== 'sadece_proje' ? (+formData.sadece_proje === 1 ? 0 : 1) + '' : formData.sadece_proje,
        f: key === 'f' ? value : formData.f,
        d: key === 'd' ? value : formData.d,
        scholarship_amount: key === 'scholarship_amount' ? value : formData.scholarship_amount,
        scholarship_code: key === 'scholarship_code' ? value : formData.scholarship_code,
        debt_amount_dolar: key === 'debt_amount_dolar' ? value : formData.debt_amount_dolar,
        debt_amount: key === 'debt_amount' ? value : formData.debt_amount,
        payments: key=== 'payments' ? value : formData.payments,
        return_date: key === 'return_date' ? value : formData.return_date,
        create_date: key === 'create_date' ? value : formData.create_date,
        dept_amount_day_date: key === 'dept_amount_day_date' ? value : formData.dept_amount_day_date,
        comment: key === 'comment' ? value : formData.comment,
        old_dept_amount: key === 'old_dept_amount' ? value : formData.old_dept_amount,
        money: key === 'money' ? value : formData.money,
        move: key === 'move' ? value : formData.move,
        partial: key === 'partial' ? value : formData.partial,
        last_pay_date: key === 'last_pay_date' ? value : formData.last_pay_date,
        return1: key === 'last_pay_date' ? value : formData.return1,
      }
    );
  };


  const formDoldurPayment = (key: any, value: any) => {
    setFormDataPayment(
      {
        stu_id: key === 'stu_id' ? value : formDataPayment.stu_id,
        year: key === 'year' ? value : formDataPayment.year,
        semester: key === 'semester' ? value : formDataPayment.semester,
        fee_type_id: key === 'fee_type_id' ? value : formDataPayment.fee_type_id,
        dekont_no: key === 'dekont_no' ? value : formDataPayment.dekont_no,
        process_type: key === 'process_type' ? value : formDataPayment.process_type,
        payment_date: key === 'payment_date' ? value : formDataPayment.payment_date,
        payment: key === 'payment' ? value : formDataPayment.payment,
        payment_dolar: key === 'payment_dolar' ? value : formDataPayment.payment_dolar,
        bank_code: key === 'bank_code' ? value : formDataPayment.bank_code,
        create_date: key === 'create_date' ? value : formDataPayment.create_date,
        explanation: key === 'explanation' ? value : formDataPayment.explanation,
        rate: key === 'rate' ? value : formDataPayment.rate,
        money: key === 'money' ? value : formDataPayment.money,
        actionType: key === 'actionType' ? value : formDataPayment.actionType,
      }
    );
  };


  const [selectedFeeTypes, setSelectedFeeTypes] = React.useState<null | FacultyList>(null);
  const handleFeeTypesChange = (selected: any) => {
    setSelectedFeeTypes(selected);
    formDoldur("fee_type_id", selected.value);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    formDoldur(name, value)
    // setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (e: any) => {
    const { name, value } = e.target;
    formDoldurPayment(name, value)
    // setFormData({ ...formData, [name]: value });
  };

  const [selectedScholarship, setSelectedScholarship] = React.useState<null | FacultyList>(null);
  const handleScholarshipChange = (selected: any) => {
    setSelectedScholarship(selected);
    formDoldur("fee_status", selected.value);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setlistModalLoad(true);
    api.studentFeeUpdate(formData).then((x) => {
      setlistModalLoad(false);
      if (+x.status === 200) {
        enqueueSnackbar('Güncelleme işlemi başarılı bir şekilde gerçekleşmiştir', { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
        handleClose();
      }
      else {
        enqueueSnackbar('Güncelleme işlemi sırasında hata oluştu.Oluşan Hata:' + x.data, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
      }
    }).catch(err => catchFunc(err,enqueueSnackbar))
  };


  const handlePaymentSubmit = (e: any) => {
    e.preventDefault();
    let cu = 'Güncelleme';
    if (formDataPayment.actionType === 'insert') {
      cu = 'Ekleme';
    }

    setlistModalLoad(true);
    api.studentPaymentUpdate(formDataPayment).then((x) => {
      setlistModalLoad(false);
      if (+x.status === 200) {
        enqueueSnackbar(cu + ' işlemi başarılı bir şekilde gerçekleşmiştir', { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
        handlePaymentClose();
      }
      else {
        enqueueSnackbar(cu + ' işlemi sırasında hata oluştu.Oluşan Hata:' + x.data, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
      }
    }).catch(err => catchFunc(err,enqueueSnackbar))

  };


  const { enqueueSnackbar } = useSnackbar();


  const handleDeleteSubmit = (e: any) => {
    e.preventDefault();
    api.studentFeeDelete(formData).then((x) => {
      setlistModalLoad(false);
      if (+x.status === 200) {
        enqueueSnackbar(x.data, { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
        handlePaymentClose();
      }
      else {
        enqueueSnackbar(x.data, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
      }
    }).catch(err => catchFunc(err,enqueueSnackbar))
  };

  const handleDeletePaymentSubmit = (e: any) => {
    e.preventDefault();
    api.studentPaymentDelete(formDataPayment).then((x) => {
      setlistModalLoad(false);
      if (+x.status === 200) {
        enqueueSnackbar(x.data, { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
        handlePaymentClose();
      }
      else {
        enqueueSnackbar(x.data, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
      }
    }).catch(err => catchFunc(err,enqueueSnackbar))
  };

  // const [open, setOpen] = React.useState(false);
  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  return (
    <>
      <Routes>
        <Route
          element={
            <>
              <StudentInfoHeader
                id={studentInfo.id}
                name={studentInfo.name}
                surname={studentInfo.surname}
                class={studentInfo.class}
                anadal_fakulte={studentInfo.anadal_fakulte}
                anadal_bolum={studentInfo.anadal_bolum}
                anadal_opsiyon={studentInfo.anadal_opsiyon}
                email={studentInfo.email}
                telefon={studentInfo.telefon}
                cap_fakulte={studentInfo.cap_fakulte}
                cap_bolum={studentInfo.cap_bolum}
                cap_opsiyon={studentInfo.cap_opsiyon}
                yandal_fakulte={studentInfo.yandal_fakulte}
                yandal_bolum={studentInfo.yandal_bolum}
                yandal_opsiyon={studentInfo.yandal_opsiyon}
                durum={studentInfo.durum}
                durum_tarihi={studentInfo.durum_tarihi}
                burs_durumu={studentInfo.burs_durumu}
                burs_tipi={studentInfo.burs_tipi}
                alinan_ders={studentInfo.alinan_ders}
                image={studentInfo.image}
                page={'student-payments'}
                listLoad={listLoad}
              />
              <Outlet />
            </>
          }
        >
          <Route
            path='payments'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Ödeme Bilgileri</PageTitle>
                <div className='card mb-5 mb-xl-10'>
                  {listPyLoad ? <Loading /> : ''}
                  <div className='card-header pt-9 pb-0'>
                    <h4>Ödeme Bilgileri</h4>
                  </div>
                  <div className='card-body pt-9 pb-0'>
                    {paymentList.length ?
                      <>
                        <button style={{ float: "left" }} className='btn btn-sm btn-primary' onClick={exportToExcelOdemeBilgileri}>Export to Excel</button>

                        <input style={{ float: "right" }}
                          type="text"
                          placeholder="Arama Yap"
                          onChange={handleSearchOdemeBilgileri}
                        />
                      </> : ''}
                    <DataTable
                      columns={columnsOdemeBilgileri}
                      data={filteredDataOdemeBilgileri}
                      noDataComponent={'Kayıt bulunamadı'}
                      pagination // If you want to enable pagination
                      keyField="ogrno"
                    />
                  </div>
                </div>


              </>
            }
          />


          <Route
            path='collection-payments'
            element={
              <>
                <PageTitle breadcrumbs={accountBreadCrumbs}>Tahsilat Ödemeleri</PageTitle>

                <div className='card mb-5 mb-xl-10'>
                {listPyLoad ? <Loading /> : ''}
                  <div className='card-header pt-9 pb-0'>
                    <h4> Tahsilat Bilgileri</h4>
                    <span><button className='btn btn-sm btn-primary' onClick={createPaymentShow}>Tahsilat Ekle</button></span>
                  </div>
                  <div className='card-body pt-9 pb-0'>
                    {paymentList.length ?
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
                </div>

              </>
            }
          />


          <Route index element={<Navigate to='/student-payments/payments' />} />
        </Route>
      </Routes>
      <Modal show={show} onHide={handleClose} size='xl'>
        {listModalLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>{(selectedYear !== null ? selectedYear.label : '') + (+formData.semester === 1 ? ' Güz' : (+formData.semester === 2 ? ' Bahar' : ' Yaz')) + ' dönemi "' + (selectedFeeTypes !== null ? selectedFeeTypes.label : '') + '" Bilgilerini Güncelleme'}</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <div className="card mb-5 mb-xl-10">

            <div className="card-body pt-9 pb-0">

              <Modal.Body>

                <div className='row'>


                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Yıl</span>
                    </label>

                    <Select
                      value={selectedYear}
                      onChange={handleRegisterYear}
                      options={yearList}
                      isSearchable={true}
                      placeholder="yılı seçiniz"
                      isDisabled
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
                        disabled
                      >
                        <option value='1'>Güz</option>
                        <option value='2'>Bahar</option>
                        <option value='3'>Yaz</option>
                      </select>
                    </div>
                  </div>


                  <div className='col-md-6'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Ödeme Türü</span>
                    </label>

                    <Select
                      value={selectedFeeTypes}
                      onChange={handleFeeTypesChange}
                      options={feetypes}
                      isSearchable={true}
                      placeholder="Ücret Tipi seçiniz"
                      isDisabled
                    />
                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Burs Miktarı</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="scholarship_amount"
                      value={formData.scholarship_amount}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Burs kodu</span>
                    </label>

                    <Select
                      value={selectedScholarship}
                      onChange={handleScholarshipChange}
                      options={sssList}
                      isSearchable={true}
                      placeholder="burs indirim tipini seçiniz"
                      isDisabled
                    />
                  </div>


                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Borç Miktarı (USD)</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="debt_amount_dolar"
                      value={formData.debt_amount_dolar}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Borç Miktarı (TL)</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="debt_amount"
                      value={formData.debt_amount}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Aktarılan Bakiye</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="move"
                      value={formData.move}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Ödenen (TL)</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="payments"
                      value={formData.payments}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>İade</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="return1"
                      value={formData.return1}
                      disabled
                    />

                  </div>
                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>İade Tarihi</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="return_date"
                      value={formData.return_date}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>TARİH</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="create_date"
                      value={formData.create_date}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Borç Tarihi</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="dept_amount_day_date"
                      value={formData.dept_amount_day_date}
                      disabled
                    />

                  </div>




                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>USD Payment</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="old_dept_amount"
                      value={formData.old_dept_amount}
                      disabled
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>Para</label>
                    <div className='col-lg-12 fv-row'>
                      <select
                        className='form-select'
                        onChange={handleChange}
                        name="money"
                        value={formData.money}
                        disabled
                      >
                        <option value='0'></option>
                        <option value='1'>TL</option>
                        <option value='2'>USD</option>

                      </select>
                    </div>
                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>Taksit Yapıldı</label>
                    <div className='col-lg-12 fv-row'>
                      <select
                        className='form-select'
                        onChange={handleChange}
                        name="partial"
                        value={formData.partial}
                        disabled
                      >
                        <option value='0'>Tam Ödeme</option>
                        <option value='1'>Taksit Yapıldı</option>

                      </select>
                    </div>
                  </div>


                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Son Ödeme Tarihi</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handleChange}
                      name="last_pay_date"
                      value={formData.last_pay_date}
                      disabled
                    />

                  </div>


                  <div className='col-md-12'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Açıklama</span>
                    </label>
                    <textarea className='form-control' onChange={handleChange} name="comment"
                      value={formData.comment} disabled>{formData.comment}</textarea>

                  </div>

                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >TEK DERS ÜCRETİ ÖDEDİ</span>
                    </label>

                    <Switch
                      checked={+formData.tek_ders === 0 ? false : true}
                      onChange={handleChange}
                      name="tek_ders"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

                  </div>

                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >SADECE STAJI KALDI</span>
                    </label>

                    <Switch
                      checked={+formData.sadece_staj === 0 ? false : true}
                      onChange={handleChange}
                      name="sadece_staj"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

                  </div>

                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >SADECE DÖNEM PROJESİ KALDI</span>
                    </label>

                    <Switch
                      checked={+formData.sadece_proje === 0 ? false : true}
                      onChange={handleChange}
                      name="sadece_proje"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

                  </div>


                  {/* 
            <div className='col-md-4'>
              <label className='col-form-label fw-bold fs-6'>
                <span >Bankalar</span>
              </label>

              <Select
                value={selectedBanks}
                onChange={handleBanksChange}
                options={banks}
                isSearchable={true}
                placeholder="Banka seçiniz"
              />
            </div> */}





                </div>


              </Modal.Body>

            </div>


          </div>
          <Modal.Footer>
            <a className='btn btn-secondary btn-xs' onClick={handleClose}>
              Kapat
            </a>
            <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
              Kaydet
            </button>
          </Modal.Footer>
        </form>

      </Modal>

      <Modal show={deleteshow} onHide={handleDeleteClose} >
      {listModalLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>{(selectedYear !== null ? selectedYear.label : '') + (+formData.semester === 1 ? ' Güz' : (+formData.semester === 2 ? ' Bahar' : ' Yaz')) + ' dönemi "' + (selectedFeeTypes !== null ? selectedFeeTypes.label : '') + '" Bilgilerini Silme'}</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleDeleteSubmit}>
          <div className="card mb-5 mb-xl-10">

            <div className="card-body pt-9 pb-0">

              <Modal.Body>

                <div className='row'>
                  Silmek istediğinize emin misiniz?
                </div>


              </Modal.Body>

            </div>


          </div>
          <Modal.Footer>
            <a className='btn btn-secondary btn-xs' onClick={handleDeleteClose}>
              Kapat
            </a>
            <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
              Sil
            </button>
          </Modal.Footer>
        </form>

      </Modal>



      <Modal show={showPayment} onHide={handlePaymentClose} size='xl'>
      {listModalLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>{(selectedYear !== null ? selectedYear.label : '') + (+formDataPayment.semester === 1 ? ' Güz' : (+formDataPayment.semester === 2 ? ' Bahar' : ' Yaz')) + ' dönemi "' + (selectedFeeTypes !== null ? selectedFeeTypes.label : '') + '" Bilgilerini ' + (formDataPayment.actionType === 'insert' ? 'Ekleme' : 'Güncelleme')}</Modal.Title>
        </Modal.Header>

        <form onSubmit={handlePaymentSubmit}>
          <div className="card mb-5 mb-xl-10">

            <div className="card-body pt-9 pb-0">

              <Modal.Body>

                <div className='row'>


                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Yıl</span>
                    </label>

                    <Select
                      value={selectedYear}
                      onChange={handleRegisterYear}
                      options={yearList}
                      isSearchable={true}
                      placeholder="yılı seçiniz"
                      name='year'
                    />
                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>Dönem</label>
                    <div className='col-lg-12 fv-row'>
                      <select
                        className='form-select'
                        onChange={handlePaymentChange}
                        name="semester"
                        value={formDataPayment.semester}
                      >
                        <option value='1'>Güz</option>
                        <option value='2'>Bahar</option>
                        <option value='3'>Yaz</option>
                      </select>
                    </div>
                  </div>


                  <div className='col-md-6'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Ödeme Tipi</span>
                    </label>

                    <Select
                      value={selectedFeeTypes}
                      onChange={handleFeeTypesChange}
                      options={feetypes}
                      isSearchable={true}
                      placeholder="Ödeme Tipi seçiniz"
                    />
                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Ödeme Tarihi</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handlePaymentChange}
                      name="payment_date"
                      value={formDataPayment.payment_date}
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Ödenen (TL)</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handlePaymentChange}
                      name="payment"
                      value={formDataPayment.payment}
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Ödenen USD</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handlePaymentChange}
                      name="payment_dolar"
                      value={formDataPayment.payment_dolar}
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Dekont No</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handlePaymentChange}
                      name="dekont_no"
                      value={formDataPayment.dekont_no}
                    />

                  </div>


                  <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span >Banka</span>
                    </label>

                    <Select
                      value={selectedBanks}
                      onChange={handleBanksChange}
                      options={banks}
                      isSearchable={true}
                      placeholder="Banka seçiniz"
                      name="bank_code"
                    />
                  </div>


                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Güncelleme Tarihi</span>
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handlePaymentChange}
                      name="create_date"
                      value={formDataPayment.create_date}
                    />

                  </div>

                  <div className='col-md-3'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Dolar Kuru</span>
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      data-kt-search-element='input'
                      onChange={handlePaymentChange}
                      name="rate"
                      value={formDataPayment.rate}
                    />

                  </div>

                  <div className='col-md-2'>
                    <label className='col-form-label fw-bold fs-6'>Cinsi</label>
                    <div className='col-lg-12 fv-row'>
                      <select
                        className='form-select'
                        onChange={handlePaymentChange}
                        name="money"
                        value={formDataPayment.money}
                      >
                        <option value='0'></option>
                        <option value='1'>TL</option>
                        <option value='2'>USD</option>

                      </select>
                    </div>
                  </div>


                  <div className='col-md-12'>
                    <label className='col-form-label fw-bold fs-6'>
                      <span>Açıklama</span>
                    </label>
                    <textarea className='form-control' onChange={handlePaymentChange} name="explanation"
                      value={formDataPayment.explanation} >{formDataPayment.explanation}</textarea>

                  </div>
                </div>


              </Modal.Body>

            </div>


          </div>
          <Modal.Footer>
            <a className='btn btn-secondary btn-xs' onClick={handlePaymentClose}>
              Kapat
            </a>
            <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
              Kaydet
            </button>
          </Modal.Footer>
        </form>

      </Modal>

      <Modal show={deleteshowPayment} onHide={handleDeletePaymentClose} >
      {listModalLoad?<Loading/>:''}
        <Modal.Header closeButton>
          <Modal.Title>{(selectedYear !== null ? selectedYear.label : '') + (+formDataPayment.semester === 1 ? ' Güz' : (+formDataPayment.semester === 2 ? ' Bahar' : ' Yaz')) + ' dönemi "' + (selectedFeeTypes !== null ? selectedFeeTypes.label : '') + '" Bilgilerini Silme'}</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleDeletePaymentSubmit}>
          <div className="card mb-5 mb-xl-10">
            <div className="card-body pt-9 pb-0">
              <Modal.Body>
                <div className='row'>
                  Silmek istediğinize emin misiniz?
                </div>
              </Modal.Body>
            </div>
          </div>
          <Modal.Footer>
            <a className='btn btn-secondary btn-xs' onClick={handleDeletePaymentClose}>
              Kapat
            </a>
            <button type='submit' className='btn btn-primary' style={{ height: "43px" }}>
              Sil
            </button>
          </Modal.Footer>
        </form>

      </Modal>



    </>

  )
}

function StudentPayments() {
  return (
    <SnackbarProvider maxSnack={3}>
      <StudentPaymentsSnack />
    </SnackbarProvider>
  );
}


export default StudentPayments;






