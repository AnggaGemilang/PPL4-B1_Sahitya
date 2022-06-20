import React, { useState, useEffect } from 'react'
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
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,  
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem, 
  CFormLabel,
  CAlert,
  CForm,
} from '@coreui/react'
import { cilSearch, cilPlus } from '@coreui/icons'
import { useLocation, useNavigate } from "react-router-dom";
import CIcon from '@coreui/icons-react'
import GradeAPI from '../../../config/admin/GradeAPI'

const Grade = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [grades, setGrades] = useState([])
  const [message, setMessage] = useState("");
  const [chosenGrade, setChosenGrade] = useState({
    visible: false,
    name: "",
    id: 0,
  })

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[grade_name][$contains]=${document.getElementById("filter_nama").value}`
    }

    GradeAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setGrades(res.data)
        } else {
          setGrades([])
        }
      }
    )
  }

  const getData = () => {
    GradeAPI.get().then((res) => {
      setGrades(res.data)
      console.log(res.data)
    })
  }

  const deleteData = () => {
    GradeAPI.delete(chosenGrade.id).then((res) => {
      setChosenGrade({ visible:false })
      setMessage("Grade has deleted successfully")  
      getData()
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CAccordion>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
            <CAccordionBody>
              <CForm onSubmit={filterSearch}>
                <CRow className='mt-2'>
                  <CCol xs={12}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama Grade</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Masukkan Nama Grade . . ."
                    />
                  </CCol>
                </CRow>                     
                <CRow>
                  <hr className='mt-4' style={{ marginLeft: "12px", width: "97.6%" }} />
                </CRow>
                <CRow>
                  <CCol style={{ display: "flex", justifyContent: "right" }}>
                    <CButton
                        type='submit'
                        color='primary'
                        style={{ width:'10%', borderRadius: "50px", fontSize: "14px" }} >
                          <CIcon icon={cilSearch} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                          Cari
                      </CButton>                                          
                    </CCol>
                  </CRow>
                </CForm>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>        
          <CCol xs={12} className="mt-3">
            { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
          </CCol> 
          <CCard className="mb-4 mt-3">
            <CCardHeader>
              <strong>Data Grade</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CButton
                    color='primary'
                    style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                    onClick={() => navigate('/grade/tambah', {state: { status: 'tambah' } }) } >
                    <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                    Tambah Grade
                  </CButton>
                </CCol>
              </CRow>
              <CRow className='pl-2 mr-5'>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama Grade</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { grades.map( (grade, index) =>
                      <CTableRow key={grade.id}>
                        <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                        <CTableDataCell>{grade?.attributes?.grade_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color={'warning'} 
                            variant="outline" 
                            onClick={() => navigate(
                              '/grade/edit', 
                              {state: { data: grade, status: 'edit' }})}>
                            Edit</CButton>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => setChosenGrade({ 
                              visible: true, 
                              id: grade.id, 
                              name: grade.attributes.grade_name, 
                            })}>Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
              <CModal backdrop="static" visible={chosenGrade.visible} onClose={() => setChosenGrade({ visible: false })}>
                <CModalHeader>
                  <CModalTitle>Are You Sure?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  This will remove {chosenGrade.name} permanently
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setChosenGrade({ visible: false })}>
                    Close
                  </CButton>
                  <CButton color="danger" onClick={() => deleteData()}>Delete</CButton>
                </CModalFooter>
              </CModal>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
}

export default Grade