import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '../../components/DashboardPage';
import configureStore from '../../store/configureStore';
import { setEvents } from '../../actions/events';
import { getAllEvents } from '../../services/EventService';

test('typing in search box filters events by text', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const store = configureStore();
  store.dispatch(setEvents(getAllEvents()));

  ReactDOM.render(
    <Provider store={store}>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </Provider>,
    container
  );

  const input = container.querySelector('#search-events');
  expect(container.textContent).toContain('Panther Welcome Bash');
  TestUtils.Simulate.change(input, { target: { value: 'resume' } });
  expect(container.textContent).not.toContain('Panther Welcome Bash');
  expect(container.textContent).toContain('Career Center Resume Lab');
});
