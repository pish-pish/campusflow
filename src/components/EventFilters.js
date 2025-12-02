import React from 'react';
import { connect } from 'react-redux';
import {
  setCategoryFilter,
  setCostTypeFilter,
  setTextFilter,
  setTimeRangeFilter
} from '../actions/filters';
import selectEvents from '../selectors/events';
import A11yAnnouncer from './A11yAnnouncer';

const EventFilters = ({ filters, categories, dispatch, eventCount }) => {
  const hasActiveFilters = 
    filters.text !== '' ||
    filters.category !== 'All' ||
    filters.costType !== 'All' ||
    filters.timeRange !== 'all';

  const activeFilterCount = [
    filters.text !== '',
    filters.category !== 'All',
    filters.costType !== 'All',
    filters.timeRange !== 'all'
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    dispatch(setTextFilter(''));
    dispatch(setCategoryFilter('All'));
    dispatch(setCostTypeFilter('All'));
    dispatch(setTimeRangeFilter('all'));
  };

  return (
    <section className="event-filters" aria-label="Event search and filters">
      {/* Search Input with Icon */}
      <div className="event-filters__search-wrapper">
        <div className="event-filters__search-input-wrapper">
          <svg
            className="event-filters__search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <label className="visually-hidden" htmlFor="search-events">
            Search events
          </label>
          <input
            id="search-events"
            type="text"
            className="event-filters__search-input"
            placeholder="Search events by title or description..."
            value={filters.text}
            onChange={(e) => dispatch(setTextFilter(e.target.value))}
          />
          {filters.text && (
            <button
              type="button"
              className="event-filters__clear-search"
              onClick={() => dispatch(setTextFilter(''))}
              aria-label="Clear search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="event-filters__chips">
        {/* Category Filter Chips */}
        <div className="event-filters__chip-group">
          <span className="event-filters__chip-label">Category:</span>
          <div className="event-filters__chip-list">
            <button
              type="button"
              className={`event-filters__chip ${filters.category === 'All' ? 'event-filters__chip--active' : ''}`}
              onClick={() => dispatch(setCategoryFilter('All'))}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`event-filters__chip ${filters.category === category ? 'event-filters__chip--active' : ''}`}
                onClick={() => dispatch(setCategoryFilter(category))}
              >
                {category}
                {filters.category === category && (
                  <span className="event-filters__chip-badge" aria-label="Active filter">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cost Filter Chips */}
        <div className="event-filters__chip-group">
          <span className="event-filters__chip-label">Cost:</span>
          <div className="event-filters__chip-list">
            {['All', 'Free', 'Paid'].map((costType) => (
              <button
                key={costType}
                type="button"
                className={`event-filters__chip ${filters.costType === costType ? 'event-filters__chip--active' : ''}`}
                onClick={() => dispatch(setCostTypeFilter(costType))}
              >
                {costType}
                {filters.costType === costType && filters.costType !== 'All' && (
                  <span className="event-filters__chip-badge" aria-label="Active filter">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Range Filter Chips */}
        <div className="event-filters__chip-group">
          <span className="event-filters__chip-label">When:</span>
          <div className="event-filters__chip-list">
            {[
              { value: 'all', label: 'All' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' }
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={`event-filters__chip ${filters.timeRange === value ? 'event-filters__chip--active' : ''}`}
                onClick={() => dispatch(setTimeRangeFilter(value))}
              >
                {label}
                {filters.timeRange === value && filters.timeRange !== 'all' && (
                  <span className="event-filters__chip-badge" aria-label="Active filter">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Button and Results Count */}
      <div className="event-filters__footer">
        {hasActiveFilters && (
          <button
            type="button"
            className="event-filters__clear-btn"
            onClick={clearAllFilters}
            aria-label="Clear all filters"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear all filters
          </button>
        )}
        <div className="event-filters__count" role="status" aria-live="polite">
          <span className="event-filters__count-number">{eventCount}</span>
          <span className="event-filters__count-label">
            {eventCount === 1 ? 'event' : 'events'} found
          </span>
        </div>
      </div>

      <A11yAnnouncer message={`Found ${eventCount} ${eventCount === 1 ? 'event' : 'events'}`} />
    </section>
  );
};

const mapStateToProps = (state) => {
  const events = selectEvents(state.events, state.filters);
  const categories = Array.from(new Set(state.events.map((event) => event.category))).sort();
  return {
    filters: state.filters,
    categories,
    eventCount: events.length
  };
};

export default connect(mapStateToProps)(EventFilters);
