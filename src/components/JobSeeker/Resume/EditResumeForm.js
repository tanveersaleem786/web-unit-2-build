import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const EditResumeForm = ({ errors, touched, values, status, editShow, handleEditClose, currentResume, updateResume }) => {
  
  const handleChange = e => {
      e.preventDefault();     
  };

  useEffect(() => {
    status && updateResume(status.id, status);
  }, [status]);

  return (
    <Modal show={editShow} onHide={handleEditClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Edit Resume</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {touched.company_name && errors.company_name && <div className="alert"><strong>Danger!</strong> {errors.company_name}</div>}
                <label><strong>Company Name</strong></label>
                <Field
                type="text"
                name="company_name"
                placeholder="Ex: Microsoft"
                value={values.company_name}
                />
                
                {touched.title && errors.title && <div className="alert"><strong>Danger!</strong> {errors.title}</div>}
                <label><strong>Title</strong></label>
                <Field
                type="text"
                name="title"
                placeholder="Ex: PHP Developer"
                value={values.title}
                />

                {touched.years && errors.years && <div className="alert"><strong>Danger!</strong> {errors.years}</div>}
                <label><strong>Years</strong></label>
                <Field
                type="text"
                name="years"
                placeholder="Years"
                value={values.years}
                />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary"  onClick={handleEditClose}>
                Close
                </button>
                <button type="submit" className='btn btn-primary'>
                Save Changes
                </button>
            </Modal.Footer>
        </Form>
    </Modal>                                   
  )
}

// higher order component
const FormikMyForm = withFormik({

  enableReinitialize: true,
  
  mapPropsToValues({currentResume}) {
        return {
            id: currentResume.id,  
            company_name: currentResume.company_name,
            title: currentResume.title, 
            years: currentResume.years   
        };
    },
  
    validationSchema: Yup.object().shape({
        company_name: Yup.string().required( 'Please enter company name' ),
        title: Yup.string().required( 'Please enter title' ),
        years: Yup.string().required( 'Please enter years')
    }),
  
    handleSubmit(values, { setStatus}) {
    
      axiosWithAuth()
       .put(`https://droom1.herokuapp.com/api/resume/${values.id}`, values)
        .then(res => {
          console.log("Update Resume", res);
          setStatus(res.data);
        })
        // do stuff with whatever gets returned
        .catch(err => {
          console.log("Error:", err.response);          
        });
      // if there's an error, handle it
    }
  })(EditResumeForm);

export default FormikMyForm;