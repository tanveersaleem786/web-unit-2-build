import React, {useState} from 'react'
import ResumeList from './ResumeList'
import AddResumeForm from './AddResumeForm'
import EditResumeForm from './EditResumeForm'
import { axiosWithAuth } from '../../utils.js'

const Resume = ({employee}) => {

    let employeeResumes = '';

    if ('resume' in employee) {
      employeeResumes = employee.resume;
    }

    const [resumes, setResumes] = useState(employeeResumes ? [employeeResumes] : []);
    const [currentResume, setCurrentResume] = useState({ id: null, company_name: '', title: '', years: '' });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const addResume = resume => {

      resume && setResumes(resumes => [...resumes, resume]);
    }

    const editResume = resume => {
      setCurrentResume(resume);
      handleEditShow();

    }

    const updateResume = (id, updateResume) => {
      setResumes(resumes.map(resume => (resume.id === id ? updateResume : resume)))
    }

    const deleteResume = id => {

      if (window.confirm("Are you sure your want to delete")) {

        axiosWithAuth()
          .delete(`https://droom1.herokuapp.com/api/resume/${id}`)
            .then(res => {
              console.log("Delete Resume", res);
              setResumes(resumes.filter(resume => resume.id !== id));
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
                    <h2 className="section_title">Resume</h2>
                    <div className="section_action">
                        <div><button className="btn btn-success btn-lg" onClick={handleShow}>Add Resume</button></div>
                    </div>
                </div>
                <AddResumeForm show={show} handleClose={handleClose} addResume={addResume} />
                <ResumeList  resumes={resumes} deleteResume={deleteResume} editResume={editResume} />
                <EditResumeForm editShow={editShow} handleEditClose={handleEditClose} currentResume={currentResume} updateResume={updateResume} />
            </div>
        </section>
    )
}

export default Resume;