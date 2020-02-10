import React from 'react';
import { Route, Redirect } from 'react-router-dom'

//components
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import Main from './components/Main'



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)


function App() {
  return (
    <>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/signup' component={SignUp} />
      <PrivateRoute exact path='/' component={Main} />
    </>
  )
}

export default App;