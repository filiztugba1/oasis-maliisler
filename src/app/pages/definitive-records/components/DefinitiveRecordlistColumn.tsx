 import React from 'react'

import { DefinitiveRecordList } from '../models/_definitiverecords.model'



const DefinitiveRecordlistColumn: React.FC<DefinitiveRecordList> = (drl) => {
 return (
  <>
        <tr>
        <td style={{width:"50px!important"}} >{drl.id_no}</td>
                <td style={{width:"50px!important"}} ><b>{drl.id}</b></td>
                <td >{drl.name_tr}</td>
                <td >{drl.faculty}</td>
                <td style={{width:"50px!important"}}>{drl.sex}</td>
                <td style={{width:"50px!important"}}>{drl.scholarship}</td>
                <td >{drl.register_date}</td>
                <td >{drl.regtype}</td>
                <td >{drl.status_tr}</td>

      </tr>
   </>

 )
}

export {DefinitiveRecordlistColumn}