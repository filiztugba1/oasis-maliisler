/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import { DanismanCard } from './components/DansimanCard'
import { AktsCard } from './components/AktsCard'

const HomePageHeader: React.FC = () => {
  const location = useLocation()

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3' style={{flex:1}}>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metronic' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='d-flex flex-row'  style={{flex:1}}>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    Arda Yıldız
                  </a>
                  {/* <a href='#'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a> */}
              
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <i className='fa fa-phone svg-icon-4 me-1'></i>
                    5534444072
                  </a>
              
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    arda.yildiz@ieu.edu.tr
                  </a>
                </div>
              </div>

              {/* <div className='d-flex my-4'>
                <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr012.svg'
                    className='svg-icon-3 d-none'
                  />

                  <span className='indicator-label'>Follow</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </a>
                <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Hire Me
                </a>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div>
              </div> */}
           
              
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
              <div className='d-flex flex-wrap'>
              <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                  
                      <div className='fs-4 fw-bolder'>Numara</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>5534444072</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Fakülte</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Mühendislik Fakültesi</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                     
                      <div className='fs-4 fw-bolder'>Sınıf</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>3</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-2 mb-3'>
                    <div className='d-flex align-items-center'>
                    
                      <div className='fs-4 fw-bolder'>Bölüm</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Bilgisayar Mühendisliği</div>
                  </div>
                </div>
               
              </div>
               

          
            </div>
          </div>
          <div className='me-6' style={{boxShadow: "0px 0px 4px 0px",
            color: "#b3b3b3",    borderRadius: "1rem"}}>
          <DanismanCard className='mb-5 mb-xl-10'  />
          </div>
          <div className='me-6' style={{boxShadow: "0px 0px 4px 0px",
            color: "#b3b3b3",    borderRadius: "1rem"
            }}>
          <AktsCard className='mb-5 mb-xl-10' />
          </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/home/weekly-program' && 'active')
                }
                to='/home/weekly-program'
              >
                Haftalık Ders Programı
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/home/final-exam-schedule' && 'active')
                }
                to='/home/final-exam-schedule'
              >
               Final Sınav Programı
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/home/detailed-absence' && 'active')
                }
                to='/home/detailed-absence'
              >
               Detaylı Devamsızlık
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/home/acedemic-calender' && 'active')
                }
                to='/home/acedemic-calender'
              >
               Akademik Takvim
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export {HomePageHeader}
