import React, { useState } from 'react'
import { axiosWithAuth } from './utils'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../logo.svg'

const LoginForm = props => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const changeHandler = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = event => {
    event.preventDefault()
    axiosWithAuth().post('/api/auth/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        props.history.push('/')
      })
      .catch(err => console.log(err))
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image size='large' verticalAlign='bottom' src={logo} />
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleLogin}>
          <Segment stacked>
            <Form.Input
              fluid
              name='email'
              value={credentials.email}
              icon='user'
              onChange={changeHandler}
              iconPosition='left'
              placeholder='E-mail'
            />
            <Form.Input
              fluid
              icon='lock'
              onChange={changeHandler}
              name='password'
              value={credentials.password}
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='teal' fluid size='large'>Login</Button>
          </Segment>
        </Form>
        <Message>
          New user? <Link to='/signup'>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm