import React from 'react'
import { Segment, Container, Divider, Image, List } from 'semantic-ui-react'
import logo from '../logo.svg'

const Footer = () => {
  return (
    <div className="Footer">
      <Segment inverted vertical>
        <Container textAlign='center'>
          <Divider inverted section style={{ margin: '0.2em 0em 1em' }}/>
          <Image centered size='mini' src={logo} />
          <List horizontal inverted divided link size='small'>
            <List.Item as='a' href=''>
              Site Map
            </List.Item>
            <List.Item as='a' href=''>
              Contact Us
            </List.Item>
            <List.Item as='a' href=''>
              Terms and Conditions
            </List.Item>
            <List.Item as='a' href=''>
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  )
}

export default Footer