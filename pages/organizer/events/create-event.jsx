import React from "react";
import {
  useDisclosure,
  Flex,
  Select,
  Textarea,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  CloseButton,
  Input,
  Collapse,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldArray } from "formik";
const CreateEventPage = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box align="center">
      <Heading mt={10} mb={10} as="h2" size="lg">
        Create New Event
      </Heading>
      <Box w={["90%", "70%", "50%"]}>
        <Button size="sm" onClick={onToggle}>
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
      <Box mt={5} w={["90%", "70%", "50%"]}>
        <Formik
          initialValues={{
            name: "",
            date: "",
            time: "",
            venue: "",
            expectedAttendance: "",
            description: "",
            images: [],
            eventCategory: [],
            eventStalls: [
              {
                stallId: Math.floor(Math.random()),
                category: "",
                price: "",
                available: "",
              },
            ],
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.name = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <Field type="email" name="email">
                {({ field }) => (
                  <FormControl
                    mt={2}
                    mb={3}
                    isInvalid={errors.email && touched.email}
                  >
                    <FormLabel htmlFor="name">Event Name</FormLabel>
                    <Input {...field} id="name" type="text" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field type="email" name="email">
                {({ field }) => (
                  <FormControl
                    mt={2}
                    mb={3}
                    isInvalid={errors.email && touched.email}
                  >
                    <FormLabel htmlFor="name">Event Venue</FormLabel>
                    <Input {...field} id="name" type="text" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Flex direction={["column", "column", "row"]}>
                <Field type="email" name="email">
                  {({ field }) => (
                    <FormControl
                      mt={2}
                      mb={3}
                      mr={5}
                      isInvalid={errors.email && touched.email}
                    >
                      <FormLabel htmlFor="name">Date</FormLabel>
                      <Input {...field} id="name" type="date" />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="email" name="email">
                  {({ field }) => (
                    <FormControl
                      mt={2}
                      mb={3}
                      isInvalid={errors.email && touched.email}
                    >
                      <FormLabel htmlFor="name">Time</FormLabel>
                      <Input {...field} id="name" type="time" />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Flex direction={["column", "column", "row"]}>
                <Field type="email" name="email">
                  {({ field }) => (
                    <FormControl
                      mt={2}
                      mb={3}
                      mr={5}
                      isInvalid={errors.email && touched.email}
                    >
                      <FormLabel htmlFor="name">Expected Attendance</FormLabel>
                      <Input {...field} id="name" type="number" />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field type="email" name="email">
                  {({ field }) => (
                    <FormControl
                      mt={2}
                      mb={3}
                      isInvalid={errors.email && touched.email}
                    >
                      <FormLabel htmlFor="name">Event Category</FormLabel>
                      <Select id="country" placeholder="Select Category">
                        <option>Festival</option>
                        <option>Protest</option>
                        <option>Conference</option>
                        <option>Expo</option>
                        <option>Concert</option>
                        <option>Sports</option>
                        <option>Performing Arts</option>
                        <option>Community</option>
                        <option>Awards & Competition</option>
                      </Select>
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Flex>

              <Field type="email" name="email">
                {({ field }) => (
                  <FormControl
                    mt={2}
                    mb={3}
                    mr={5}
                    isInvalid={errors.email && touched.email}
                  >
                    <FormLabel htmlFor="name">Event Description</FormLabel>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                    <Textarea placeholder="Here is a sample placeholder" />
                  </FormControl>
                )}
              </Field>

              <FormControl
                mt={2}
                mb={3}
                mr={5}
                isInvalid={errors.email && touched.email}
              >
                <FormLabel htmlFor="name">Upload event images</FormLabel>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
                <Input
                  p={3}
                  h="auto"
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  multiple="multiple"
                ></Input>
              </FormControl>

              <FieldArray name="eventStalls">
                {({ insert, remove, push, field }) => (
                  <Box>
                    {values.eventStalls.length > 0 &&
                      values.eventStalls.map((stall, index) => (
                        <Flex>
                          <FormControl
                            mt={2}
                            mb={3}
                            mr={5}
                            isInvalid={errors.email && touched.email}
                          >
                            <FormLabel
                              htmlFor={`eventStalls.${index}.category`}
                            >
                              Stall Category
                            </FormLabel>
                            <Input
                              {...field}
                              id={`eventStalls.${index}.category`}
                              type="text"
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                          <FormControl
                            mt={2}
                            mb={3}
                            mr={5}
                            isInvalid={errors.email && touched.email}
                          >
                            <FormLabel htmlFor={`eventStalls.${index}.price`}>
                              Price
                            </FormLabel>
                            <Input
                              {...field}
                              id={`eventStalls.${index}.price`}
                              type="text"
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                          <FormControl
                            mt={2}
                            mb={3}
                            mr={5}
                            isInvalid={errors.email && touched.email}
                          >
                            <FormLabel
                              htmlFor={`eventStalls.${index}.available`}
                            >
                              How Many?
                            </FormLabel>
                            <Input
                              {...field}
                              id={`eventStalls.${index}.available`}
                              type="number"
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                          <CloseButton
                            onClick={() => {
                              remove(index);
                            }}
                          />
                        </Flex>
                      ))}
                    <Button
                      onClick={() => {
                        push({
                          stallId: Math.floor(Math.random()),
                          category: "",
                          price: "",
                          available: "",
                        });
                      }}
                    >
                      Add New Stall
                    </Button>
                  </Box>
                )}
              </FieldArray>

              <Button mt={10} mb={5} type="submit" disabled={isSubmitting}>
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
