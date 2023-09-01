import React, { FC, KeyboardEvent, useEffect, useRef, useState, Component } from 'react'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import axios from "axios";
import { InstallmentLists,InstallmentListsRequest,InstallmentListsResponse} from './models/_installment.model'
import '../style.css';
import Select from 'react-select';
import DataTable, { TableColumn } from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { writeXLSX, readFile, utils } from 'xlsx';
import { FacultyList } from '../../services/models/_faculty';
import api from '../../services/services';
// import 'react-data-table-component/dist/data-table.css';

const Installment: React.FC = () => {
 
  const [isApi, setIsApi] = useState(true);
  const [bankCardList, setbankCardList] = useState<Array<FacultyList>>([]);
  const [creditCardList, setcreditCardList] = useState<Array<FacultyList>>([]);
  useEffect(() => {
    if(isApi)
    {
      api.bankCards().then((x)=>{
        setbankCardList(x);
        setIsApi(false);
      })

    }
  }
  );

 
  const [selectedbankCardList, setselectedbankCardList] = React.useState({value:'',label:''});
  const handlebankCardList = (selected: any) => {
    setselectedbankCardList(selected);
    formDoldur("bank",selected.value);
    api.creditCard({bank:selected.value}).then((x)=>{
      setcreditCardList(x);
    })
  };

  const [selectedcreditCardList, setselectedcreditCardList] = React.useState({value:'',label:''});
  const handlecreditCardList = (selected: any) => {
    setselectedcreditCardList(selected);
    formDoldur("credit_card",selected.value);
  };


  const formDoldur = (key: any,value:any) => {
    setFormData(
      {
        bank: key=='bank'?value:formData.bank,
        credit_card: key=='credit_card'?value:formData.credit_card,
      }
    );
  };
  const handleOranGir=(e:any,row:any,column:string)=>{
    e.preventDefault();
    // console.log(e);
    const list=definitiverecordlist;
    const kolonBul=list.findIndex(x=>x.id===row.id && x.taksit_no===row.taksit_no);
    if(column=='faiz')
    list[kolonBul].faiz=e.target.value;
    if(column=='min_payment')
    list[kolonBul].min_payment=e.target.value;
    if(column=='taksit_sayisi')
    list[kolonBul].taksit_sayisi=e.target.value;
    if(column=='plus_sayisi')
    list[kolonBul].plus_sayisi=e.target.value;

    axios.post<InstallmentListsResponse>('http://api-oasis.localhost/maliisler/maliisler/installment-update',{
        id:row.id,
        taksit_no:row.taksit_no,
        column:column,
        value:e.target.value
        }).then((res)=>{
            // setLoading(false);
            if(res.status===200)
            {
                handleSubmit(e);
                setIsApi(false);
            }
          console.log();
        }).catch(err=>{
          setIsApi(false);
        })
        
      
  }

  const columns: TableColumn<typeof definitiverecordlist[0]>[] = [
    { name: 'Taksit #', selector: (row) => +row.taksit_no==0?'Tek Çekim':row.taksit_no+' Taksit', sortable: true },
    { name: 'Faiz Oranı %', selector: (row) => api.paymetFormat(row.faiz)||'' , sortable: true ,cell:(row)=><input name="faiz" onChange={(e)=>handleOranGir(e,row,'faiz')} value={row.faiz}/>},
    { name: 'Taban Fiyat', selector: (row) => api.paymetFormat(row.min_payment)||'', sortable: true ,cell:(row)=><input name="min_payment" onChange={(e)=>handleOranGir(e,row,'min_payment')} value={row.min_payment} />},
    { name: 'Taksit Sayısı', selector: (row) => row.taksit_sayisi, sortable: true ,cell:(row)=><input name="taksit_sayisi" onChange={(e)=>handleOranGir(e,row,'taksit_sayisi')} value={row.taksit_sayisi} />},
    { name: 'Bonus Taksit Sayısı', selector: (row) => row.plus_sayisi, sortable: true ,cell:(row)=><input name="plus_sayisi" onChange={(e)=>handleOranGir(e,row,'plus_sayisi')} value={row.plus_sayisi}/>},
  ];
  const [definitiverecordlist, setDefinitiverecordlist] = useState<Array<InstallmentLists>>([]);

  const [formData, setFormData] = useState<InstallmentListsRequest>(
    {
      bank:'',
      credit_card:''
    }
  );

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
      axios.post<InstallmentListsResponse>('http://api-oasis.localhost/maliisler/maliisler/installment',formData).then((res)=>{
              // setLoading(false);
              if(res.status===200)
              {
                setDefinitiverecordlist(res.data.data);
                setFilteredData(res.data.data);
              }
          }).catch(err=>{
          })  
  };

  const [filteredData, setFilteredData] = useState(definitiverecordlist);
  const handleSearch = (e:any) => {
    const searchTerm = e.target.value;
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
      'Taksit #': +item.taksit_no==0?'Tek Çekim':item.taksit_no+' Taksit',
      'Faiz Oranı %':api.paymetFormat(item.faiz) ,
      'Taban Fiyat': api.paymetFormat(item.min_payment),
      'Taksit Sayısı': item.taksit_sayisi,
      'Bonus Taksit Sayısı': item.plus_sayisi,
    }));
    const ws = utils .json_to_sheet(formattedData);
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

      <div className='card mb-5 mb-xl-10'>
        <div className='card-header pt-9 pb-0'>
          <h4>{selectedbankCardList.label+' - '+selectedcreditCardList.label}</h4>
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
            keyField="ogrno"
          />
        </div>
      </div>
    </>
  )
}

export default Installment






