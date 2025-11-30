import events from '../data/events';

const normalizeEvent = (event) => ({
  ...event,
  startDateTime: new Date(event.startDateTime).toISOString(),
  endDateTime: new Date(event.endDateTime).toISOString()
});

const dedupeEvents = (list) => {
  const seen = new Map();
  list.forEach((event) => {
    const key = `${event.title.toLowerCase()}-${new Date(event.startDateTime).toISOString()}`;
    if (!seen.has(key)) {
      seen.set(key, normalizeEvent(event));
    }
  });
  return Array.from(seen.values());
};

const sortedEvents = () =>
  dedupeEvents(events).sort(
    (a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  );

export const getAllEvents = () => sortedEvents();

export const getEventsForToday = () => {
  const today = new Date();
  return sortedEvents().filter((event) => {
    const start = new Date(event.startDateTime);
    return (
      start.getFullYear() === today.getFullYear() &&
      start.getMonth() === today.getMonth() &&
      start.getDate() === today.getDate()
    );
  });
};

export const getEventsForThisWeek = () => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return sortedEvents().filter((event) => {
    const start = new Date(event.startDateTime);
    return start >= startOfWeek && start < endOfWeek;
  });
};

export const searchEvents = (queryString = '') => {
  const query = queryString.trim().toLowerCase();
  if (!query) return sortedEvents();
  return sortedEvents().filter((event) =>
    `${event.title} ${event.shortDescription} ${event.longDescription}`
      .toLowerCase()
      .includes(query)
  );
};

export const filterEvents = ({ category, costType }) => {
  return sortedEvents().filter((event) => {
    const categoryMatch = !category || category === 'All' || event.category === category;
    const costMatch = !costType || costType === 'All' || event.costType === costType;
    return categoryMatch && costMatch;
  });
};

export const getEventById = (id) => sortedEvents().find((event) => event.id === id);

export default {
  getAllEvents,
  getEventsForToday,
  getEventsForThisWeek,
  searchEvents,
  filterEvents,
  getEventById
};
