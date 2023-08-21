/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useRef} from 'react'
import {KTSVG,toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
type Props = {
  className: string
  chartSize?: number
  chartLine?: number
  chartRotate?: number
  style?:string
}

const DanismanCard: FC<Props> = ({
  className,
}) => {


  return (
    <div className={`card card-flush ${className}`}>
           <div className='d-flex align-items-center' style={{padding: "6px 5px"}}>
              <a className="btn btn-sm btn-light danismanTabs">Anadal Danışmanı</a>
              <a className="btn btn-sm danismanTabs">Çap Danışmanı</a>
              <a className="btn btn-sm danismanTabs">Yandal Danışmanı</a>
          </div>
      <div className='card-header pt-1'>
        
        <div className='card-title d-flex flex-column'>
       
          <div className='d-flex align-items-center'>
            {/* <span className='fs-4 fw-semibold text-gray-400 me-1 align-self-start'>$</span> */}
        
            <span className='fs-1 fw-bold text-dark me-2 lh-1 ls-n2'>Anadal Danışmanı</span>

            {/* <span className='badge badge-light-success fs-base'>
              <KTSVG
                path='/media/icons/duotune/arrows/arr066.svg'
                className='svg-icon-5 svg-icon-success ms-n1'
              />{' '}
              2.2%
            </span> */}
          </div>
          {/* <span className='text-gray-400 pt-1 fw-semibold fs-6'>Projects Earnings in April</span> */}
        </div>
      </div>

      <div className='card-body pt-2 pb-4 d-flex flex-wrap align-items-center'>
        <div className='d-flex flex-center me-5 pt-2'>
        <img style={{maxWidth: "76px",borderRadius: "100%"}} src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metronic' />
        </div>

        <div className='d-flex flex-column content-justify-center flex-row-fluid'>
          <div className='d-flex fw-semibold align-items-center'>
            <div className='text-gray-500 flex-grow-1 '>Şeniz ERTUĞRUL</div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-3'>
            <Button className="btn btn-success btn-sm">Mesaj Gönder</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export {DanismanCard}
