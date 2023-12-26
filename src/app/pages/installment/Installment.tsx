import React, { useEffect,useState} from 'react'
import { InstallmentCURequest, InstallmentLists, InstallmentListsRequest } from './models/_installment.model'
import '../style.css';
import Select from 'react-select';
import { saveAs } from 'file-saver';
import { writeXLSX,utils } from 'xlsx';
import { FacultyList } from '../../services/models/_faculty';
import api from '../../services/services';
// import 'react-data-table-component/dist/data-table.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Loading from '../Loading';
const catchFunc = (err: any,enqueueSnackbar:any) => {
  if (err.response && err.response.data && err.response.data.message) {
    enqueueSnackbar(err.response.data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
    if (err.response.data.message === 'Expired token') {
      localStorage.clear();
      window.location.href = '/auth';
      // navigate('/auth');
    }
  }
}

const InstallmentSnack: React.FC = () => {

  const [bankCardList, setbankCardList] = useState<Array<FacultyList>>([]);
  const [creditCardList, setcreditCardList] = useState<Array<FacultyList>>([]);
  const [listLoad, setlistLoad] = useState(false);
  const [tableisActive, settableisActive] = useState(false);
  const [cardDisabled, setcardDisabled] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    api.bankCards().then((x) => {
      setbankCardList(x);
    }).catch(err => catchFunc(err,enqueueSnackbar))
  }, [enqueueSnackbar]);


  const [selectedbankCardList, setselectedbankCardList] = React.useState({ value: '', label: '' });
  const handlebankCardList = (selected: any) => {
    setselectedbankCardList(selected);
    formDoldur("bank", selected.value);
    api.creditCard({ bank: selected.value }).then((x) => {
      setcreditCardList(x);
      setcardDisabled(false)
      setselectedcreditCardList({ value: '', label: '' })
      settableisActive(false);
    }).catch(err => catchFunc(err,enqueueSnackbar))
  };

  const [selectedcreditCardList, setselectedcreditCardList] = React.useState({ value: '', label: '' });
  const handlecreditCardList = (selected: any) => {
    setselectedcreditCardList(selected);
    formDoldur("credit_card", selected.value);
  };


  const formDoldur = (key: any, value: any) => {
    setFormData(
      {
        bank: key === 'bank' ? value : formData.bank,
        credit_card: key === 'credit_card' ? value : formData.credit_card,
      }
    );
  };


  
  const [definitiverecordlist, setDefinitiverecordlist] = useState<Array<InstallmentLists>>([]);

  const [formData, setFormData] = useState<InstallmentListsRequest>(
    {
      bank: '',
      credit_card: ''
    }
  );

  const [formDataCU, setFormDataCU] = useState<InstallmentCURequest>({
    faiz_0: '',
  min_payment_0: '',
  taksit_sayisi_0: '',
  plus_sayisi_0: '',
  faiz_2: '',
  min_payment_2: '',
  taksit_sayisi_2: '',
  plus_sayisi_2: '',
  faiz_3: '',
  min_payment_3: '',
  taksit_sayisi_3: '',
  plus_sayisi_3: '',
  faiz_4: '',
  min_payment_4: '',
  taksit_sayisi_4: '',
  plus_sayisi_4: '',
  faiz_5: '',
  min_payment_5: '',
  taksit_sayisi_5: '',
  plus_sayisi_5: '',
  faiz_6: '',
  min_payment_6: '',
  taksit_sayisi_6: '',
  plus_sayisi_6: '',
  faiz_7: '',
  min_payment_7: '',
  taksit_sayisi_7: '',
  plus_sayisi_7: '',
  faiz_8: '',
  min_payment_8: '',
  taksit_sayisi_8: '',
  plus_sayisi_8: '',
  faiz_9: '',
  min_payment_9: '',
  taksit_sayisi_9: '',
  plus_sayisi_9: '',
  faiz_10: '',
  min_payment_10: '',
  taksit_sayisi_10: '',
  plus_sayisi_10: '',
  faiz_11: '',
  min_payment_11: '',
  taksit_sayisi_11: '',
  plus_sayisi_11: '',
  faiz_12: '',
  min_payment_12: '',
  taksit_sayisi_12: '',
  plus_sayisi_12: '',
  faiz_99: '',
  min_payment_99: '',
  taksit_sayisi_99: '',
  plus_sayisi_99: '',
  });



  const handleChangeCU = (e: any) => {
    const { name, value } = e.target;
    setFormDataCU({ ...formDataCU, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.bank === '' || selectedcreditCardList.value === '') {
      enqueueSnackbar("Banka ve Kred kartı alanları zorunlu alanlardır.Lütfen buraları seçiniz", { variant: 'warning', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
      return false;
    }
    settableisActive(true);
    setlistLoad(true);
    api.installment(formData).then((x) => {
      setlistLoad(false);
      setFilteredData(x);
      
      let updatedDataCU = { ...formDataCU };
      
      x.forEach(k => {
        updatedDataCU['id'] = k.id;
        updatedDataCU['faiz_'+ k.taksit_no as keyof typeof updatedDataCU] = k.faiz;
        updatedDataCU['min_payment_'+ k.taksit_no as keyof typeof updatedDataCU] = k.min_payment;
        updatedDataCU['taksit_sayisi_' + k.taksit_no as keyof typeof updatedDataCU] = k.taksit_sayisi;
        updatedDataCU['plus_sayisi_'+ k.taksit_no as keyof typeof updatedDataCU] = k.plus_sayisi;
      });
      
      setFormDataCU(updatedDataCU);
      console.log(updatedDataCU);
    }).catch(err => catchFunc(err,enqueueSnackbar));
  };


  const handleUpdateSubmit=(e:any)=>{
    e.preventDefault();
    setlistLoad(true);
    api.installmentUpdate(formDataCU).then((x) => {
      setlistLoad(false);
      setFilteredData(x);
    }).catch(err => catchFunc(err,enqueueSnackbar));
  }

  const [filteredData, setFilteredData] = useState(definitiverecordlist);
  // const handleSearch = (e: any) => {
  //   const searchTerm = e.target.value;
  //   const filteredItems = definitiverecordlist
  //   // .filter((item) =>
  //   //   (item.name+' '+item.surname).toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   item.ogrno.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   +item.id_no== +searchTerm ||
  //   //   item.name_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   item.scholarship.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   item.status_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   item.regtype.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   item.sexx.toLowerCase().includes(searchTerm.toLowerCase())
  //   // );
  //   setFilteredData(filteredItems);
  // };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'data_table_export';

    const formattedData = filteredData.map((item) => ({
      'Taksit #': +item.taksit_no === 0 ? 'Tek Çekim' : item.taksit_no + ' Taksit',
      'Faiz Oranı %': api.paymetFormat(item.faiz),
      'Taban Fiyat': api.paymetFormat(item.min_payment),
      'Taksit Sayısı': item.taksit_sayisi,
      'Bonus Taksit Sayısı': item.plus_sayisi,
    }));
    const ws = utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = writeXLSX(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

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
                  <span >Banka</span>
                </label>
                <Select
                  value={selectedbankCardList}
                  onChange={handlebankCardList}
                  options={bankCardList}
                  isSearchable={true}
                  placeholder="Banka Seçiniz"
                />
              </div>
              <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                  <span >Kredi Kartı</span>
                </label>
                <Select
                  value={selectedcreditCardList}
                  onChange={handlecreditCardList}
                  options={creditCardList}
                  isSearchable={true}
                  placeholder="Kredi Kartını Seçiniz"
                  isDisabled={cardDisabled}
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
          <h4>{selectedbankCardList.label + ' - ' + selectedcreditCardList.label}</h4>
        </div>
        
        <form onSubmit={handleUpdateSubmit}>
        <div className='card-body pt-9 pb-0'>

          <div className='row'>
            {filteredData.length ?
              <>
                <div className='col-md-12'>
                  <button style={{ float: "left" }} className='btn btn-sm btn-primary' onClick={exportToExcel}>Export to Excel</button>

                
                </div></> : ''}

          
            <div className='col-md-12' style={{marginTop: "12px"}}>
              <table className='table table-responsive'>
                <thead>
                <tr>
                  <th>Taksit#</th>
                  <th>Faiz Oranı %</th>
                  <th>Taban Fiyat</th>
                  <th>Taksit Sayısı</th>
                  <th>Bonus Taksit Sayısı</th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td>Tek Çekim</td>
                    <td><input className='form-control' name="faiz_0" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_0} /></td>
                    <td><input className='form-control' name="min_payment_0" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_0} /></td>
                    <td><input className='form-control' name="taksit_sayisi_0" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_0} /></td>
                    <td><input className='form-control' name="plus_sayisi_0" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_0} /></td>
                  </tr>
                  
                  <tr>
                    <td>2. Taksit</td>
                    <td><input className='form-control' name="faiz_2" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_2} /></td>
                    <td><input className='form-control' name="min_payment_2" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_2} /></td>
                    <td><input className='form-control' name="taksit_sayisi_2" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_2} /></td>
                    <td><input className='form-control' name="plus_sayisi_2" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_2} /></td>
                  </tr>
                  <tr>
                    <td>3. Taksit</td>
                    <td><input className='form-control' name="faiz_3" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_3} /></td>
                    <td><input className='form-control' name="min_payment_3" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_3} /></td>
                    <td><input className='form-control' name="taksit_sayisi_3" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_3} /></td>
                    <td><input className='form-control' name="plus_sayisi_3" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_3} /></td>
                  </tr>
                  <tr>
                    <td>4. Taksit</td>
                    <td><input className='form-control' name="faiz_4" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_4} /></td>
                    <td><input className='form-control' name="min_payment_4" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_4} /></td>
                    <td><input className='form-control' name="taksit_sayisi_4" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_4} /></td>
                    <td><input className='form-control' name="plus_sayisi_4" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_4} /></td>
                  </tr>
                  <tr>
                    <td>5. Taksit</td>
                    <td><input className='form-control' name="faiz_5" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_5} /></td>
                    <td><input className='form-control' name="min_payment_5" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_5} /></td>
                    <td><input className='form-control' name="taksit_sayisi_5" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_5} /></td>
                    <td><input className='form-control' name="plus_sayisi_5" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_5} /></td>
                  </tr>
                  <tr>
                    <td>6. Taksit</td>
                    <td><input className='form-control' name="faiz_6" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_6} /></td>
                    <td><input className='form-control' name="min_payment_6" onChange={(e) =>handleChangeCU(e)} value={formDataCU.min_payment_6} /></td>
                    <td><input className='form-control' name="taksit_sayisi_6" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_6} /></td>
                    <td><input className='form-control' name="plus_sayisi_6" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_6} /></td>
                  </tr>

                  <tr>
                    <td>7. Taksit</td>
                    <td><input className='form-control' name="faiz_7" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_7} /></td>
                    <td><input className='form-control' name="min_payment_7" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_7} /></td>
                    <td><input className='form-control' name="taksit_sayisi_7" onChange={(e) =>handleChangeCU(e)} value={formDataCU.taksit_sayisi_7} /></td>
                    <td><input className='form-control' name="plus_sayisi_7" onChange={(e) =>handleChangeCU(e)} value={formDataCU.plus_sayisi_7} /></td>
                  </tr>

                  <tr>
                    <td>8. Taksit</td>
                    <td><input className='form-control' name="faiz_8" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_8} /></td>
                    <td><input className='form-control' name="min_payment_8" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_8} /></td>
                    <td><input className='form-control' name="taksit_sayisi_8" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_8} /></td>
                    <td><input className='form-control' name="plus_sayisi_8" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_8} /></td>
                  </tr>
                  <tr>
                    <td>9. Taksit</td>
                    <td><input className='form-control' name="faiz_9" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_9} /></td>
                    <td><input className='form-control' name="min_payment_9" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_9} /></td>
                    <td><input className='form-control' name="taksit_sayisi_9" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_9} /></td>
                    <td><input className='form-control' name="plus_sayisi_9" onChange={(e) =>handleChangeCU(e)} value={formDataCU.plus_sayisi_9} /></td>
                  </tr>
                  <tr>
                    <td>10. Taksit</td>
                    <td><input className='form-control' name="faiz_10" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_10} /></td>
                    <td><input className='form-control' name="min_payment_10" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_10} /></td>
                    <td><input className='form-control' name="taksit_sayisi_10" onChange={(e) =>handleChangeCU(e)} value={formDataCU.taksit_sayisi_10} /></td>
                    <td><input className='form-control' name="plus_sayisi_10" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_10} /></td>
                  </tr>

                  <tr>
                    <td>11. Taksit</td>
                    <td><input className='form-control' name="faiz_11" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_11} /></td>
                    <td><input className='form-control' name="min_payment_11" onChange={(e) =>handleChangeCU(e)} value={formDataCU.min_payment_11} /></td>
                    <td><input className='form-control' name="taksit_sayisi_11" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_11} /></td>
                    <td><input className='form-control' name="plus_sayisi_11" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_11} /></td>
                  </tr>

                  <tr>
                    <td>12. Taksit</td>
                    <td><input className='form-control' name="faiz_12" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_12} /></td>
                    <td><input className='form-control' name="min_payment_12" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_12} /></td>
                    <td><input className='form-control' name="taksit_sayisi_12" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_12} /></td>
                    <td><input className='form-control' name="plus_sayisi_12" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_12} /></td>
                  </tr>
                  <tr>
                    <td>99. Taksit</td>
                    <td><input className='form-control' name="faiz_99" onChange={(e) => handleChangeCU(e)} value={formDataCU.faiz_99} /></td>
                    <td><input className='form-control' name="min_payment_99" onChange={(e) => handleChangeCU(e)} value={formDataCU.min_payment_99} /></td>
                    <td><input className='form-control' name="taksit_sayisi_99" onChange={(e) => handleChangeCU(e)} value={formDataCU.taksit_sayisi_99} /></td>
                    <td><input className='form-control' name="plus_sayisi_99" onChange={(e) => handleChangeCU(e)} value={formDataCU.plus_sayisi_99} /></td>
                  </tr>
                
                </tbody>


              </table>
             
              

            </div>
          </div>
        </div>
        <div className='card-footer d-flex justify-content-end mt-10'>
              <button type='submit' className='btn btn-primary'>
                Kaydet
              </button>
            </div>
            </form>
      </div> : ''}
    </>
  )
}


function Installment() {
  return (
    <SnackbarProvider maxSnack={3}>
      <InstallmentSnack />
    </SnackbarProvider>
  );
}
export default Installment




