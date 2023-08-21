 import React from 'react'

import { PaymentList } from '../models/_payments.model'



const Payments: React.FC<PaymentList> = (information) => {
 return (
  <>
{/*  
        {information.page_type==1?
        <tr>
        <td style={{width:"35px!important"}} >{information.year}</td>
        <td style={{width:"35px!important"}} >{information.semester}</td>
        <td >{information.name_tr}</td>
        <td style={{width:"50px!important"}} >{information.Amount_Dolar}</td>
        <td style={{width:"50px!important"}} >{information.dolar_payment}</td>
        <td style={{width:"50px!important"}} >{information.kalan_USD}</td>
        <td style={{width:"50px!important"}} >{information.Amount}</td>
        <td style={{width:"50px!important"}} >{information.Payments}</td>
        <td style={{width:"50px!important"}} >{information.kalan}</td>
        <td style={{width:"70px!important"}} >{information.create_date}</td>
        <td >{information.Comments}</td>
        <td>
        <span><button className='btn  btn-warning btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-trash'></i></button></span>
        </td>
      </tr>:
        <tr>
        <td style={{width:"35px!important"}} >{information.year}</td>
        <td style={{width:"35px!important"}} >{information.semester}</td>
        <td >{information.name_tr}</td>
        <td style={{width:"50px!important"}} >{information.dolar_payment}</td>
        <td style={{width:"50px!important"}} >{information.Payments}</td>
        <td style={{width:"70px!important"}} >{information.create_date}</td>
        <td>
        <span><button className='btn  btn-warning btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-pen'></i></button></span>
        <span><button className='btn  btn-danger btn-sm' style={{padding: "3px 9px",margin: "0px 1px"}}><i className='fa fa-trash'></i></button></span>
        </td>
      </tr>
    }   */}
   </>

 )
}

export {Payments}