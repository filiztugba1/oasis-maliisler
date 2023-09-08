/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/home'
        icon='/media/icons/duotune/general/gen022.svg'
        // title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
        title='Anasayfa'
      />
      {/* <SidebarMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div> */}

      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='İstatistikler'
        icon='/media/icons/duotune/art/art002.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/definitive-records' title='Kesin Kayıtlar' menuTitle='İstatistikler / Kesin Kayıtlar' hasBullet={true} />
        <SidebarMenuItem to='/student-list' title='Öğrenci Listesi' menuTitle='İstatistikler / Öğrenci Listesi' hasBullet={true} />
        <SidebarMenuItem to='/number-of-student-scholarships' title='Öğrenci Burs Sayıları' menuTitle='İstatistikler / Öğrenci Burs Sayıları' hasBullet={true} />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Kontrol Listeleri'
        icon='/media/icons/duotune/general/gen005.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/summer-fee-refund-requests' title='Yaz Okulu Ücreti İade Talepleri' menuTitle='Kontrol Listeleri / Yaz Okulu Ücreti İade Talepleri' hasBullet={true} />
        <SidebarMenuItem to='/cari-name-list' title='Cari İsim Listesi' menuTitle='Kontrol Listeleri / Cari İsim Listesi' hasBullet={true} />
        </SidebarMenuItemWithSub>

 

      <SidebarMenuItemWithSub
          to='/crafted/accounts'
          title='Finansal İşlemler'
          icon='/media/icons/duotune/general/gen051.svg'
          fontIcon='bi-person'
        >
          <SidebarMenuItem to='/fee-payments-list' title='Tüm Ödemeler Listesi' menuTitle='Finansal İşlemler / Tüm Ödemeler Listesi' hasBullet={true} />
          <SidebarMenuItem to='/all-payables-list' title='Tüm Borçlar Listesi' menuTitle='Finansal İşlemler / Tüm Borçlar Listesi' hasBullet={true} />
          <SidebarMenuItem to='/debt-check-list' title='Borç Kontrol Listesi' menuTitle='Finansal İşlemler / Borç Kontrol Listesi' hasBullet={true} />
          <SidebarMenuItem to='/installment' title='Taksit' menuTitle='Finansal İşlemler / Taksit' hasBullet={true} />
        <SidebarMenuItem to={`param-fees`} title='Yeni öğrencilere ait parametre tablosu' menuTitle='Finansal İşlemler / Yeni öğrencilere ait parametre tablosu' hasBullet={true} />
       </SidebarMenuItemWithSub>


      {
        localStorage.getItem('search-student-id')!=undefined && localStorage.getItem('search-student-id')!=''?
        <>
          <div className='menu-item'>
          <div className='menu-content pt-8 pb-2'>
            <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{`${localStorage.getItem('search-name')} ${localStorage.getItem('search-surname')}`}</span>
          </div>
        </div>
        
        <SidebarMenuItem  to={`student-info`} title='Öğrenci Detay Bilgileri' menuTitle={`${localStorage.getItem('search-name')} ${localStorage.getItem('search-surname')} / Öğrenci Detay Bilgileri`} hasBullet={true} />
        <SidebarMenuItem  to={`student-transkript`} title='Transkript' menuTitle={`${localStorage.getItem('search-name')} ${localStorage.getItem('search-surname')} / Transkript`} hasBullet={true} />
        <SidebarMenuItem  to={`student-payments`} title='Ödeme Bilgileri' menuTitle={`${localStorage.getItem('search-name')} ${localStorage.getItem('search-surname')} / Ödeme Bilgileri`} hasBullet={true} />
        <SidebarMenuItem  to={`student-history`} title='Öğrencinin Tarihçe Listeleri' menuTitle={`${localStorage.getItem('search-name')} ${localStorage.getItem('search-surname')} / Öğrencinin Tarihçe Listeleri`} hasBullet={true} />
        <SidebarMenuItem to={`relation-mali`} title='Mali İşler İlişik Bilgileri' menuTitle={`${localStorage.getItem('search-name')} ${localStorage.getItem('search-surname')} / Mali İşler İlişik Bilgileri`} hasBullet={true} />
       
   </>
        :''
      }
   

      


{/* 
 <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        // title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
        title='dashboard'
      />

      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Ders Kayıtları'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      /> */}
      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div>  */}
    </>
  )
}

export {SidebarMenuMain}
