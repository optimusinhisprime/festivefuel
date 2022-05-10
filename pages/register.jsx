import React from "react";
import { Formik, Field, Form } from 'formik';
import { Flex, Input , Box, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import serverApi from "../utils/serverApi";
const instance = axios.create();


const Register = () => {
  const {values, setValues} = useState()
  const {register} = useContext(AuthContext)

    const submit =   (values) =>{
        register(
          values.firstname,
          values.surname,
          values.address,
          values.phoneNumber,
          values.email,
          values.password,
          values.role
          )
    }

  return(
    <Flex h="80vh" justify="center" align="center" direction="column">
    <Heading>Register for an Account</Heading>
    <Formik
      initialValues={{ email: '', password: '', firstname: '', address: '', surname: '', phoneNumber: '', role: '' }}
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
        setSubmitting(false)
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
          FirstName:
          <Input          
            type="text"
            name="firstname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstname}
          />
          {errors.firstname && touched.firstname && errors.firstname}
          <br/>
          Surname:
          <Input
            type="text"
            name="surname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.surname}
          />
          {errors.surname && touched.surname && errors.surname}

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

          Phone Number:
          <Input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phoneNumber}
          />
          {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}

          Address:
          <Input          
            type="text"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
          />
          {errors.address && touched.address && errors.address}
          <br/>

          <div id="my-radio-group">Role:</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label style={{marginRight: 30}}>
              <Field type="radio" name="role" value="organiser" />
               <span style={{marginLeft: 10}} >Organiser</span>
            </label>
            <label>
              <Field type="radio" name="role" value="vendor" />
              <span style={{marginLeft: 10}} >Vendor</span>
            </label>
            {errors.role && touched.role && errors.role}
          </div>

          <br />
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
          <Button type="submit" disabled={isSubmitting} style={{marginTop: 40, width: '100%', backgroundColor: '#000E44', color: 'white'}} >
            Register
          </Button>
        </form>
      )}
    </Formik>
  </Flex>
  )
};

export default Register;
