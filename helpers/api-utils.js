const firebase_url =
  'https://react-http-be337-default-rtdb.firebaseio.com/eventsApp';

export async function getAllEvents() {
  try {
    const response = await fetch(`${firebase_url}/events.json`);

    if (!response.ok) {
      throw new Error('Something wrong with fetching data!');
    }

    const data = await response.json();

    //transform data
    let transformedEvents = [];

    for (const key in data) {
      transformedEvents.push({
        id: key,
        ...data[key],
      });
    }

    return transformedEvents;
  } catch (error) {
    //handle erros
    console.error(`💥💥💥💥 ${error}`);

    throw error;
  }
}

export async function getFeaturedEvents() {
  try {
    const events = await getAllEvents();

    return events.filter(event => event.isFeatured);
  } catch (error) {
    throw error;
  }
}

export async function getEventById(id) {
  try {
    const events = await getAllEvents();
    return events.find(event => event.id === id);
  } catch (error) {
    throw error;
  }
}
