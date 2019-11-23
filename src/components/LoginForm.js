import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Grid, Header, Image, Segment, Message } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { createLoginSession } from '../redux/actions';

const LoginForm = ({ history, path, dispatch }) => {
  const [validLogin, setValidLogin] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email addresss')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Enter your password'),
    }),
    onSubmit: ({ email, password }) => {
      fetch("http://localhost:3000/api/v1/sessions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          const { message } = res.error;
          switch (message) {
            case "Credentials don't match":
              setValidLogin(false);
              break;
            default:
              console.log(res.errors);
          }
        } else {
          setValidLogin(true);
          const { token, id, firstName, lastName } = res;
          dispatch(createLoginSession(token, id, firstName, lastName));
          history.push(path ? path : '/');
        }
      })
    },
  });

  const handleEmailClick = () => {
    setValidLogin(true);
  }

  return (
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' /> */}
          Sign in to your account
        </Header>
        <Form error={!validLogin} size='large' onSubmit={formik.handleSubmit}>
          <Segment stacked>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail address'
              id="email"
              name="email"
              type="email"
              onClick={handleEmailClick}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              {...formik.touched.email && formik.errors.email ? { error: formik.errors.email } : {} }
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              {...formik.touched.password && formik.errors.password ? { error: formik.errors.password } : {} }
            />
            <Message
              error
              content='Incorrect email or password'
            />
            <Button color='violet' fluid size='large' type="submit">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => {
  const { path } = state.page;
  return { path };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
