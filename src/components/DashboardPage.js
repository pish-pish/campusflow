import React from 'react';
import { connect } from 'react-redux';
import EventList from './EventList';
import EventFilters from './EventFilters';
import selectEvents from '../selectors/events';

export const DashboardPage = ({ events }) => (
  <main className="dashboard-page" aria-labelledby="campusflow-title">
    {/* Hero Section with Gradient */}
    <section className="dashboard-hero">
      <div className="dashboard-hero__content">
        <h1 id="campusflow-title" className="dashboard-hero__title">
          CampusFlow Events
        </h1>
        <p className="dashboard-hero__subtitle">
          Discover what is happening around Florida Tech and plan your week.
        </p>
      </div>
    </section>

    {/* Filters Section */}
    <div className="dashboard-filters">
      <EventFilters />
    </div>

    {/* Events Container with Subtle Animations */}
    <div className="dashboard-events">
      <div className="dashboard-events__card">
        {events.length === 0 ? (
          <div className="dashboard-empty-state">
            <div className="dashboard-empty-state__icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="dashboard-empty-state__title">No events found</h2>
            <p className="dashboard-empty-state__message">
              No events match your search yet. Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="dashboard-events__list">
            <EventList />
          </div>
        )}
      </div>
    </div>
  </main>
);

const mapStateToProps = (state) => ({
  events: selectEvents(state.events, state.filters)
});

export default connect(mapStateToProps)(DashboardPage);
