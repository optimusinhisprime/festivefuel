import React from "react";
import styled from "styled-components";
import { HStack, Tag } from "@chakra-ui/react";
const EventInfo = ({ event }) => {
  return (
    <Wrapper className="content">
      <h5 className="company">{event.eventName}</h5>
      <p className="price">
        Expected Attendance: {event.expectedAttendance} people
      </p>
      <p>{event.description}</p>
      <h2>
        Date: {event.date}, {event.time}
      </h2>
      <h2>Venue: {event.venue || "Big Momma House"}</h2>
      <h4 style={{ marginTop: "50px", marginBottom: "10px" }}>Categories</h4>
      <HStack spacing={4}>
        {event.eventCategory.map((event) => (
          <Tag size="lg" key={event} variant="solid" colorScheme="orange">
            #{event}
          </Tag>
        ))}
      </HStack>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;
  /* width: 90%; */
  //justify-content: center;
  text-align: left;
  h2 {
    margin-bottom: 1rem;
  }
  .company {
    color: var(--clr-primary);
    margin-bottom: 15px;
    font-size: 2rem;
  }

  p {
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .price {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    span {
      background: var(--clr-accent);
      color: var(--clr-primary);
      font-weight: 700;
      border-radius: var(--radius);
      margin-left: 1rem;
      width: 50px;
      display: flex;
      justify-content: center;
    }
  }

  @media (min-width: 768px) {
    width: 90%;
  }
`;

export default EventInfo;
