/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import HomePage from '../home/HomePage'

// const DashboardPage: FC = () => (
//   <>
//     {/* <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
//       <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
//         <CardsWidget20
//           className='h-md-50 mb-5 mb-xl-10'
//           description='Active Projects'
//           color='#F1416C'
//           img={toAbsoluteUrl('/media/patterns/vector-1.png')}
//         />
//         <CardsWidget7
//           className='h-md-50 mb-5 mb-xl-10'
//           description='Professionals'
//           icon={false}
//           stats={357}
//           labelColor='dark'
//           textColor='gray-300'
//         />
//       </div>
//       <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
//         <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' />
//         <ListsWidget26 className='h-lg-50' />
//       </div>
//       <div className='col-xxl-6'>
//         <EngageWidget10 className='h-md-100' />
//       </div>
//     </div>
//     <div className='row gx-5 gx-xl-10'>
//       <div className='col-xxl-6 mb-5 mb-xl-10'>
//       </div>
//       <div className='col-xxl-6 mb-5 mb-xl-10'>
//       </div>
//     </div>
//     <div className='row gy-5 gx-xl-8'>
//       <div className='col-xxl-4'>
//         <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
//       </div>
//       <div className='col-xl-8'>
//         <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
//       </div>
//     </div>
//     <div className='row gy-5 g-xl-8'>
//       <div className='col-xl-4'>
//         <ListsWidget2 className='card-xl-stretch mb-xl-8' />
//       </div>
//       <div className='col-xl-4'>
//         <ListsWidget6 className='card-xl-stretch mb-xl-8' />
//       </div>
//       <div className='col-xl-4'>
//         <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
//       </div>
//     </div>

//     <div className='row g-5 gx-xxl-8'>
//       <div className='col-xxl-4'>
//         <MixedWidget8
//           className='card-xxl-stretch mb-xl-3'
//           chartColor='success'
//           chartHeight='150px'
//         />
//       </div>
//       <div className='col-xxl-8'>
//         <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
//       </div>
//     </div> */}
//   </>
// )

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <HomePage />
    </>
  )
}

export {DashboardWrapper}
