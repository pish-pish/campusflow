import {
  getAllEvents,
  getEventById
} from '../services/EventService';

export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  events
});

export const startSetEvents = () => {
  return (dispatch) => {
    const events = getAllEvents();
    dispatch(setEvents(events));
    return Promise.resolve(events);
  };
};

export const addEvent = (event) => ({
  type: 'ADD_EVENT',
  event
});

export const editEvent = (id, update) => ({
  type: 'EDIT_EVENT',
  id,
  update
});

export const removeEvent = (id) => ({
  type: 'REMOVE_EVENT',
  id
});

export const hydrateEventById = (id) => getEventById(id);
