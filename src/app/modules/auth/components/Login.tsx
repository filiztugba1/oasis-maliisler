/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import { SnackbarProvider, useSnackbar } from 'notistack';
const loginSchema = Yup.object().shape({
  email: Yup.string()
    // .email('Wrong email format')
    // .min(3, 'Minimum 3 symbols')
    // .max(50, 'Maximum 50 symbols')
    .required('Kullanıcı adı zorunlu'),
  password: Yup.string()
    .min(3, 'Minimum 3 karakter')
    .max(50, 'Maksimum 50 karakter')
    .required('Şifre zorunlu'),
})

const initialValues = {
  // email: 'fcurukcu',
  // password: 'Curukcu1.',
   email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/


const LoginSnack: React.FC = () => {
  
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.email, values.password)
        saveAuth(auth)
        setLoading(false)
        if(auth.status===500)
        {
          enqueueSnackbar(auth.data, { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right', } });
        }
        else
        {
          const {data: user} = await getUserByToken(auth.api_token)
          setCurrentUser(user)
          localStorage.setItem('user',JSON.stringify({
            cell_nr: user.data.cell_nr,email: user.data.email,name:user.data.name,sub_type: user.data.sub_type,surname: user.data.surname,tckimlik: user.data.tckimlik,title: user.data.title,type: user.data.type
            ,username: user.data.username,academicYear:user.data.academicYear,academicSemester:user.data.academicSemester,academicSemesterText:(user.data.academicSemester===1?'Güz':(user.data.academicSemester===2?'Bahar':'Yaz'))}))
  
        }
      
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'      
    >
      <div className='text-center mb-11'>
      <img
            alt='Logo'
            src={toAbsoluteUrl('/media/oasis/oasis-logo.png')}
            className='app-sidebar-logo-default'
            
          />
        <div className='text-gray-500 fw-semibold fs-6'>Mali işler Modülü</div>
      </div>
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Kullanıcı Adı</label>
        <input
          placeholder='Kullanıcı Adı'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
   
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Şifre</label>
        <input
          type='password'
          placeholder='.........'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
     

    
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Giriş</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    
    </form>
  )
}

function Login() {
  return (
    <SnackbarProvider maxSnack={3}>
      <LoginSnack />
    </SnackbarProvider>
  );
}
export default Login
