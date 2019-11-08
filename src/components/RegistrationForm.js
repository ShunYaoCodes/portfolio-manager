import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { createLoginSession } from '../redux/actions';

class RegistrationForm extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
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
          email: this.state.email,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation,
        })
      }
    )
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        console.log(res.errors);
      } else {
        const { token, id } = res;
        this.props.dispatch(createLoginSession(token, id));
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
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              <Form.Input 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='First Name'
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
              <Form.Input 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Last Name'
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
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
                name="passwordConfirmation"
                onChange={this.handleChange}
                value={this.state.passwordConfirmation}
              />
    
              <Button color='violet' fluid size='large' type="submit">
                Create
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default withAuth(connect(null, mapDispatchToProps)(RegistrationForm));