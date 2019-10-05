import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
// import AuthAdapter from './'
// AuthAdapter.saveToken(token)

class RegistrationForm extends Component {
  state = {
    username: "",
    password: "",
    password_confirmation: "",
    // token: "" // This will disappear on page refresh!!
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/users/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          username: this.state.username, 
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        })
      }
    )
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        console.log(json.errors);
      } else {
        localStorage.setItem('token', json.token);
        localStorage.setItem('id', json.id);
        this.props.history.push('/');
        window.location.reload();
      }
    })
  }

  render() {
    console.log('render', this.state)
    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 800 }}>
          <Header as='h2' color='violet' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            Create an account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='E-mail address'
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                name="password_confirmation"
                onChange={this.handleChange}
                value={this.state.password_confirmation}
              />
    
              <Button color='violet' fluid size='large' type="submit">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default RegistrationForm;