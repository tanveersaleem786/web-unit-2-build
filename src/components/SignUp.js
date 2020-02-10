import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Image, Button, Form, Grid, Header, Message, Segment, Popup } from 'semantic-ui-react'
import logo from '../logo.svg'

import { axiosWithAuth } from './utils'

const SignUp = props => {

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    role: '',
    tos: false,
    error: false
  })

  const options = [
    { text: 'Employer', value: 'employer' },
    { text: 'Job-seeker', value: 'jobseeker' }
  ]

  const formHandler = (event, data) => {
    if(data.name === 'tos') {
      setSignUpForm({
        ...signUpForm,
        [data.name]: data.checked
      })
    } else {
      setSignUpForm({
        ...signUpForm,
        [data.name]: data.value
      })
    }
  }

  const submitHandler = event => {
    event.preventDefault()
    signUpForm.tos ? 
      axiosWithAuth().post('/api/auth/register', {email: signUpForm.email, password: signUpForm.password, role: signUpForm.role})
        .then(res => {
          localStorage.setItem('token', res.data.token)
          props.history.push('/')
        })
        .catch(err => console.log(err))
      : setSignUpForm({
        ...signUpForm,
        error: true
      })
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image size='large' verticalAlign='bottom' src={logo} />
          Create New Account
        </Header>
        <Form size='large' onSubmit={submitHandler}>
          <Segment stacked textAlign='left'>
            <Form.Input
              fluid
              label="E-mail"
              name='email'
              value={signUpForm.email}
              onChange={formHandler}
            />
            <Form.Input
              fluid
              label="Password"
              type="password"
              name='password'
              value={signUpForm.password}
              onChange={formHandler}
            />
            <Form.Select
              fluid
              label={
                <label>
                  Role 
                  <Popup
                    on='click'
                    pinned
                    content={
                      <>
                        <p><strong>Employer:</strong> select this if you are an employer and looking to post a job and fill open positions</p>
                        <p><strong>Job-seeker:</strong> select this if you are looking for a role and want to browse job postings</p>
                      </>
                    }
                    trigger={<a href="#">  (more info)</a>}
                  />
                </label>}
              options={options}
              placeholder='Select a role'
              name='role'
              onChange={formHandler}
              value={signUpForm.role}
            >
            </Form.Select>
            <Form.Checkbox checked={signUpForm.tos} name="tos" onChange={formHandler} label='I agree to the Terms and Conditions' />
            <Button color='teal' fluid size='large'>Sign Up</Button>
          </Segment>
        </Form>
        {signUpForm.error && <Message attached='bottom' error>You must agree to the terms of service</Message>}
        <Message>
          Already have an account? <Link to='/login'>Log In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default SignUp