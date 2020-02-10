import React, {useState} from 'react'
import EducationList from './EducationList'
import AddEducationForm from './AddEducationForm'
import EditEducationForm from './EditEducationForm'
import { axiosWithAuth } from '../../utils.js'

const Education = ({employee}) => {

    let employeeEducations = '';

    if ('education' in employee) {
     employeeEducations = employee.education;
    }

    const [educations, setEducations] = useState(employeeEducations ? [employeeEducations] : []);
    const [currentEducation, setCurrentEducation] = useState({ id: null, school_name: '', degree_earned: '' });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const addEducation = education => {

      education && setEducations(educations => [...educations, education]);
    }

    const editEducation = education => {
      setCurrentEducation(education);
      handleEditShow();

    }

    const updateEducation = (id, updateEducation) => {
      setEducations(educations.map(education => (education.id === id ? updateEducation : education)))
    }

    const deleteEducation = id => {

      if (window.confirm("Are you sure your want to delete")) {
        
        axiosWithAuth()
          .delete(`https://droom1.herokuapp.com/api/education/${id}`)
            .then(res => {
              console.log("Delete Education", res);
              setEducations(educations.filter(education => education.id !== id));
            })
            // do stuff with whatever gets returned
            .catch(err => {
              console.log("Error:", err.response);          
        }); 
        
      } 
      
    }

    return (
        <section>
            <div className="section_content">
                <div className="section_top_content">
                    <h2 className="section_title">Education</h2>
                    <div className="section_action">
                        <div><button className="btn btn-success btn-lg" onClick={handleShow}>Add Education</button></div>
                    </div>
                </div>
                <AddEducationForm show={show} handleClose={handleClose} addEducation={addEducation} />
                <EducationList  educations={educations} deleteEducation={deleteEducation} editEducation={editEducation} />
                <EditEducationForm editShow={editShow} handleEditClose={handleEditClose} currentEducation={currentEducation} updateEducation={updateEducation} />
            </div>
        </section>
    )
}

export default Education;