import React, {useState, useEffect} from 'react'
import Skill from '../Skill/Skill'
import Resume from '../Resume/Resume'
import Education from '../Education/Education'


import Modal from 'react-bootstrap/Modal'
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css"
import '../JobSeeker.css'

import { axiosWithAuth } from '../../utils.js'

const ShowProfile = ({ errors, touched, values, status }) => {

   const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = e => {
        e.preventDefault();     
    };

    const [employee, setEmployee] = useState([]);
    const [profile, setProfile] = useState([]);
   
    useEffect(() => {
        
        axiosWithAuth()
            .get(`https://droom1.herokuapp.com/api/employee/${getUserId()}`)
            // just put in a url you want data from
            .then(res => {
                setEmployee(res.data)
                console.log("Success:", res);
            })
            // do stuff with whatever gets returned
            .catch(err => {
            console.log("Error:", err.response);           
        });

    }, []);


    useEffect(() => {
      status && setProfile(profile => [...profile, status]);
    }, [status]);
    
   
    return (

        <div>
            {employee.length === 0 ? (
                <div className="profile-content">
                 <section>
                <div className="section_content">
                    <div className="section_top_content">
                        <div className="section_action">
                            <div><button className="btn btn-success btn-lg" onClick={handleShow}>Add Profile</button></div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Form>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Profile</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                {touched.name && errors.name && <div class="alert"><span class="closebtn" onClick={handleChange}>&times;</span> 
                                <strong>Danger!</strong> {errors.name}</div>}
                                <label><strong>Name</strong></label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={values.name}
                                    />

                                    {touched.portfolio_link && errors.portfolio_link && <div class="alert"><span class="closebtn" onClick={handleChange}>&times;</span> 
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
                                    <button className="btn btn-secondary"  onClick={handleClose}>
                                    Close
                                    </button>
                                    <button className='btn btn-primary' type="submit">
                                    Save Changes
                                    </button>
                                </Modal.Footer>
                            </Form>
                    </Modal>                
                </div>
                </section>
                </div>
               ) : (
                <div className="profile-content">
                    <section>
                        <div className="section_content">
                            <img src={profile} />
                            <h2 className="section_title">{employee.name}</h2>
                            <p>{employee.portfolio_link}</p>
                            <button className="btn btn-primary">Edit</button>
                        </div>
                    </section>
                    <Skill employee={employee} />
                    <Resume employee={employee} />
                    <Education employee={employee} />
                </div>
             )}
        </div>
    )
}

// higher order component
const FormikMyForm = withFormik({
    mapPropsToValues({ name, portfolio_link }) {
      return {
        name: name || "",
        portfolio_link: portfolio_link || ""  
      };
    },
  
    validationSchema: Yup.object().shape({
        name: Yup.string().required( 'Please enter your name' )     
    }),
  
    handleSubmit(values, { setStatus, resetForm }) {

        // Set user id in values.
        values.user_id = getUserId();

        console.log("Submitting form:", values);
    
      axiosWithAuth()
        .post("https://droom1.herokuapp.com/api/employee", values)
        // just put in a url you want data from
        .then(res => {
          console.log("Success:", res);
          setStatus(res.data);
          resetForm();
        })
        // do stuff with whatever gets returned
        .catch(err => {
          console.log("Error:", err.response);          
        });
      // if there's an error, handle it
     
    }
  })(ShowProfile);

  
function getUserId()
{
    const token = localStorage.getItem('token')
    const parse = JSON.parse(atob(token.split('.')[1])) 
    return parse.id;
}

export default FormikMyForm;