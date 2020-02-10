import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const EditEducationForm = ({ errors, touched, values, status, editShow, handleEditClose, currentEducation, updateEducation }) => {
  
  const handleChange = e => {
      e.preventDefault();     
  };

  useEffect(() => {
    status && updateEducation(status.id, status);
  }, [status]);

  return (
    <Modal show={editShow} onHide={handleEditClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Edit Education</Modal.Title>
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
  
  mapPropsToValues({currentEducation}) {
        return {
            id: currentEducation.id,  
            school_name: currentEducation.school_name,
            degree_earned: currentEducation.degree_earned,    
        };
    },
  
    validationSchema: Yup.object().shape({
        school_name: Yup.string().required( 'Please enter school name' ),
        degree_earned: Yup.string().required( 'Please enter degree earned')
    }),
  
    handleSubmit(values, { setStatus}) {
    
      axiosWithAuth()
       .put(`https://droom1.herokuapp.com/api/education/${values.id}`, values)
        .then(res => {
          console.log("Update Education", res);
          setStatus(res.data);
        })
        // do stuff with whatever gets returned
        .catch(err => {
          console.log("Error:", err.response);          
        });
      // if there's an error, handle it
    }
  })(EditEducationForm);

export default FormikMyForm;