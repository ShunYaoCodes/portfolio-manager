import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { createLoginSession } from '../redux/actions';

const SignupForm = ({ history, dispatch }) => {
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
        .required('Required'),
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters long')
        .required('Required'),
      passwordConfirmation: Yup.string()
        // .min(8, 'Must be 20 characters or less')
        .required('Required'),
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
      if (res.errors) {
        console.log(res.errors);
      } else {
        const { token, id } = res;
        dispatch(createLoginSession(token, id));
        history.push('/');
      }
    })
    },
  });

  return (
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 800 }}>
        <Header as='h2' color='violet' textAlign='center'>
          {/* <Image src='/logo.png' /> */}
          Create an account
        </Header>
        <Form size='large' onSubmit={formik.handleSubmit}>
          <Segment stacked>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail address'
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
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
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
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
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
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
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
              <div>{formik.errors.passwordConfirmation}</div>
            ) : null}
  
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