import React from 'react'

import { ScholarshipHistoryList } from '../models/_history.model'



const ScholarshipHistory: React.FC<ScholarshipHistoryList> = (information) => {
 return (
  <>
 
        <tr>
        <td style={{width:"35px!important"}} >{information.Year}</td>
        <td style={{width:"35px!important"}} >{information.Semester}</td>
        <td >{information.stat}</td>
        <td >{information.badi}</td>
        <td >{information.stat_date}</td>
        <td >{information.adi+" "+information.soyadi}</td>
        <td>
        <span><button className='btn  btn-warning btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-trash'></i></button></span>
        </td>
      </tr>
   </>

 )
}

export {ScholarshipHistory}