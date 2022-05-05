import serverApi from '../../../utils/serverApi';
import React from 'react';
import SingleEvent from '../../../components/Shared/SingleEvent';
import { Text } from '@chakra-ui/react';
const SingleEventPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [event, setEvent] = React.useState();

  const getEvent = async (id) => {
    setLoading(true);
    const {
      data: { event },
    } = await serverApi.get(`http://localhost:3000/api/v1/events/${id}`);
    console.log(event);
    setEvent(event);
    setLoading(false);
  };

  React.useEffect(() => {
    getEvent('6273a6494713c03138fa7ab5');
  }, []);

  if (loading) {
    return (
      <>
        <Text>loading...</Text>
      </>
    );
  }

  return <SingleEvent event={event} />;
};

export default SingleEventPage;
