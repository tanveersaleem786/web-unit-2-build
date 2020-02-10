import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const AddResumeForm = ({ errors, touched, values, status, show, handleClose, addResume }) => {

const handleChange = e => {
    e.preventDefault();     
};

useEffect(() => {
    status && addResume(status);
}, [status]);

  return (
    <Modal show={show} onHide={handleClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Add Resume</Modal.Title>
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
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
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
    
    mapPropsToValues( values ) {
        return {
            company_name: values.company_name || "",
            title: values.title || "",  
            years: values.years || ""     
        };
    },
    
    validationSchema: Yup.object().shape({
        company_name: Yup.string().required( 'Please enter company name' ),
        title: Yup.string().required( 'Please enter title' ),
        years: Yup.string().required( 'Please enter years')
    }),
  
    handleSubmit(values, { setStatus, resetForm }) {
        
        const employee = JSON.parse(localStorage.getItem('employee'));
        values.emp_id = employee.id;
       
        axiosWithAuth()
         .post("https://droom1.herokuapp.com/api/resume", values)
         
          .then(res => {
            console.log("Add Resume", res);
            setStatus(res.data);
            resetForm();
          })
          // do stuff with whatever gets returned
          .catch(err => {
            console.log("Error:", err.response);          
        });
    }

  })(AddResumeForm);

export default FormikMyForm;