import React, {FC, KeyboardEvent, useEffect, useRef, useState} from 'react'
import {SearchComponent} from '../../../assets/ts/components'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useFormik} from 'formik'

import { Link, Link as LinkRouter, useNavigate,} from 'react-router-dom';
import axios from "axios";
import { StudentModel } from '../../../../app/modules/auth';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import api from '../../../../app/services/services';
import Loading from '../../../../app/pages/Loading';
const SearchSnack: FC = () => {
  const [menuState, setMenuState] = useState<'main' | 'advanced' | 'preferences'>('main')
  const element = useRef<HTMLDivElement | null>(null)
  const wrapperElement = useRef<HTMLDivElement | null>(null)
  const resultsElement = useRef<HTMLDivElement | null>(null)
  const suggestionsElement = useRef<HTMLDivElement | null>(null)
  const emptyElement = useRef<HTMLDivElement | null>(null)
  const [listLoad, setlistLoad] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const processs = (search: SearchComponent) => {
    setTimeout(function () {
      const number = Math.floor(Math.random() * 6) + 1

      // Hide recently viewed
      suggestionsElement.current!.classList.add('d-none')

      if (number === 3) {
        // Hide results
        resultsElement.current!.classList.add('d-none')
        // Show empty message
        emptyElement.current!.classList.remove('d-none')
      } else {
        // Show results
        resultsElement.current!.classList.remove('d-none')
        // Hide empty message
        emptyElement.current!.classList.add('d-none')
      }

      // Complete search
      search.complete()
    }, 1500)
  }

  const clear = (search: SearchComponent) => {
    // Show recently viewed
    suggestionsElement.current!.classList.remove('d-none')
    // Hide results
    resultsElement.current!.classList.add('d-none')
    // Hide empty message
    emptyElement.current!.classList.add('d-none')
  }

  useEffect(() => {
    // Initialize search handler
    const searchObject = SearchComponent.createInsance('#kt_header_search')

    // // Search handler
    // searchObject!.on('kt.search.process', processs)

    // // Clear handler
    // searchObject!.on('kt.search.clear', clear)
  }, [])


  const navigate = useNavigate();
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const [students, setStudents] = useState<StudentModel[]>([])
    const [ogr, setOgr] = useState("")
  const studentSearch = (event: React.KeyboardEvent<HTMLElement>) => {
    const student=(event.target as HTMLInputElement).value;
    setOgr(student);
    event.preventDefault();
    setError(null);
    setLoading(true);
    ////// apiye bağlandıktan sonra 
       
      if(student.length>2)
      {
        let formdata = {
          student:student
      };
        setlistLoad(true);
        api.activeStudentList(formdata).then((x) => {
          setlistLoad(false);
          setStudents(x);
        }).catch(err => catchFunc(err))
      }
      else
      {
        setStudents([]);
      }
}
const catchFunc = (err: any) => {
  if (err.response && err.response.data && err.response.data.message) {
    enqueueSnackbar(err.response.data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right', } });
    if (err.response.data.message === 'Expired token') {
      localStorage.clear();
      window.location.href = '/auth';
      // navigate('/auth');
    }
  }
}
const studentdetail=(student:any)=>{
  localStorage.setItem('search-student-id', student.id);
  localStorage.setItem('search-name', student.name);
  localStorage.setItem('search-surname', student.surname);
  localStorage.setItem('menuBaslik',student.name+' '+student.surname+' / '+'Öğrenci Detay Bilgileri');
}

  return (
    <>
      <div
        id='kt_header_search'
        className='d-flex align-items-stretch'
        data-kt-search-keypress='true'
        data-kt-search-min-length='2'
        data-kt-search-enter='enter'
        data-kt-search-layout='menu'
        data-kt-menu-trigger='auto'
        data-kt-menu-overflow='false'
        data-kt-menu-permanent='true'
        data-kt-menu-placement='bottom-end'
        ref={element}
      >
        <div
          className='d-flex align-items-center'
          data-kt-search-element='toggle'
          id='kt_header_search_toggle'
        >
          <div className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'>
            <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-1' />
          </div>
        </div>

        <div
          data-kt-search-element='content'
          className='menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px'
        >
          <div
            className={`${menuState === 'main' ? '' : 'd-none'}`}
            ref={wrapperElement}
            data-kt-search-element='wrapper'
          >
            <form
              data-kt-search-element='form'
              className='w-100 position-relative mb-3'
              autoComplete='off'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0'
              />

              <input
                type='text'
                className='form-control form-control-flush ps-10'
                name='search'
                placeholder='Öğrenci Ara...'
                data-kt-search-element='input'   onKeyUp={studentSearch}
              />
            </form>


            <div ref={suggestionsElement} className='mb-4' data-kt-search-element='main'>
            
              <div className='d-flex flex-stack fw-bold mb-4'>
                <span className='text-muted fs-6 me-2'>Öğrenciler:</span>
              </div>

              <div className='scroll-y mh-200px mh-lg-325px'>
              {listLoad?<Loading/>:''}
              {/* öğrencileri burada listeleyeceğiz aramak için */}
              {
                students.map((student,i) => {
                  return(
                
                    <div key={i} className='d-flex align-items-center mb-5'>
                    {/* <div className='symbol symbol-40px me-4'>
                      <span className='symbol-label bg-light'>
                        <KTSVG
                          path={`${student.image}`}
                          className='svg-icon-2 svg-icon-primary'
                        />
                      </span>
                    </div> */}
  
                    <div className='d-flex flex-column'>
                      <Link to={`student-info`} onClick={()=>studentdetail(student)} className='fs-6 text-gray-800 text-hover-primary fw-bold'>
                      {`${student.id+" "+student.name+" "+student.surname}`}
                      </Link>
                    </div>
                  </div>
                  )
                })
              }
               

               
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}


function Search() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SearchSnack />
    </SnackbarProvider>
  );
}

export {Search}