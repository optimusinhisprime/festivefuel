import React from "react";
import Router from "next/router";
import {
  useDisclosure,
  Flex,
  Textarea,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  CloseButton,
  Input,
  useToast,
  Collapse,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldArray } from "formik";
import { v4 as uuidv4 } from "uuid";
import { signOut, getSession } from "next-auth/react";
const axios = require("axios");
// const { Storage } = require("@google-cloud/storage");

const CreateEventPage = ({ session }) => {
  // const storage = new Storage();
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();
  return (
    <Box
      backgroundImage="url('/create-event.jpg')"
      backgroundPosition="center center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundAttachment="fixed"
      align="center"
      color="white"
      pb={10}
    >
      <Heading pt={10} mb={10} as="h1" size="xl">
        Create New Event
      </Heading>
      <Box w={["90%", "70%", "70%", "50%"]}>
        <Button color="black" size="sm" onClick={onToggle}>
          View Instructions
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Box
            p="40px"
            color="black"
            mt="4"
            bg="gray.100"
            rounded="md"
            shadow="md"
          >
            Instructions
          </Box>
        </Collapse>
      </Box>
      <Box
        rounded="md"
        bg="#112B3C"
        p={10}
        mt={5}
        w={["90%", "70%", "70%", "50%"]}
      >
        <Formik
          initialValues={{
            eventName: "",
            date: "",
            time: "",
            venue: "",
            expectedAttendance: "",
            description: "",
            images: null,
            eventCategory: "",
            eventStalls: [],
          }}
          validate={(values) => {
            const errors = {};
            if (!values.eventName) {
              errors.eventName = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            values.organizerId = session.userId;

            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              if (key === "eventStalls") {
                const stallArray = JSON.stringify(value);
                formData.append(key, stallArray);
              } else {
                formData.append(key, value);
              }
            });

            const endpoint = `/api/v1/events`;
            axios
              .post(endpoint, formData)
              .then(function (response) {
                toast({
                  title: "Event created successfully.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 9000,
                  isClosable: false,
                });
                Router.push("/organizer/dashboard");
              })
              .catch(function (error) {
                console.log(error);
                setSubmitting(false);
              });
          }}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form encType="multipart/form-data">
              <Field type="text" name="eventName">
                {({ field }) => (
                  <FormControl
                    mt={2}
                    mb={3}
                    isInvalid={errors.eventName && touched.eventName}
                  >
                    <FormLabel htmlFor="eventName">Event Name</FormLabel>
                    <Input {...field} id="eventName" type="text" />
                    <FormErrorMessage>{errors.eventName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field type="text" name="venue">
                {({ field }) => (
                  <FormControl
                    mt={2}
                    mb={3}
                    isInvalid={errors.venue && touched.venue}
                  >
                    <FormLabel htmlFor="venue">Event Venue</FormLabel>
                    <Input {...field} id="venue" type="text" />
                    <FormErrorMessage>{errors.venue}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Flex direction={["column", "column", "column", "row"]}>
                <Field type="date" name="date">
                  {({ field }) => (
                    <FormControl mt={2} mb={3} mr={5}>
                      <FormLabel htmlFor="date">Date</FormLabel>
                      <Input {...field} id="date" type="date" required />
                    </FormControl>
                  )}
                </Field>
                <Field type="time" name="time">
                  {({ field }) => (
                    <FormControl mt={2} mb={3}>
                      <FormLabel htmlFor="name">Time</FormLabel>
                      <Input {...field} id="name" type="time" required />
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex direction={["column", "column", "column", "row"]}>
                <Field type="number" name="expectedAttendance">
                  {({ field }) => (
                    <FormControl
                      mt={2}
                      mb={3}
                      mr={5}
                      isInvalid={
                        errors.expectedAttendance && touched.expectedAttendance
                      }
                    >
                      <FormLabel htmlFor="expectedAttendance">
                        Expected Attendance
                      </FormLabel>
                      <Input {...field} id="expectedAttendance" type="number" />
                      <FormErrorMessage>
                        {errors.expectedAttendance}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <FormControl>
                  <FormLabel htmlFor="eventCategory">Event Category</FormLabel>
                  <Field
                    style={{ color: "black" }}
                    as="select"
                    name="eventCategory"
                    required
                  >
                    <option disabled value="">
                      (Make a Selection)
                    </option>
                    <option>Festival</option>
                    <option>Protest</option>
                    <option>Conference</option>
                    <option>Expo</option>
                    <option>Concert</option>
                    <option>Sports</option>
                    <option>Performing Arts</option>
                    <option>Community</option>
                    <option>Awards & Competition</option>
                  </Field>
                </FormControl>
              </Flex>

              <Field as="textarea" name="description">
                {({ field }) => (
                  <FormControl
                    mt={2}
                    mb={3}
                    mr={5}
                    isInvalid={errors.description && touched.description}
                    required
                  >
                    <FormLabel htmlFor="description">
                      Event Description
                    </FormLabel>
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                    <Textarea
                      {...field}
                      placeholder="Here is a sample placeholder"
                    />
                  </FormControl>
                )}
              </Field>

              <Field>
                {({ form }) => (
                  <FormControl mt={2} mb={3} mr={5}>
                    <FormLabel htmlFor="images">
                      Upload Event Poster or Image to be Displayed
                    </FormLabel>
                    <Input
                      p={3}
                      h="auto"
                      type="file"
                      name="image"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        setFieldValue("images", e.target.files[0]);
                      }}
                    />
                  </FormControl>
                )}
              </Field>
              <FieldArray name="eventStalls">
                {({ insert, remove, push, field }) => (
                  <Box>
                    {values.eventStalls.length > 0 &&
                      values.eventStalls.map((stall, index) => (
                        <Flex direction="column" key={index}>
                          <Box align="left">
                            <label htmlFor={`eventStalls.${index}.category`}>
                              Stall Category
                            </label>
                            <Field
                              name={`eventStalls.${index}.category`}
                              placeholder="Food"
                              type="text"
                              style={{ color: "black" }}
                            />
                          </Box>
                          <Box align="left">
                            <label htmlFor={`eventStalls.${index}.price`}>
                              Price
                            </label>
                            <Field
                              name={`eventStalls.${index}.price`}
                              placeholder="P2000.00"
                              type="text"
                              style={{ color: "black" }}
                            />
                          </Box>
                          <Box align="left">
                            <label htmlFor={`eventStalls.${index}.available`}>
                              How many stalls are available?
                            </label>
                            <Field
                              name={`eventStalls.${index}.available`}
                              placeholder="200"
                              type="text"
                              style={{ color: "black" }}
                            />
                          </Box>
                          <CloseButton
                            onClick={() => {
                              remove(index);
                            }}
                          />
                        </Flex>
                      ))}
                    <Button
                      mt={5}
                      color="black"
                      onClick={() => {
                        push({
                          stallId: uuidv4(),
                          category: "",
                          price: "",
                          available: "",
                        });
                      }}
                    >
                      Add New Event Stall
                    </Button>
                  </Box>
                )}
              </FieldArray>

              <Button
                color="black"
                mt={10}
                mb={5}
                type="submit"
                disabled={isSubmitting}
              >
                Create Event
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateEventPage;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}
