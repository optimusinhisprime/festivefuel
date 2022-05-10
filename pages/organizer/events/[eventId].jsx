import React, { useEffect } from "react";
import OrganizerSingleEvent from "../../../components/Shared/OrganizerSingleEvent";
import { useRouter } from "next/router";
const axios = require("axios");

const Event = ({ event }) => {
  const router = useRouter();
  const { eventId } = router.query;
  return <OrganizerSingleEvent event={event} />;
};

export default Event;
export async function getServerSideProps(context) {
  const { eventId } = context.query;

  const endpoint = `${process.env.NEXTAUTH_URL}/api/v1/events/${eventId}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  return {
    props: { event: data.event }, // will be passed to the page component as props
  };
}
