 import React from 'react'

import { HistoryList } from '../models/_history.model'



const History: React.FC<HistoryList> = (information) => {
 return (
  <>
 
        <tr>
        <td style={{width:"35px!important"}} >{information.year}</td>
        <td style={{width:"35px!important"}} >{information.semester}</td>
        <td style={{width:"35px!important"}} >{information.class}</td>
        <td >{information.status_name}</td>
        <td >{information.status_date}</td>
        <td >{information.explanation}</td>
        <td >{information.user_name}</td>
        <td>
        <span><button className='btn  btn-warning btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-trash'></i></button></span>
        </td>
      </tr>
   </>

 )
}

export {History}