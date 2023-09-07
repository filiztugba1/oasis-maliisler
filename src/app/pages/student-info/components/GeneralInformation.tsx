import React from 'react'
import { GeneralInformationModel } from '../models/_generalinformation.model';
import Loading from '../../Loading'
    const GeneralInformation: React.FC<GeneralInformationModel> = (information) => {

        return (
            <div className="card mb-5 mb-xl-10">
                {information.listLoad?<Loading/>:''}
            <div className="card-header pt-9 pb-0">
                <h4>Genel Bilgiler</h4>
            </div>
            <div className="card-body pt-9 pb-0">
                <div className='row'>
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Adı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.name}
                        disabled
                        data-kt-search-element='input'
                    />

                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Soyadı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.surname}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Sınıfı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.class}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Kayıt Yılı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.register_year}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                {information.lisansUstuSinif!=null && information.lisansUstuSinif!=''?
                   <div className='col-md-4'>
                   <label className='col-form-label fw-bold fs-6'>
                       <span>Lisansüstü Sınıf Bilgisi</span>
                   </label>
                   <input
                       type='text'
                       className='form-control form-control-lg form-control-solid'
                       defaultValue={information.lisansUstuSinif}
                       data-kt-search-element='input'
                       disabled
                   />
               </div>:''}
             

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Uyruğu</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.uyruk}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Kayıt Tarihi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.register_date}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Mezuniyet / Ayrılış Tarihi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.mezuniyet_ayrilma_tarihi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                {information.yatay_gecis_kayit_tarihi!==null && information.yatay_gecis_kayit_tarihi!==''?
                    <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Yatay Geçiş Kayıt Tarihi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.yatay_gecis_kayit_tarihi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}
                
                {information.yatay_gecis_kayit_tarihi!==null && information.yatay_gecis_kayit_tarihi!==''?
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Yatay Geçiş Birim ID</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.yatay_gecis_birim_id}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Kayıt Tipi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.kayit_tipi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Tarihçe Durumu</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.std_state}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Tarihçe Durum Tarih</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.state_date}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Burs/İndirim Tipi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.burs_tipi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Burs/İndirim Durumu</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.burs_durumu}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                {information.cap_durumu!==null && information.cap_durumu!==''?
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>ÇAP Durum Tarihi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.cap_durum_tarihi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}
                {information.yandal_durumu!==null && information.yandal_durumu!==''?
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>YDP Durum Tarihi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.yandal_durum_tarihi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}

                {information.cap_durumu!==null && information.cap_durumu!==''?
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>ÇAP Durumu</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.cap_durumu}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}
                {information.yandal_durumu!==null && information.yandal_durumu!==''?
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>YDP Durumu</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.yandal_durumu}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>İkinci Yabancı Dili</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.ikinci_yabanci_dil}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Mütercim Tercümanlık Dil</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.mut_tercumanlik_dili}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Disiplin Cezası</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.disiplin_cezasi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>TC Kimlik No</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.tc_kimlik_no}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Danışmanı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.danisman}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                {information.cap_durumu!==null && information.cap_durumu!==''?
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>ÇAP Koordinatör Adı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.cap_danisman}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}

                {information.yandal_durumu!==null && information.yandal_durumu!==''?
                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>YDP Koordinatör Adı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.yandal_danisman}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>:''}

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Öğrencilik Hakkını Kaybettiği Tarih</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.ogr_hakkini_kaybettigi_tarih}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>GNO HESABI</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.gno_hesabi}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>TABİ OLDUĞU PLAN</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.tabi_oldugu_plan}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Lisansüstü Ücret Bilgisi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.lisans_ustu_ucret}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Yöksis Aktarımı İçin (Aynı Programı Tekrar Okuma)</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.ayni_programi_tekrar_okuma}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Öğrencinin Tabi Olduğu Müfredat Adı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.tabi_olunan_musredat}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <div className='col-md-4'>
                    <label className='col-form-label fw-bold fs-6'>
                        <span>Öğrenciye ilave burs/indirim tanımlı</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        defaultValue={information.ilave_burs}
                        data-kt-search-element='input'
                        disabled
                    />
                </div>

                <br/>
                <br/><br/><br/><br/>

                <br/><br/><br/><br/>
                </div>

            </div>
            </div>
        )
    }

export default GeneralInformation;
