import React from "react";
import { Formik } from 'formik';
import { Flex, Input , Box, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import serverApi from "../utils/serverApi";
const instance = axios.create();


const Login = () => {
  const [submitting, setFormSubmitting] = useState(false)
  const {...state} = useContext(AuthContext)

    const submit =   (values) =>{
      state.login(values.email, values.password)
    }

  return(
    <Flex h="80vh" justify="center" align="center" direction="column">
    <Heading>Welcome Back</Heading>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
          submit(values)
          setSubmitting(submitting)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          Email:
          <Input          
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <br/>
          Password:
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <br/>
          <Button type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </form>
      )}
    </Formik>
  </Flex>
  )
};

export default Login;
