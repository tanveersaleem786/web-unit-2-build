import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const AddSkillForm = ({ errors, touched, values, status, show, handleClose, addSkill }) => {

const handleChange = e => {
    e.preventDefault();     
};

useEffect(() => {
    status && addSkill(status);
}, [status]);

  return (
    <Modal show={show} onHide={handleClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Add Skill</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            {touched.skill_name && errors.skill_name && <div className="alert">
            <strong>Danger!</strong> {errors.skill_name}</div>}
            
            <Field
                type="text"
                name="skill_name"
                placeholder="Skill (ex: Data Analysis)"
                value={values.skill_name}
                />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary"  onClick={handleClose}>
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
    
    mapPropsToValues({skill_name}) {
      return {
        skill_name: skill_name || "",       
      };
    },
  
    validationSchema: Yup.object().shape({
        skill_name: Yup.string().max(30, 'Please enter no more than 30 characters')
      .required( 'Please enter your  skill' )     
    }),
  
    handleSubmit(values, { setStatus, resetForm}) {

      const employee = JSON.parse(localStorage.getItem('employee'));
      values.emp_id = employee.id;
     
      axiosWithAuth()
       .post("https://droom1.herokuapp.com/api/skills", values)
        .then(res => {
          console.log("Add Skill", res);
          setStatus(res.data);
          resetForm();
        })
        // do stuff with whatever gets returned
        .catch(err => {
          console.log("Error:", err.response);          
        });
      // if there's an error, handle it
    }
  })(AddSkillForm);

export default FormikMyForm;