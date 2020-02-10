import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const AddEducationForm = ({ errors, touched, values, status, show, handleClose, addEducation }) => {

const handleChange = e => {
    e.preventDefault();     
};

useEffect(() => {
    status && addEducation(status);
}, [status]);

  return (
    <Modal show={show} onHide={handleClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Add Education</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {touched.school_name && errors.school_name && <div className="alert"><strong>Danger!</strong> {errors.school_name}</div>}
                <label><strong>School Name</strong></label>
                <Field
                type="text"
                name="school_name"
                placeholder="Ex: Boston University"
                value={values.school_name}
                />
                
                {touched.degree_earned && errors.degree_earned && <div className="alert"><strong>Danger!</strong> {errors.degree_earned}</div>}
                <label><strong>Degree Earned</strong></label>
                <Field
                type="text"
                name="degree_earned"
                placeholder="Ex: Bachelor"
                value={values.degree_earned}
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
          school_name: values.school_name || "",
          degree_earned: values.degree_earned || "",       
        };
    },
    
    validationSchema: Yup.object().shape({
      school_name: Yup.string().required( 'Please enter school name' ),
      degree_earned: Yup.string().required( 'Please enter degree earned' )     
    }),
  
    handleSubmit(values, { setStatus, resetForm }) {
        
        const employee = JSON.parse(localStorage.getItem('employee'));
        values.emp_id = employee.id;
       
        axiosWithAuth()
          .post("https://droom1.herokuapp.com/api/education", values)
         
          .then(res => {
            console.log("Add Education", res);
            setStatus(res.data);
            resetForm();
          })
          // do stuff with whatever gets returned
          .catch(err => {
            console.log("Error:", err.response);          
        });
    }

  })(AddEducationForm);

export default FormikMyForm;