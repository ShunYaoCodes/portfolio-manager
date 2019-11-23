import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Grid, Header, Image, Segment, Message } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { createLoginSession } from '../redux/actions';

const SignupForm = ({ history, dispatch }) => {
  const [emailAlreadyRegisterd, setEmailAlreadyRegistered] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email addresss')
        .required('Email is required'),
      firstName: Yup.string()
        .max(20, 'First Name must be 20 characters or less'),
      lastName: Yup.string()
        .max(20, 'Last Name must be 20 characters or less'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Enter your password'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .required("Confirm your password")
    }),
    onSubmit: ({ email, firstName, lastName, password, passwordConfirmation }) => {
      fetch("http://localhost:3000/api/v1/users/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          password_confirmation: passwordConfirmation,
        })
      }
    )
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        const [errorMessage] = res.error;
        switch (errorMessage) {
          case 'Email has already been taken':
            setEmailAlreadyRegistered(true);
            break;
          default:
            console.log(res.errors);
        }
      } else {
        setEmailAlreadyRegistered(false);
        const { token, id, firstName, lastName } = res;
        dispatch(createLoginSession(token, id, firstName, lastName));
        history.push('/');
      }
    })
    },
  });

  const handleEmailClick = () => {
    setEmailAlreadyRegistered(false);
  }

  return (
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 800 }}>
        <Header as='h2' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' /> */}
          Create an account
        </Header>
        <Form error={emailAlreadyRegisterd} size='large' onSubmit={formik.handleSubmit}>
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
              fluid icon='user' 
              iconPosition='left' 
              placeholder='First Name'
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              {...formik.touched.firstName && formik.errors.firstName ? { error: formik.errors.firstName } : {} }
            />
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='Last Name'
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              {...formik.touched.lastName && formik.errors.lastName ? { error: formik.errors.lastName } : {} }
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
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              id="passwordConfirmation"
              name="passwordConfirmation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirmation}
              {...formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? { error: formik.errors.passwordConfirmation } : {} }
            />
            <Message
              error
              header='This email is already registered'
              content='Please use a different email address'
            />
            <Button color='violet' fluid size='large' type="submit">
              Create
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default withAuth(connect(null, mapDispatchToProps)(SignupForm));