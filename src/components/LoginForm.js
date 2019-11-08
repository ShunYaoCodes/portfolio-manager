import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { createLoginSession } from '../redux/actions';

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/sessions/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: this.state.email, password: this.state.password })
      }
    )
    .then(res => res.json())
    .then(res => {
      const { token, id } = res;
      this.props.dispatch(createLoginSession(token, id));
    })
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='violet' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            Sign in to your account
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
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
    
              <Button color='violet' fluid size='large' type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='#'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default withAuth(connect(null, mapDispatchToProps)(LoginForm));
