import React from 'react'
import { ContactInformationModel } from '../models/_contactimformation.model'

const ContactInformation: React.FC<ContactInformationModel> = (information) => {
  
  return (
    <>
    <div className="card mb-5 mb-xl-10">
      <div className="card-header pt-9 pb-0">
        <h4>Öğrenci Adresi ve İletişim Bilgileri</h4>
      </div>
      <div className="card-body pt-9 pb-0">
        <div className='row'>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 1</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.address1}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 2</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.address2}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 3</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.address3}
                    data-kt-search-element='input'
                />

            </div>
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
                    <span>Şehir</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.il}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Telefon 1</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.telefon1}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Telefon 2</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.telefon2}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Cep Telefonu</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.cep_tel}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Cep Tel Mezun</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.cep_mezun_tel}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>AKADEMİK BİLGİLERİ</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.akademik_bilgi}
                    data-kt-search-element='input'
                />

            </div>
          
        </div>
    </div>
    <br/>
    </div>
    <div className="card mb-5 mb-xl-10">
      <div className="card-header pt-9 pb-0">
        <h4>Aile Adresi ve İletişim Bilgileri</h4>
      </div>
      <div className="card-body pt-9 pb-0">
      <div className='row'>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 1</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.aile_address1}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 2</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.aile_address2}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 3</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.aile_address3}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Posta Kodu</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.aile_posta_kodu}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Şehir</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.aile_sehir}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Baba Cep Tel</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.baba_cep_tel}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Anne Cep Tel</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.anne_cep_tel}
                    data-kt-search-element='input'
                />

            </div>
         
        
          
        </div>
    </div>
    <br/>
    </div>
    <div className="card mb-5 mb-xl-10">
      <div className="card-header pt-9 pb-0">
        <h4>Acil Durum İçin İletişim Bilgileri</h4>
      </div>
      <div className="card-body pt-9 pb-0">
      <div className='row'>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 1</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_address1}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 2</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_address2}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 3</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_address3}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Posta Kodu</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_posta_kodu}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Şehir</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_sehir}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Telefon</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_telefon}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Cep Telefonu</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_cep_tel}
                    data-kt-search-element='input'
                />

            </div>

            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>E-posta</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_mail}
                    data-kt-search-element='input'
                />

            </div>

            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Acil Durumlarda Aranacak Kişi</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.acil_durumda_aranacak}
                    data-kt-search-element='input'
                />

            </div>

            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Yakınlık Derecesi</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.yakinlik}
                    data-kt-search-element='input'
                />

            </div>
         
        
          
        </div>
    </div>
    <br/>
    </div>
    <div className="card mb-5 mb-xl-10">
      <div className="card-header pt-9 pb-0">
        <h4>Fatura Adresi ve Bilgileri</h4>
      </div>
      <div className="card-body pt-9 pb-0">
      <div className='row'>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 1</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_address1}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 2</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_address2}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Adres 3</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_address3}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Posta Kodu</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_posta_kodu}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Şehir</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_sehir}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                    <span>Telefon</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_telefon}
                    data-kt-search-element='input'
                />

            </div>
            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Fatura Vergi Numarası</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_vergi_numarasi}
                    data-kt-search-element='input'
                />

            </div>

            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Fatura Vergi Dairesi</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_vergi_dairesi}
                    data-kt-search-element='input'
                />

            </div>

            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>Cep Telefonu</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_cep_tel}
                    data-kt-search-element='input'
                />

            </div>

            <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>E-posta</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.fatura_mail}
                    data-kt-search-element='input'
                />

            </div>
         
        
          
        </div>
    </div>
    <br/>
    </div>
    <div className="card mb-5 mb-xl-10">
      <div className="card-header pt-9 pb-0">
        <h4>YURTTA KALMA DURUMU</h4>
      </div>
      <div className="card-body pt-9 pb-0">
      <div className='col-md-4'>
                <label className='col-form-label fw-bold fs-6'>
                <span>YURTTA KALMA DURUMU</span>
                </label>
                <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    defaultValue={information.yurttami}
                    data-kt-search-element='input'
                />

            </div>
    </div>

    <br/>
    </div>
    
    </>

    
  )
}

export default  ContactInformation;