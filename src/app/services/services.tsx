import axios from 'axios';
import React from 'react'
import { FacultyListResponse } from './models/_faculty';
import { DepartmentListResponse } from './models/_department';
import { StuStatusListResponse } from './models/_stuStatus';
import { RegisterTypeListResponse } from './models/_registerType';
import { ScholarshipStatusListResponse } from './models/_scholarshipStatus';
import { YearListResponse } from './models/_year';
import { FeeTypesResponse } from './models/_feetypes';
import { BanksResponse } from './models/_banks';
import { CreditCardResponse } from './models/_creditCard';
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
    if(number!==null && number!=='' && number!==undefined)
    {
      const noktaDegis=number.replace('.','-');
      const virgulDegis=noktaDegis.replace(',','.');
      const sonDegis=virgulDegis.replace('-',',');
      return sonDegis;
    }
   

    
  }
  

export default {faculty,department,option,stuStatus,registerType,scholarshipStatus,year,banks,feeTypes,bankCards,creditCard,paymetFormat,historyScholarshipStatus};
