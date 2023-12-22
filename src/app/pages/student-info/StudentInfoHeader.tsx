


/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import { StudentDetailModel } from './models/_studentdetail.model';
import Loading from '../Loading'


const StudentInfoHeader: React.FC<StudentDetailModel> = (studentDetail) => {
  const location = useLocation()

  return (
    <div className='card mb-5 mb-xl-10'>
      {studentDetail.listLoad?<Loading/>:''}
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3' style={{flex:1}}>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={toAbsoluteUrl(studentDetail.image)} alt={studentDetail.name+" "+studentDetail.surname} />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='d-flex flex-row'  style={{flex:1}}>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {studentDetail.name+" "+studentDetail.surname}
                  </a>
              
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <i className='fa fa-phone svg-icon-4 me-1'></i>
                    {studentDetail.telefon}
                  </a>
              
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {studentDetail.email}
                  </a>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
              <div className='d-flex flex-wrap'>
              <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                  
                      <div className='fs-4 fw-bolder'>Numara</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'> {studentDetail.id}</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                     
                      <div className='fs-4 fw-bolder'>Sınıf</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.class}</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Fakülte</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.anadal_fakulte}</div>
                  </div>
                 
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Bölüm</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.anadal_bolum}</div>
                  </div>
                  {studentDetail.anadal_opsiyon!==null && studentDetail.anadal_opsiyon!==undefined?
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Opsiyon</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.anadal_opsiyon}</div>
                  </div>:''
                  }

                  {studentDetail.cap_fakulte!==null && studentDetail.cap_fakulte!==undefined?
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Çap Fakülte</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.cap_fakulte}</div>
                  </div>:''
                  }

                  {studentDetail.cap_bolum!==null && studentDetail.cap_bolum!==undefined?
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Çap Bölüm</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.cap_bolum}</div>
                  </div>:''
                  }
                  {studentDetail.cap_opsiyon!==null && studentDetail.cap_opsiyon!==undefined?
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Çap Opsiyon</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.cap_opsiyon}</div>
                  </div>:''
                  }


                  {studentDetail.yandal_fakulte!==null && studentDetail.yandal_fakulte!==undefined?
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Yandal Fakülte</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.yandal_fakulte}</div>
                  </div>:''
                  }

                  {studentDetail.yandal_bolum!==null && studentDetail.yandal_bolum!==undefined?
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Yandal Bölüm</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.yandal_bolum}</div>
                  </div>:''
                  }
                  {studentDetail.yandal_opsiyon!==null && studentDetail.yandal_opsiyon!==undefined?
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Yandal Opsiyon</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.yandal_opsiyon}</div>
                  </div>:''
                  }
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Durum</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.durum}</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Durum Tarihi</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.durum_tarihi}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Burs Durumu</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.burs_durumu}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Burs Tipi</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.burs_tipi}</div>
                  </div>

                  {studentDetail.page==='transkript'?
                  <>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Tc Kimlik No</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.tc}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Kayıt Tarihi</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.kayit_tarihi}</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Kayıt Tipi</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.kayit_tipi}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Eğitim Dili</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.egitim_dili}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Toplam AKTS</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.toplam_akts}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Derecesi</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.derece}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Basım Tarihi</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>{studentDetail.basim_tarihi}</div>
                  </div>
                  </>
                  :''}



                </div>
               
              </div>
            </div>
          </div>
          </div>
        </div>

        {studentDetail.page==='student-detail'?
        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/student-info/general-information' && 'active')
                }
                to='/student-info/general-information'
              >
                Genel Bilgiler
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/student-info/id-information' && 'active')
                }
                to='/student-info/id-information'
              >
               Kimlik Bilgileri
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/student-info/contact-information' && 'active')
                }
                to='/student-info/contact-information'
              >
              İletişim Bilgileri
              </Link>
            </li>

          

          </ul>
        </div>:''
        }
        {studentDetail.page==='student-payments'?
        <>
         <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/student-payments/payments' && 'active')
                }
                to='/student-payments/payments'
              >
              Ödeme Bilgileri
              </Link>
            </li>
            <li className='nav-item'>
            <Link
              className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === '/student-payments/collection-payments' && 'active')
              }
              to='/student-payments/collection-payments'
            >
            Tahsilat Bilgileri
            </Link>
          </li>
        </ul>
          </div>
        </>
        :''}

        {studentDetail.page==='student-history'?
               <>
               <div className='d-flex overflow-auto h-55px'>
                <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                    <li className='nav-item'>
                    <Link
                      className={
                        `nav-link text-active-primary me-6 ` +
                        (location.pathname === '/student-history/history' && 'active')
                      }
                      to='/student-history/history'
                    >
                    Öğrenci Tarihçe Listesi
                    </Link>
                  </li>
                  <li className='nav-item'>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/student-history/scholarship-history' && 'active')
                    }
                    to='/student-history/scholarship-history'
                  >
                  Öğrenci Burs Tarihçe Listesi
                  </Link>
                </li>
              </ul>
                </div>
              </>
              :''}
      </div>
    </div>
  )
}

export {StudentInfoHeader}
