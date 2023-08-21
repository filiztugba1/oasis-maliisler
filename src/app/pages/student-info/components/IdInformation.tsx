import React from 'react'
import { IdInformationModel } from '../models/_idinformation.model'

const IdInformation: React.FC<IdInformationModel> = (information) => {
  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-header pt-9 pb-0">
        <h4>Kimlik Bilgileri</h4>
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
                value={information.adi}
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
                value={information.soyadi}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>TC Kimlik No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.tc}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Öğrenci Kimlik No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.ogr_kimlik_no}
                data-kt-search-element='input'
            />
        </div>


        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Seri No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.seri_no}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Medeni Hali</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.medeni_hal}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Baba Adı</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.baba_adi}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Kan Grubu</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.kan_grubu}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Anne Adı</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.anne_adi}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Uyruğu</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.uyruk}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Cinsiyeti</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.cinsiyet}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Dini</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.dini}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Doğum Tarihi</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.dogum_tarihi}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Doğum Yeri</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.dogum_yeri}
                data-kt-search-element='input'
            />
        </div>

        {+information.sex!==2?
         <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Askerlik Durumu</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.askerlik_durumu}
                data-kt-search-element='input'
            />
        </div>:''}
       
        {+information.sex!==2?
        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Askerlik Şubesi</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.askerlik_subesi}
                data-kt-search-element='input'
            />
        </div>:''}

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Posta Kodu</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.posta_kodu}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Nüf. Kayıtlı Olduğu İl</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.nif_kayit_il}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Nüf. Kayıtlı Oduğu İlçe</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.nif_kayit_ilce}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Mahalle/Köy</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.mahalle}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Cilt No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.cild_no}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Sıra No/Sayfa No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.sira_no}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Cüzdan Kayıt No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.cuzdan_kayit_no}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Hane</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.hane}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Kayıt No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.kayit_no}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Veriliş Nedeni</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.verilis_nedeni}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Veriliş Tarihi</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.verilme_tarihi}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Verildigi Nüfus Dairesi</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.verildigi_nifus_dairesi}
                data-kt-search-element='input'
            />
        </div>

        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Vergi Kimlik No</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.vergi_kimlik_no}
                data-kt-search-element='input'
            />
        </div>
        <div className='col-md-4'>
            <label className='col-form-label fw-bold fs-6'>
                <span>Vergi Dairesi</span>
              </label>
            <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={information.vergi_dairesi}
                data-kt-search-element='input'
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
export default IdInformation;