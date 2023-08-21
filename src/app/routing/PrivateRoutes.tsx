import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
// import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import HomePage from '../pages/home/HomePage'
import StudentDetailPage from '../pages/student-info/StudentDetailPage'
import Transkript from '../pages/transkript/Transkript'
import StudentPayments from '../pages/student-payments/StudentPayments'
import StudentHistory from '../pages/student-history/StudentHistory'
import DefinitiveRecords from '../pages/definitive-records/DefinitiveRecords'
import StudentListt from '../pages/student-list/StudentList'
import NumberOfStudentScholarships from '../pages/number-of-student-scholarships/NumberOfStudentScholarships'
import SummerFeeRefundRequestList from '../pages/summer-fee-refund-requests/SummerFeeRefundRequests'
import FeePaymentsList from '../pages/fee-payments-list/FeePaymentsList'
import AllPayablesList from '../pages/all-payables-list/AllPayablesList'
import DebtCheckList from '../pages/debt-check-list/DebtCheckList'
import Installment from '../pages/installment/Installment'
import RelationMali from '../pages/relation-mali/RelationMali'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='home' element={<HomePage />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='student-info' element={<StudentDetailPage />} />
        <Route path='student-payments' element={<StudentPayments />} />
        <Route path='student-history' element={<StudentHistory />} />
        <Route path='student-transkript' element={<Transkript />} />
        <Route path='relation-mali' element={<RelationMali />} />
        <Route path='definitive-records' element={<DefinitiveRecords />} />
        <Route path='student-list' element={<StudentListt />} />
        <Route path='number-of-student-scholarships' element={<NumberOfStudentScholarships />} />
        <Route path='summer-fee-refund-requests' element={< SummerFeeRefundRequestList/>} />
        <Route path='fee-payments-list' element={< FeePaymentsList/>} />
        <Route path='all-payables-list' element={< AllPayablesList/>} />
        <Route path='debt-check-list' element={< DebtCheckList/>} />
        <Route path='installment' element={< Installment/>} />
        {/* <Route path='menu-test' element={<MenuTestPage />} /> */}
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='home/*'
          element={
            <SuspensedView>
              <HomePage />
            </SuspensedView>
          }
        />
         <Route
          path='student-info/*'
          element={
            <SuspensedView>
              <StudentDetailPage />
            </SuspensedView>
          }
        />
         <Route
          path='student-payments/*'
          element={
            <SuspensedView>
              <StudentPayments />
            </SuspensedView>
          }
        />
         <Route
          path='student-history/*'
          element={
            <SuspensedView>
              <StudentHistory />
            </SuspensedView>
          }
        />


        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
