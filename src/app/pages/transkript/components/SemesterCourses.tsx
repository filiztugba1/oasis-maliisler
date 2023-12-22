/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Donem } from '../models/_studenttranskript.model';
import '../transkript.css';


const SemesterCourses: React.FC<Donem> = (x) => {

  return (
    <>
    {x.data!==undefined && x.data.length>0?
    <>
     {
            x.data.map((k,key)=>
            <tr key={key}>
                <td >{k.uni_code}</td>
                <td >{k.name_tr}</td>
                <td >{k.register_code==='E'?k.ects_credit2:k.ects_credit}</td>
                <td >{k.grade_tr}</td>
                <td >{k.register_code==='E'?k.newcredit:k.credit}</td>
                <td >{k.register_code==='E'?k.newag:k.ag}</td>
            </tr>
            )
        }
            <tr>
                <td ><b>DNO</b></td>
                <td >{x.ortHesap.dnoOrt}</td>
                <td >{x.ortHesap.dnoAkts}</td>
                <td ><b>Toplam</b></td>
                <td >{x.ortHesap.dnoIeu}</td>
                <td >{x.ortHesap.dnoPuan}</td>
            </tr>
            <tr>
                <td ><b>GNO</b></td>
                <td >{x.ortHesap.gnoOrt}</td>
                <td >{x.ortHesap.gnoAkts}</td>
                <td ><b>Genel Toplam</b></td>
                <td >{x.ortHesap.gnoIeu}</td>
                <td >{x.ortHesap.gnoPuan}</td>
            </tr>
    </>
    :
    <tr>
      <td colSpan={6}>{x.tarihceDurumu_tr}</td>
    </tr>
    }
       
    </>
       
  )
}

export {SemesterCourses}
