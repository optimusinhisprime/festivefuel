import serverApi from '../../../utils/serverApi';
import React from 'react';
import SingleEvent from '../../../components/Shared/SingleEvent';
const SingleEventPage = () => {
  const [event, setEvent] = React.useState();

  const getEvent = async (id) => {
    const {
      data: { event },
    } = await serverApi.get(`http://localhost:3000/api/v1/events/${id}`);
    console.log(event);
    setEvent(event);
  };

  React.useEffect(() => {
    getEvent('6273a6494713c03138fa7ab5');
  }, []);

  return <SingleEvent event={event} />;
};

export default SingleEventPage;
