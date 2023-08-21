import React, {FC, KeyboardEvent, useEffect, useRef, useState,Component} from 'react'
import { StudentInfoHeader } from '../student-info/StudentInfoHeader';
import { StudentDetailModel, StudentDetailResponseData } from '../student-info/models/_studentdetail.model';
import axios from "axios";
import { StudentTranskript, StudentTranskriptData, year } from './models/_studenttranskript.model';
import './transkript.css';
import { SemesterHeader } from './components/SemesterHeader';
    const Transkript: React.FC = () => {
        const [studentInfo, setStudentInfo] = useState<StudentDetailModel>(
            {
              id: "",
              name: "",
              surname: "",
              class: "",
              anadal_fakulte: "",
              anadal_bolum: "",
              anadal_opsiyon: "",
              email: "",
              telefon: "",
              cap_fakulte: "",
              cap_bolum: "",
              cap_opsiyon: "",
              yandal_fakulte: "",
              yandal_bolum: "",
              yandal_opsiyon: "",
              durum:0,
              durum_tarihi: "",
              burs_durumu: "",
              burs_tipi: "",
              alinan_ders: 0,
              image: "",
              page:''
            }
          );

          const [studentTranskriptt, setStudentTranskriptt] = useState<StudentTranskriptData>();

          const [isApi, setIsApi] = useState(true);
          useEffect(() => {
            if(isApi)
            {
              
             axios.post<StudentDetailResponseData>('http://api-oasis.localhost/maliisler/maliisler/active-student-detail',{
              stu_id:localStorage.getItem('search-student-id')
                }).then((res)=>{
                    // setLoading(false);
                    if(res.status===200)
                    {
                        setStudentInfo(res.data.data);
                        setIsApi(false);
                    }
                  console.log();
                }).catch(err=>{
                  setIsApi(false);
                })

                axios.post<StudentTranskript>('http://api-oasis.localhost/maliisler/maliisler/transkript',{
                    stu_id:localStorage.getItem('search-student-id')
                      }).then((res)=>{
                          // setLoading(false);
                          if(res.status===200)
                          {
                            setStudentTranskriptt(res.data.data);
                              setIsApi(false);
                          }
                      }).catch(err=>{
                        setIsApi(false);
                })
          }
          
        }
        );

         const colonHesap=(datam:year) => {
            const azami_bahar_basi:boolean=datam.azami_bahar_basi.data!==undefined;
            const azami_bahar_sonu:boolean=datam.azami_bahar_sonu.data!==undefined;
            const azami_guz_sonu:boolean=datam.azami_guz_sonu.data!==undefined;
            const azami_guz_basi:boolean=datam.azami_guz_sonu.data!==undefined;
            const ek_sinav_guz_sonu:boolean=datam.ek_sinav_guz_sonu.data!==undefined;
            const ek_sinav_yaz_okulu_sonrasi:boolean=datam.ek_sinav_yaz_okulu_sonrasi.data!==undefined;
            const ek_sınav_yaz_oncesi:boolean=datam.ek_sınav_yaz_oncesi.data!==undefined;
            const yaz_okulu:boolean=datam.azami_bahar_basi.data!==undefined;
            const bahar=1;
            const guz=1;

            const toplam=+azami_bahar_basi+(+azami_bahar_sonu)+(+azami_guz_basi)+(+azami_guz_sonu)+(+ek_sinav_guz_sonu)+(+ek_sinav_yaz_okulu_sonrasi)+(+ek_sınav_yaz_oncesi)+(+yaz_okulu)+bahar+guz;
            return 12/toplam;
         };

        // studentTranskriptt?.transcriptCourses.dersler.alinan_dersler.map((x,year) => (
        //     console.log(x)
        // ))
        const map = studentTranskriptt?.transcriptCourses.dersler.alinan_dersler;
        const result:Array<year> = studentTranskriptt?.transcriptCourses.dersler.alinan_dersler!=undefined?Object.values(map):[];

        console.log(studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler);
        return (
           <>
            <div className="card mb-5 mb-xl-10">
             <StudentInfoHeader 
             id= {studentInfo.id}
             name= {studentInfo.name}
             surname= {studentInfo.surname}
             class= {studentInfo.class}
             anadal_fakulte= {studentInfo.anadal_fakulte}
             anadal_bolum= {studentInfo.anadal_bolum}
             anadal_opsiyon= {studentInfo.anadal_opsiyon}
             email= {studentInfo.email}
             telefon= {studentInfo.telefon}
             cap_fakulte= {studentInfo.cap_fakulte}
             cap_bolum= {studentInfo.cap_bolum}
             cap_opsiyon= {studentInfo.cap_opsiyon}
             yandal_fakulte= {studentInfo.yandal_fakulte}
             yandal_bolum= {studentInfo.yandal_bolum}
             yandal_opsiyon= {studentInfo.yandal_opsiyon}
             durum= {studentInfo.durum}
             durum_tarihi= {studentInfo.durum_tarihi}
             burs_durumu= {studentInfo.burs_durumu}
             burs_tipi= {studentInfo.burs_tipi}
             alinan_ders= {studentInfo.alinan_ders}
             image= {studentInfo.image}
             page={'transkript'}
             tc={studentTranskriptt?.transcriptCourses.info.tc}
             kayit_tarihi={studentTranskriptt?.transcriptCourses.info.kayit_tarihi}
             kayit_tipi={studentTranskriptt?.transcriptCourses.info.register_type_tr}
             egitim_dili={studentTranskriptt?.transcriptCourses.info.egitim_dili_tr}
             toplam_akts={studentTranskriptt?.transcriptCourses.info.akts}
             derece={studentTranskriptt?.transcriptCourses.info.derece}
             basim_tarihi={studentTranskriptt?.transcriptCourses.info.basim_tarihi}
             />
           
            </div>
            
            <div className="card mb-5 mb-xl-10">
                <div className="card-header pt-9 pb-0">
                    <h4  style={{textAlign:"center",width:'100%'}}>İZMİR EKONOMİ ÜNİVERSİTESİ TRANSKRİPT</h4>
                </div>
                <div className="card-body pt-9 pb-0">
                    {
                       studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler!==undefined?
                        <div className='row'>
                            {studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler.data!==undefined && 
                            studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler.data!==undefined?
                            <div className={`col-md-12`} >
                                <SemesterHeader 
                                    title_tr={studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler.title_tr}
                                    title_en={studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler.title_en}
                                    ortHesap={studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler.ortHesap}
                                    data={studentTranskriptt?.transcriptCourses.dersler.cap_yandal_dersler.data}
                                    semx={[0]}
                                    tarihceDurumu_en=''
                                    tarihceDurumu_tr=''
                                />
                           </div>:''}
                         </div>:''  
                    }
                    
                    {result.map((x,key)=>
                        
                    {
                        return x!==undefined?
                    <div className='row' key={key}>
                        {x.azami_guz_basi!==undefined && x.azami_guz_basi.data!==undefined?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.azami_guz_basi.title_tr}
                                title_en={x.azami_guz_basi.title_en}
                                ortHesap={x.azami_guz_basi.ortHesap}
                                tarihceDurumu_en={x.azami_guz_basi.tarihceDurumu_en}
                                tarihceDurumu_tr={x.azami_guz_basi.tarihceDurumu_tr}
                                semx={x.azami_guz_basi.semx}
                                data={x.azami_guz_basi.data}
                            />
                       </div>:''}
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.guz.title_tr}
                                title_en={x.guz.title_en}
                                ortHesap={x.guz.ortHesap}
                                tarihceDurumu_en={x.guz.tarihceDurumu_en}
                                tarihceDurumu_tr={x.guz.tarihceDurumu_tr}
                                semx={x.guz.semx}
                                data={x.guz.data}
                            />
                       </div>
                       {x.ek_sinav_guz_sonu.data!==undefined ?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.ek_sinav_guz_sonu.title_tr}
                                title_en={x.ek_sinav_guz_sonu.title_en}
                                ortHesap={x.ek_sinav_guz_sonu.ortHesap}
                                tarihceDurumu_en={x.ek_sinav_guz_sonu.tarihceDurumu_en}
                                tarihceDurumu_tr={x.ek_sinav_guz_sonu.tarihceDurumu_tr}
                                semx={x.ek_sinav_guz_sonu.semx}
                                data={x.ek_sinav_guz_sonu.data}
                            />
                       </div>:''}
                       {x.azami_guz_sonu.data!==undefined ?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.azami_guz_sonu.title_tr}
                                title_en={x.azami_guz_sonu.title_en}
                                ortHesap={x.azami_guz_sonu.ortHesap}
                                tarihceDurumu_en={x.azami_guz_sonu.tarihceDurumu_en}
                                tarihceDurumu_tr={x.azami_guz_sonu.tarihceDurumu_tr}
                                semx={x.azami_guz_sonu.semx}
                                data={x.azami_guz_sonu.data}
                            />
                       </div>:''}
                       {x.azami_bahar_basi.data!==undefined ?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.azami_bahar_basi.title_tr}
                                title_en={x.azami_bahar_basi.title_en}
                                ortHesap={x.azami_bahar_basi.ortHesap}
                                tarihceDurumu_en={x.azami_bahar_basi.tarihceDurumu_en}
                                tarihceDurumu_tr={x.azami_bahar_basi.tarihceDurumu_tr}
                                semx={x.azami_bahar_basi.semx}
                                data={x.azami_bahar_basi.data}
                            />
                       </div>:''}
                       <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.bahar.title_tr}
                                title_en={x.bahar.title_en}
                                ortHesap={x.bahar.ortHesap}
                                tarihceDurumu_en={x.bahar.tarihceDurumu_en}
                                tarihceDurumu_tr={x.bahar.tarihceDurumu_tr}
                                semx={x.bahar.semx}
                                data={x.bahar.data}
                            />
                       </div>
                       {x.ek_sınav_yaz_oncesi.data!==undefined ?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.ek_sınav_yaz_oncesi.title_tr}
                                title_en={x.ek_sınav_yaz_oncesi.title_en}
                                ortHesap={x.ek_sınav_yaz_oncesi.ortHesap}
                                tarihceDurumu_en={x.ek_sınav_yaz_oncesi.tarihceDurumu_en}
                                tarihceDurumu_tr={x.ek_sınav_yaz_oncesi.tarihceDurumu_tr}
                                semx={x.ek_sınav_yaz_oncesi.semx}
                                data={x.ek_sınav_yaz_oncesi.data}
                            />
                       </div>:''}
                       {x.azami_bahar_sonu.data!==undefined ?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.azami_bahar_sonu.title_tr}
                                title_en={x.azami_bahar_sonu.title_en}
                                ortHesap={x.azami_bahar_sonu.ortHesap}
                                tarihceDurumu_en={x.azami_bahar_sonu.tarihceDurumu_en}
                                tarihceDurumu_tr={x.azami_bahar_sonu.tarihceDurumu_tr}
                                semx={x.azami_bahar_sonu.semx}
                                data={x.azami_bahar_sonu.data}
                            />
                       </div>:''}

                       {x.yaz_okulu.data!==undefined ?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.yaz_okulu.title_tr}
                                title_en={x.yaz_okulu.title_en}
                                ortHesap={x.yaz_okulu.ortHesap}
                                tarihceDurumu_en={x.yaz_okulu.tarihceDurumu_en}
                                tarihceDurumu_tr={x.yaz_okulu.tarihceDurumu_tr}
                                semx={x.yaz_okulu.semx}
                                data={x.yaz_okulu.data}
                            />
                       </div>:''}

                       {x.ek_sinav_yaz_okulu_sonrasi.data!==undefined ?
                        <div className={`col-md-`+colonHesap(x)} >
                            <SemesterHeader 
                                title_tr={x.ek_sinav_yaz_okulu_sonrasi.title_tr}
                                title_en={x.ek_sinav_yaz_okulu_sonrasi.title_en}
                                ortHesap={x.ek_sinav_yaz_okulu_sonrasi.ortHesap}
                                tarihceDurumu_en={x.ek_sinav_yaz_okulu_sonrasi.tarihceDurumu_en}
                                tarihceDurumu_tr={x.ek_sinav_yaz_okulu_sonrasi.tarihceDurumu_tr}
                                semx={x.ek_sinav_yaz_okulu_sonrasi.semx}
                                data={x.ek_sinav_yaz_okulu_sonrasi.data}
                            />
                       </div>:''}

                       {x.tip_desleri.data!==undefined ?
                        <div className={`col-md-12`} >
                            <SemesterHeader 
                                title_tr={x.tip_desleri.title_tr}
                                title_en={x.tip_desleri.title_en}
                                ortHesap={x.tip_desleri.ortHesap}
                                tarihceDurumu_en={x.tip_desleri.tarihceDurumu_en}
                                tarihceDurumu_tr={x.tip_desleri.tarihceDurumu_tr}
                                semx={x.tip_desleri.semx}
                                data={x.tip_desleri.data}
                            />
                       </div>:''}
                       </div>:''
                       }
                     
                    )}
                </div>
            </div>
            
            
            </>
        )
    }

export default Transkript;
