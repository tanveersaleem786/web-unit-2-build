import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const AddProfileForm = ({ errors, touched, values, status, show, handleClose, addProfile }) => {

const handleChange = e => {
    e.preventDefault();     
};

useEffect(() => {
    status && addProfile(status);    
}, [status]);

  return (
    <Modal show={show} onHide={handleClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Add Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {touched.name && errors.name && <div className="alert"> 
                <strong>Danger!</strong> {errors.name}</div>}
                <label><strong>Name</strong></label>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    />

                    {touched.portfolio_link && errors.portfolio_link && <div className="alert">
                    <strong>Danger!</strong> {errors.portfolio_link}</div>}
                    
                    <label><strong>Portfolio Link</strong></label>
                    <Field
                        type="text"
                        name="portfolio_link"
                        placeholder="Portfolio Link"
                        value={values.portfolio_link}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Close
                    </button>
                    <button className='btn btn-primary' type="submit">
                    Save Changes
                    </button>
                </Modal.Footer>
            </Form>
    </Modal>               
  )
}

// higher order component
const FormikMyForm = withFormik({
    
    mapPropsToValues(values) {
        return {
          name: values.name || "",
          portfolio_link: values.portfolio_link || ""
        };
    },
    
    validationSchema: Yup.object().shape({
        name: Yup.string().required( 'Please enter your name' )       
    }),
  
    handleSubmit(values, { setStatus, resetForm }) {
        
        const token = localStorage.getItem('token')
        const user = JSON.parse(atob(token.split('.')[1])) 
        values.user_id = user.id;
       
        axiosWithAuth()
          .post("https://droom1.herokuapp.com/api/employee", values)
         
          .then(res => {
            console.log("Add Profile", res);
            setStatus(res.data);
            localStorage.setItem('employee', JSON.stringify(res.data));  
            resetForm();
          })
          // do stuff with whatever gets returned
          .catch(err => {
            console.log("Error:", err.response);          
        });
    }

  })(AddProfileForm);

export default FormikMyForm;