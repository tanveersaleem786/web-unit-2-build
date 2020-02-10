import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const EditProfileForm = ({ errors, touched, values, status, editShow, handleEditClose, employee, updateProfile }) => {
  
  const handleChange = e => {
      e.preventDefault();     
  };

  useEffect(() => {
    status && updateProfile(status);
  }, [status]);

  return (
    <Modal show={editShow} onHide={handleEditClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
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
                    <button type="button" className="btn btn-secondary"  onClick={handleEditClose}>
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

  enableReinitialize: true,
  
  mapPropsToValues({employee}) {
    
      return {
        id: employee.id,
        name: employee.name,
        portfolio_link: employee.portfolio_link
      };
    },
  
    validationSchema: Yup.object().shape({
        name: Yup.string().required( 'Please enter your name' )     
    }),
  
    handleSubmit(values, { setStatus}) {
    
      axiosWithAuth()
       .put(`https://droom1.herokuapp.com/api/employee/${values.id}`, values)
        .then(res => {
          console.log("Update Profile", res);
          setStatus(res.data);
        })
        // do stuff with whatever gets returned
        .catch(err => {
          console.log("Error:", err.response);          
        });
      // if there's an error, handle it
    }
  })(EditProfileForm);

export default FormikMyForm;