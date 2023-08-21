


/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, KeyboardEvent, useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import axios from "axios";
import { Donem } from '../models/_studenttranskript.model';
import {SemesterCourses} from './SemesterCourses';


import '../transkript.css';
const SemesterHeader: React.FC<Donem> = (x) => {
  const location = useLocation()

  return (
    <table className="table table-bordered table-condensed  table-sm table-hover " style={{border: "1px solid #f1f1f1 !important"}}>
        <thead>
            <tr className="bg-coffe">
                <td className="text-center" colSpan={8}>{x.title_tr}</td>
            </tr>
            {x.data!==undefined && x.data.length>0?
            <tr>
                <td style={{width:"70px!important"}} ><b>Kodu</b></td>
                <td ><b>Ders Adı</b></td>
                <td style={{width:"35px!important"}} ><b>AKTS</b></td>
                <td style={{width:"35px!important"}} ><b>Başarı Notu</b></td>
                <td style={{width:"35px!important"}} ><b>İEÜ</b></td>
                <td style={{width:"35px!important"}} ><b>Puan</b></td>
            </tr>
            :''
            }
        </thead>
        <tbody>
            <SemesterCourses title_tr={x.title_tr}
                                title_en={x.title_en}
                                ortHesap={x.ortHesap}
                                tarihceDurumu_en={x.tarihceDurumu_en}
                                tarihceDurumu_tr={x.tarihceDurumu_tr}
                                semx={x.semx}
                                data={x.data}/>
        </tbody>
    </table>
  )
}

export {SemesterHeader}
