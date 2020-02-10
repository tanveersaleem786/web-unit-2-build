import React, {useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'

import { Form, Field, withFormik } from "formik"
import * as Yup from "yup";
import { axiosWithAuth } from '../../utils.js'

const EditSkillForm = ({ errors, touched, values, status, editShow, handleEditClose, currentSkill, updateSkill }) => {
  
  const handleChange = e => {
      e.preventDefault();     
  };

  useEffect(() => {
    status && updateSkill(status.id, status);
  }, [status]);

  return (
    <Modal show={editShow} onHide={handleEditClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Edit Skill</Modal.Title>
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
  
  mapPropsToValues({currentSkill}) {
    
      return {
        id: currentSkill.id,
        skill_name: currentSkill.skill_name
      };
    },
  
    validationSchema: Yup.object().shape({
        skill_name: Yup.string().max(30, 'Please enter no more than 30 characters')
      .required( 'Please enter your  skill' )     
    }),
  
    handleSubmit(values, { setStatus}) {
    
      axiosWithAuth()
       .put(`https://droom1.herokuapp.com/api/skills/${values.id}`, values)
        .then(res => {
          console.log("Update Skill", res);
          setStatus(res.data);
        })
        // do stuff with whatever gets returned
        .catch(err => {
          console.log("Error:", err.response);          
        });
      // if there's an error, handle it
    }
  })(EditSkillForm);

export default FormikMyForm;