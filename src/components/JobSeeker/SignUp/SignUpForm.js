import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import './SignUp.css';
import axios from "axios";

const SignUpForm = ({ errors, touched, values, status }) => {
//const [data, setData] = useState([]);

  // useEffect(() => {
  //   status && setUser(users => [...users, status]);
  // }, [status]);

  return (
    <Form>
      <div className="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr></hr>
        <label htmlFor="email"><b>Email</b></label>
        <Field type="text" name="email" placeholder="Enter Email" value={values.email} />
        {touched.email && errors.email && <p>{errors.email}</p>}

        <label htmlFor="password"><b>Password</b></label>
        <Field type="password" name="password" placeholder="Enter Password" value={values.password} />
        {touched.password && errors.password && <p>{errors.password}</p>}

        <label htmlFor="role"><b>Role</b></label>
        <Field component="select" name="role" id='role'>
        <option>Select Role</option>
        <option>Company</option>
        <option>Job Seeker</option>
        </Field>
        {touched.role && errors.role && <p>{errors.role}</p>}
  
        <hr></hr>
        <button type="submit" className="registerbtn">Register</button>
      </div>
      <div className="container signin">
        <p>Already have an account? <a href="#">Sign in</a>.</p>
      </div>
    </Form>
  );
};

// higher order component
const FormikMyForm = withFormik({
  mapPropsToValues({ name }) {
    return {
      email: "",
      password: "",
      role: ""  
    };
  },

  validationSchema: Yup.object().shape({
    
    email: Yup.string().email('Please enter a valid email.')
    .required('Please enter an email.'),
    password: Yup.string().required('Please enter password.') 
    .min(8, 'Password is too short - should be 8 chars minimum.'),
    role: Yup.string()
        .oneOf([
          'Company',
          'Job Seeker'
        ])
        .required('Please select role.')
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("Submitting form:", values);

    axios
      .post("https://droom1.herokuapp.com/api/auth/register", values)
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
})(SignUpForm);

export default FormikMyForm;
