import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
} from '@coreui/react'
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'
import { Link } from 'react-router-dom'

export class DataPenguji extends Component {
  constructor(props) {
    super(props)
    this.state = {
      examiners: [],
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    DataPengujiAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        examiners: res.data
      })
    })
  }
  deleteData(id){
    DataPengujiAPI.delete(id).then((res) => {
      this.setState({
        Response: res.data.id
      })
    }, () => {
      this.getData()
    })
  }
  render(){
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Data Penguji</strong>
            </CCardHeader>
            <CCardBody className='mt-3'>
              <CRow>
                <CCol xs={9}>
                  <CForm>
                      <CFormInput
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="Masukkan Kata Kunci Pencarian . . ."
                      />
                  </CForm>
                </CCol>
                <CCol>
                  <Link to={'/tambahpenguji'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Penguji
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
                <CTable striped className='mt-3'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                      <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jabatan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Grade</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.examiners.map(examiner =>
                      <CTableRow key={examiner.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>
                          <img src={"http://localhost:1337" + examiner.attributes.employee.data.attributes.Photo.data.attributes.formats.thumbnail.url} alt="user icon" />
                        </CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.Name}</CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.NIP}</CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.Position}</CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.grade.data.attributes.grade_name}</CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.level.data.attributes.level_name}</CTableDataCell>
                        <CTableDataCell>
                          <Link to={'/tambahpeserta/edit'}>
                            <CButton
                              color='warning'
                              variant="outline"  >
                                Edit
                            </CButton>
                          </Link>
                          <Link to={'/tambahpeserta'}>
                            <CButton
                              color='danger'
                              variant="outline" 
                              style={{marginLeft: '10px'}} >
                                Hapus
                            </CButton>
                          </Link>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default DataPenguji
