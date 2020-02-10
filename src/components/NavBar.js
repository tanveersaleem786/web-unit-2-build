import React from 'react'
import { Container, Label, Dropdown, Image, Menu } from 'semantic-ui-react'
import logo from '../logo.svg'

const NavBar = props => {

  const setLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('employee')    
    props.history.push('/')
  }

  return (
    <div className="Nav">
      <Menu fixed='top' borderless inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src={logo} styled={{ marginRight: '1.5em' }} />
            Droom
          </Menu.Item>
          <Menu.Item as='a'>
            Swipe!
          </Menu.Item>
          <Menu.Item as='a'>
            View Matches
            <Label color='teal'>5</Label>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Dropdown item simple text='Profile'>
              <Dropdown.Menu>
                <Dropdown.Item icon='street view' text='View Profile' />
                <Dropdown.Item icon='edit' text='Edit Profile' />
                <Dropdown.Divider />
                <Dropdown.Item icon='log out' text='Logout' onClick={setLogout} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  )
}

export default NavBar