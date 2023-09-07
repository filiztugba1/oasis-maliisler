import React from 'react'
import { IdInformationModel } from '../models/_idinformation.model'
import Loading from '../../Loading'
const IdInformation: React.FC<IdInformationModel> = (information) => {
  return (
    <div className="card mb-5 mb-xl-10">
        {information.listLoad?<Loading/>:''}
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
                defaultValue={information.adi}
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
                defaultValue={information.soyadi}
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
                defaultValue={information.tc}
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
                defaultValue={information.ogr_kimlik_no}
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
                defaultValue={information.seri_no}
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
                defaultValue={information.medeni_hal}
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
                defaultValue={information.baba_adi}
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
                defaultValue={information.kan_grubu}
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
                defaultValue={information.anne_adi}
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
                defaultValue={information.uyruk}
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
                defaultValue={information.cinsiyet}
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
                defaultValue={information.dini}
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
                defaultValue={information.dogum_tarihi}
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
                defaultValue={information.dogum_yeri}
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
                defaultValue={information.askerlik_durumu}
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
                defaultValue={information.askerlik_subesi}
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
                defaultValue={information.posta_kodu}
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
                defaultValue={information.nif_kayit_il}
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
                defaultValue={information.nif_kayit_ilce}
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
                defaultValue={information.mahalle}
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
                defaultValue={information.cild_no}
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
                defaultValue={information.sira_no}
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
                defaultValue={information.cuzdan_kayit_no}
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
                defaultValue={information.hane}
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
                defaultValue={information.kayit_no}
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
                defaultValue={information.verilis_nedeni}
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
                defaultValue={information.verilme_tarihi}
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
                defaultValue={information.verildigi_nifus_dairesi}
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
                defaultValue={information.vergi_kimlik_no}
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
                defaultValue={information.vergi_dairesi}
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