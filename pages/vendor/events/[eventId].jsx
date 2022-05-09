import serverApi from '../../../utils/serverApi';
import React from 'react';
import SingleEvent from '../../../components/Shared/SingleEvent';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const SingleEventPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [event, setEvent] = React.useState();
  const router = useRouter();

  const getEvent = async (id) => {
    setLoading(true);
    const {
      data: { event },
    } = await serverApi.get(`/events/${id}`);
    setEvent(event);
    setLoading(false);
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    const { eventId } = router.query;

    getEvent(eventId);
  }, [router.isReady]);

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
