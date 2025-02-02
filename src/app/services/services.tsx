import axios from 'axios';
import { FacultyListResponse } from './models/_faculty';
import { DepartmentListResponse } from './models/_department';
import { StuStatusListResponse } from './models/_stuStatus';
import { RegisterTypeListResponse } from './models/_registerType';
import { ScholarshipStatusListResponse } from './models/_scholarshipStatus';
import { YearListResponse } from './models/_year';
import { FeeTypesResponse } from './models/_feetypes';
import { BanksResponse } from './models/_banks';
import { CreditCardResponse } from './models/_creditCard';
import { DeptVsPaidResponse, ReportResponse, TotalScholarshipListResponse } from '../pages/home/models/home.model';
import { DefinitiveRecordRequest, DefinitiveRecordResponse } from '../pages/definitive-records/models/_definitiverecords.model';
import { StudentListRequest, StudentListResponse } from '../pages/student-list/models/_studentlist.model';
import { StudentScholarshipNumbersRequest, StudentScholarshipNumbersResponse } from '../pages/number-of-student-scholarships/models/_studentscholarships';
import { SummerFeeRefundRequestsResponse } from '../pages/summer-fee-refund-requests/models/_summerfeerefund';
import { MahsupResponse } from '../pages/mahsup-list/models/_mahsup.model';
import { FeePaymentListRequest, FeePaymentListResponse } from '../pages/fee-payments-list/models/_feepaymentslist.model';
import { AllPayablesListRequest, AllPayablesListResponse } from '../pages/all-payables-list/models/_allpayableslist.model';
import { DebtCheckListsRequest, DebtCheckListsResponse } from '../pages/debt-check-list/models/_debtchecklist.model';
import { InstallmentCURequest, InstallmentListsRequest, InstallmentListsResponse } from '../pages/installment/models/_installment.model';
import { ParamFeesAppResponse, ParamFeesRed, ParamFeesResponse, ParamFeesUpdateResponse, ParamFeesx } from '../pages/param-student-fees/models/_paramfees';
import { StudentDetailResponseData } from '../pages/student-info/models/_studentdetail.model';
import { GeneralInformationResponseData } from '../pages/student-info/models/_generalinformation.model';
import { IdInformationResponseData } from '../pages/student-info/models/_idinformation.model';
import { ContactInformationResponseData } from '../pages/student-info/models/_contactimformation.model';
import { StudentTranskript } from '../pages/transkript/models/_studenttranskript.model';
import { CollectionsResponse, PaymentsResponse, StudentCollectionUpdateRequest, StudentFeesUpdateRequest, StudentFeesUpdateResponse } from '../pages/student-payments/models/_payments.model';
import { HistoryResponse, ScholarshipHistoryResponse } from '../pages/student-history/models/_history.model';
import { ResponseData } from '../modules/auth';
import { RelationMaliDetailResponse } from '../pages/relation-mali/models/_relationmali.model';
import { CariNameListResponse } from '../pages/cari-name-list/models/_carinamelistx.model';
import { KomisyonluResponse } from '../pages/yaz-okulu-komisyonlu-odeyen-list/models/_yaz-okulu-komisyonlu.model';
import { ParamFeesYlResponse, ParamFeesYlUpdateResponse, ParamFeesYlx } from '../pages/param-fees-yl/models/_paramfees';
import { ParamFeesDolarResponse, ParamFeesDolarUpdateResponse, ParamFeesDolarx } from '../pages/param-fees-dolar/models/_paramfees';
import { ParamFeesSummerResponse, ParamFeesSummerUpdateResponse, ParamFeesSummerx } from '../pages/param-fees-summer/models/_paramfees';
const API_URL = process.env.REACT_APP_API_URL
const headers={
    headers:{"Content-Type" : "application/json"},

}
const faculty=async ()=>{
    const url=API_URL+'/maliisler/faculty';
    const res= await axios.post<FacultyListResponse>(url);
    return res.data.data;
  }

const department=async (formData:any)=>{
    const url=API_URL+'/maliisler/department';
    const res= await axios.post<DepartmentListResponse>(url,formData);
    return res.data.data;
  }

const option=async (formData:any)=>{
    const url=API_URL+'/maliisler/option';
    const res= await axios.post<DepartmentListResponse>(url,formData);
    return res.data.data;
  }

const stuStatus=async ()=>{
    const url=API_URL+'/maliisler/stu-status';
    const res= await axios.post<StuStatusListResponse>(url);
    return res.data.data;
  }

const registerType=async ()=>{
    const url=API_URL+'/maliisler/register-type';
    const res= await axios.post<RegisterTypeListResponse>(url);
    return res.data.data;
  }

const scholarshipStatus=async ()=>{
    const url=API_URL+'/maliisler/scholarship-status';
    const res= await axios.post<ScholarshipStatusListResponse>(url);
    return res.data.data;
  }

  const historyScholarshipStatus=async ()=>{
    const url=API_URL+'/maliisler/history-scholarship-status';
    const res= await axios.post<ScholarshipStatusListResponse>(url);
    return res.data.data;
  }

 const year=async (x:number=0)=>{
    const url=API_URL+'/maliisler/register-year';
    const res= await axios.post<YearListResponse>(url,{isAll:x},headers);
    return res.data.data;
  }

  const banks=async ()=>{
    const url=API_URL+'/maliisler/banks';
    const res= await axios.post<BanksResponse>(url);
    return res.data.data;
  }

  const feeTypes=async ()=>{
    const url=API_URL+'/maliisler/fee-types';
    const res= await axios.post<FeeTypesResponse>(url);
    return res.data.data;
  }

  const bankCards=async ()=>{
    const url=API_URL+'/maliisler/bank-cards';
    const res= await axios.post<BanksResponse>(url);
    return res.data.data;
  }

  const creditCard=async (formData:any)=>{
    const url=API_URL+'/maliisler/credit-card';
    const res= await axios.post<CreditCardResponse>(url,formData);
    return res.data.data;
  }

  const paymetFormat=(number:string)=>{
    if(+number)
    {
      const formatla=new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(+number);
      // console.log((formatla.split(' €'))[0]);
      return (formatla.split(' €'))[0];
    }
    if(number!==null && number!=='' && number!==undefined && +number!==0)
    {
      let isNegatif='';
      if(+number<0)
      {
        isNegatif='-';
        number=number.replace('-','');
      }
      const noktaDegis=number.replace('.','_');
      const virgulDegis=noktaDegis.replace(',','.');
      const sonDegis=virgulDegis.replace('_',',');
      return isNegatif+sonDegis;
    }
    return number;
  }


  const fallSpringPaymentRaports=async ()=>{
    const url=API_URL+'/maliisler/fall-spring-payment-raports';
    const res= await axios.post<ReportResponse>(url);
    return res.data.data;
  }

  const totalScholarshipList=async ()=>{
    const url=API_URL+'/maliisler/total-scholarship-list';
    const res= await axios.post<TotalScholarshipListResponse>(url);
    return res.data.data;
  }
  
  const debtVsPaid=async ()=>{
    const url=API_URL+'/maliisler/debt-vs-paid';
    const res= await axios.post<DeptVsPaidResponse>(url);
    return res.data.data;
  }

  const definitiveRecords=async (formData:DefinitiveRecordRequest)=>{
    const url=API_URL+'/maliisler/definitive-records';
    const res= await axios.post<DefinitiveRecordResponse>(url,formData);
    return res.data.data;
  }

  const studentList=async (formData:StudentListRequest)=>{
    const url=API_URL+'/maliisler/student-list';
    const res= await axios.post<StudentListResponse>(url,formData);
    return res.data.data;
  }

  const studentScholarshipNumbers=async (formData:StudentScholarshipNumbersRequest)=>{
    const url=API_URL+'/maliisler/student-scholarship-numbers';
    const res= await axios.post<StudentScholarshipNumbersResponse>(url,formData);
    return res.data.data;
  }
  const summerSchoolFeeRefundRequests=async ()=>{
    const url=API_URL+'/maliisler/summer-school-fee-refund-requests';
    const res= await axios.post<SummerFeeRefundRequestsResponse>(url);
    return res.data.data;
  }
  const mahsupResponse=async ()=>{
    const url=API_URL+'/maliisler/mahsup-list';
    const res= await axios.post<MahsupResponse>(url);
    return res.data.data;
  }
  const allPaymentsList=async (formData:FeePaymentListRequest)=>{
    const url=API_URL+'/maliisler/all-payments-list';
    const res= await axios.post<FeePaymentListResponse>(url,formData);
    return res.data.data;
  }
  const allPaymentsList2=async (formData:AllPayablesListRequest)=>{
    const url=API_URL+'/maliisler/all-payables-list';
    const res= await axios.post<AllPayablesListResponse>(url,formData);
    return res.data.data;
  }

  const debtCheckList=async (formData:DebtCheckListsRequest)=>{
    const url=API_URL+'/maliisler/debt-check-list';
    const res= await axios.post<DebtCheckListsResponse>(url,formData);
    return res.data.data;
  }
  const installment=async (formData:InstallmentListsRequest)=>{
    const url=API_URL+'/maliisler/installment';
    const res= await axios.post<InstallmentListsResponse>(url,formData);
    return res.data.data;
  }
  const installmentUpdate=async (formData:InstallmentCURequest)=>{
    const url=API_URL+'/maliisler/installment-update';
    const res= await axios.post<InstallmentListsResponse>(url,formData);
    return res.data.data;
  }
  const paramFees=async ()=>{
    const url=API_URL+'/maliisler/param-fees';
    const res= await axios.post<ParamFeesResponse>(url);
    return res.data.data;
  }

  const paramFeesCu=async (formData:any)=>{
    const url=API_URL+'/maliisler/param-fees-cu';
    const res= await axios.post<ParamFeesUpdateResponse>(url,formData);
    return res.data;
  }
  const activeStudentDetail=async (formdata:any)=>{
    const url=API_URL+'/maliisler/active-student-detail';
    const res= await axios.post<StudentDetailResponseData>(url,formdata);
    return res.data.data;
  }
  const generalInformation=async (formdata:any)=>{
    const url=API_URL+'/maliisler/general-information';
    const res= await axios.post<GeneralInformationResponseData>(url,formdata);
    return res.data.data;
  }

  const idInformation=async (formdata:any)=>{
    const url=API_URL+'/maliisler/id-information';
    const res= await axios.post<IdInformationResponseData>(url,formdata);
    return res.data.data;
  }

  const contactInformation=async (formdata:any)=>{
    const url=API_URL+'/maliisler/contact-information';
    const res= await axios.post<ContactInformationResponseData>(url,formdata);
    return res.data.data;
  }

  const transkript=async (formdata:any)=>{
    const url=API_URL+'/maliisler/transkript';
    const res= await axios.post<StudentTranskript>(url,formdata);
    return res.data.data;
  }
  const studentFees=async (formdata:any)=>{
    const url=API_URL+'/maliisler/student-fees';
    const res= await axios.post<PaymentsResponse>(url,formdata);
    return res.data.data;
  }
  const studentPayments=async (formdata:any)=>{
    const url=API_URL+'/maliisler/student-payments';
    const res= await axios.post<CollectionsResponse>(url,formdata);
    return res.data.data;
  }

  const studentFeeUpdate=async (formdata:StudentFeesUpdateRequest)=>{
    const url=API_URL+'/maliisler/student-fee-update';
    const res= await axios.post<StudentFeesUpdateResponse>(url,formdata);
    return res.data;
  }

  const studentPaymentUpdate=async (formdata:StudentCollectionUpdateRequest)=>{
    const url=API_URL+'/maliisler/student-payment-update';
    const res= await axios.post<StudentFeesUpdateResponse>(url,formdata);
    return res.data;
  }

  const studentFeeDelete=async (formdata:StudentFeesUpdateRequest)=>{
    const url=API_URL+'/maliisler/student-fee-delete';
    const res= await axios.post<StudentFeesUpdateResponse>(url,formdata);
    return res.data;
  }
  const studentPaymentDelete=async (formdata:StudentCollectionUpdateRequest)=>{
    const url=API_URL+'/maliisler/student-payment-delete';
    const res= await axios.post<StudentFeesUpdateResponse>(url,formdata);
    return res.data;
  }

  const studentHistoryList=async (formdata:any)=>{
    const url=API_URL+'/maliisler/student-history-list';
    const res= await axios.post<HistoryResponse>(url,formdata);
    return res.data.data;
  }

  const  scholarshipHistoryLList =async (formdata:any)=>{
    const url=API_URL+'/maliisler/scholarship-history-list';
    const res= await axios.post<ScholarshipHistoryResponse>(url,formdata);
    return res.data.data;
  }

  const  activeStudentList =async (formdata:any)=>{
    const url=API_URL+'/maliisler/active-student-list';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data.data;
  }
  const  scholarshipHistoryUpdate =async (formdata:any)=>{
    const url=API_URL+'/maliisler/scholarship-history-update';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }

  const  scholarshipHistoryDelete =async (formdata:any)=>{
    const url=API_URL+'/maliisler/scholarship-history-delete';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }

  
  const  financialAffairsAssociatedInformation =async (formdata:any)=>{
    const url=API_URL+'/maliisler/financial-affairs-associated-information';
    const res= await axios.post<RelationMaliDetailResponse>(url,formdata);
    return res.data.data;
  }

  const  faaiUpdate =async (formdata:any)=>{
    const url=API_URL+'/maliisler/faai-update';
    const res= await axios.post<RelationMaliDetailResponse>(url,formdata);
    return res.data;
  }

  const  cariList =async (formdata:any)=>{
    const url=API_URL+'/maliisler/cari-name-list';
    const res= await axios.post<CariNameListResponse>(url,formdata);
    return res.data.data;
  }

  const  komisyonluOdeyenler =async ()=>{
    const url=API_URL+'/maliisler/yaz-komisyonlu-odeyen-listesi';
    const res= await axios.post<KomisyonluResponse>(url);
    return res.data.data;
  }

  const  paramfeeadd =async (formdata:ParamFeesx)=>{
    const url=API_URL+'/maliisler/param-fees-create-update';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }
  const  paramfeedelete =async (formdata:ParamFeesx)=>{
    const url=API_URL+'/maliisler/param-fees-delete';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }
  const  paramAppFees =async (formdata:any)=>{
    const url=API_URL+'/maliisler/param-fees-approval-list';
    const res= await axios.post<ParamFeesAppResponse>(url,formdata);
    return res.data.data;
  }
  const  paramfeered =async (formdata:ParamFeesRed)=>{
    const url=API_URL+'/maliisler/param-fees-red';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }
  const  paramfeeonay =async (formdata:ParamFeesRed)=>{
    const url=API_URL+'/maliisler/param-fees-onay';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }


  const  paramfeeyladd =async (formdata:ParamFeesYlx)=>{
    const url=API_URL+'/maliisler/param-fees-yl-create-update';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }
  const  paramfeeyldelete =async (formdata:ParamFeesYlx)=>{
    const url=API_URL+'/maliisler/param-fees-yl-delete';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }

  const paramFeesYl=async ()=>{
    const url=API_URL+'/maliisler/param-fees-yl';
    const res= await axios.post<ParamFeesYlResponse>(url);
    return res.data.data;
  }

  const paramFeesYlCu=async (formData:any)=>{
    const url=API_URL+'/maliisler/param-fees-yl-cu';
    const res= await axios.post<ParamFeesYlUpdateResponse>(url,formData);
    return res.data;
  }

  const paramFeesDolar=async ()=>{
    const url=API_URL+'/maliisler/param-fees-dolar';
    const res= await axios.post<ParamFeesDolarResponse>(url);
    return res.data.data;
  }

  const paramFeesDolarCu=async (formData:any)=>{
    const url=API_URL+'/maliisler/param-fees-dolar-cu';
    const res= await axios.post<ParamFeesDolarUpdateResponse>(url,formData);
    return res.data;
  }

  const  paramfeedolaradd =async (formdata:ParamFeesDolarx)=>{
    const url=API_URL+'/maliisler/param-fees-dolar-create-update';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }
  const  paramfeedolardelete =async (formdata:ParamFeesDolarx)=>{
    const url=API_URL+'/maliisler/param-fees-dolar-delete';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }


  
  const paramFeesSummer=async ()=>{
    const url=API_URL+'/maliisler/param-fees-summer';
    const res= await axios.post<ParamFeesSummerResponse>(url);
    return res.data.data;
  }

  const paramFeesSummerCu=async (formData:any)=>{
    const url=API_URL+'/maliisler/param-fees-summer-cu';
    const res= await axios.post<ParamFeesSummerUpdateResponse>(url,formData);
    return res.data;
  }

  const  paramfeesummeradd =async (formdata:ParamFeesSummerx)=>{
    const url=API_URL+'/maliisler/param-fees-summer-create-update';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }
  const  paramfeesummerdelete =async (formdata:ParamFeesSummerx)=>{
    const url=API_URL+'/maliisler/param-fees-summer-delete';
    const res= await axios.post<ResponseData>(url,formdata);
    return res.data;
  }

  

  const createdebt=async ()=>{
    const url=API_URL+'/maliisler/param-fees-dolar';
    const res= await axios.post<ParamFeesDolarResponse>(url);
    return res.data.data;
  }

  // const createdebtCu=async (formData:any)=>{
  //   const url=API_URL+'/maliisler/param-fees-dolar-cu';
  //   const res= await axios.post<ParamFeesDolarUpdateResponse>(url,formData);
  //   return res.data;
  // }

  // const  createdebtadd =async (formdata:ParamFeesDolarx)=>{
  //   const url=API_URL+'/maliisler/param-fees-dolar-create-update';
  //   const res= await axios.post<ResponseData>(url,formdata);
  //   return res.data;
  // }
  // const  createdebtdelete =async (formdata:ParamFeesDolarx)=>{
  //   const url=API_URL+'/maliisler/param-fees-dolar-delete';
  //   const res= await axios.post<ResponseData>(url,formdata);
  //   return res.data;
  // }

export default {faculty,department,option,stuStatus,registerType,scholarshipStatus,year,banks,feeTypes,bankCards,creditCard,paymetFormat,historyScholarshipStatus,
  fallSpringPaymentRaports,totalScholarshipList,debtVsPaid,definitiveRecords,studentList,studentScholarshipNumbers,summerSchoolFeeRefundRequests,allPaymentsList,allPaymentsList2
,debtCheckList,installment,installmentUpdate,paramFees,paramFeesCu,activeStudentDetail,generalInformation,idInformation,contactInformation,transkript,studentFees,studentPayments,
studentFeeUpdate,studentPaymentUpdate,studentFeeDelete,studentPaymentDelete,studentHistoryList,scholarshipHistoryLList,activeStudentList,scholarshipHistoryUpdate
,scholarshipHistoryDelete,financialAffairsAssociatedInformation,faaiUpdate,cariList,mahsupResponse,komisyonluOdeyenler,paramfeeadd,paramfeedelete,paramAppFees,paramfeered,
paramfeeonay,paramfeeyladd,paramfeeyldelete,paramFeesYl,paramFeesYlCu,paramFeesDolar,paramFeesDolarCu,paramfeedolaradd,paramfeedolardelete,
paramFeesSummer,paramFeesSummerCu,paramfeesummeradd,paramfeesummerdelete,createdebt
};
