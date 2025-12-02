import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faExternalLinkAlt,
  faDownload,
  faUser,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buildICSFile, buildGoogleCalendarUrl } from '../utils/calendar';
import FocusManager from '../utils/FocusManager';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const formatTimeRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameDay = startDate.toDateString() === endDate.toDateString();
  
  if (sameDay) {
    return `${formatTime(start)} - ${formatTime(end)}`;
  }
  return `${formatTime(start)} - ${formatDate(end)} ${formatTime(end)}`;
};

const focusManager = new FocusManager();

export const EventCard = ({ event }) => {
  useEffect(() => {
    if (!event) return;
    focusManager.trap('#event-title');
    return () => focusManager.restore();
  }, [event]);

  if (!event) {
    return (
      <div className="event-card-page">
        <div className="event-card-page__container">
          <h2>Event not found</h2>
          <Link to="/" className="event-card-page__back">Back to events</Link>
        </div>
      </div>
    );
  }

  const icsContent = buildICSFile(event);
  const googleCalendarUrl = buildGoogleCalendarUrl(event);

  const downloadIcs = () => {
    const element = document.createElement('a');
    const file = new Blob([icsContent], { type: 'text/calendar' });
    element.href = URL.createObjectURL(file);
    element.download = `${event.title}.ics`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="event-card-page">
      {/* Breadcrumb Navigation */}
      <nav className="event-card-page__breadcrumb" aria-label="Breadcrumb">
        <ol className="event-card-page__breadcrumb-list">
          <li>
            <Link to="/" className="event-card-page__breadcrumb-link">
              Events
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faChevronRight} className="event-card-page__breadcrumb-separator" />
          </li>
          <li className="event-card-page__breadcrumb-current" aria-current="page">
            {event.title}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="event-card-page__hero">
        <div className="event-card-page__hero-content">
          <div className="event-card-page__hero-badges">
            <span className="event-card-page__category-badge">{event.category}</span>
            <span className={`event-card-page__cost-badge event-card-page__cost-badge--${event.costType.toLowerCase()}`}>
              {event.costType}
            </span>
          </div>
          <h1 className="event-card-page__title" id="event-title" tabIndex="-1">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="event-card-page__container">
        {/* Description */}
        <section className="event-card-page__description">
          <h2 className="visually-hidden">Event Description</h2>
          <p>{event.longDescription || event.shortDescription}</p>
        </section>

        {/* Info Cards */}
        <div className="event-card-page__info-cards">
          <div className="event-card-page__info-card">
            <div className="event-card-page__info-card-icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <div className="event-card-page__info-card-content">
              <h3 className="event-card-page__info-card-label">Date</h3>
              <p className="event-card-page__info-card-value">{formatDate(event.startDateTime)}</p>
            </div>
          </div>

          <div className="event-card-page__info-card">
            <div className="event-card-page__info-card-icon">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div className="event-card-page__info-card-content">
              <h3 className="event-card-page__info-card-label">Time</h3>
              <p className="event-card-page__info-card-value">
                {formatTimeRange(event.startDateTime, event.endDateTime)}
              </p>
            </div>
          </div>

          <div className="event-card-page__info-card">
            <div className="event-card-page__info-card-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className="event-card-page__info-card-content">
              <h3 className="event-card-page__info-card-label">Location</h3>
              <p className="event-card-page__info-card-value">{event.location}</p>
            </div>
          </div>

          <div className="event-card-page__info-card">
            <div className="event-card-page__info-card-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="event-card-page__info-card-content">
              <h3 className="event-card-page__info-card-label">Organizer</h3>
              <p className="event-card-page__info-card-value">{event.organizer}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <section className="event-card-page__actions">
          <h2 className="visually-hidden">Event Actions</h2>
          <div className="event-card-page__action-group">
            <button 
              className="event-card-page__action-btn event-card-page__action-btn--primary" 
              onClick={downloadIcs}
            >
              <FontAwesomeIcon icon={faDownload} />
              <span>Download .ics</span>
            </button>
            <a
              className="event-card-page__action-btn event-card-page__action-btn--secondary"
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Add to Google Calendar</span>
              <FontAwesomeIcon icon={faExternalLinkAlt} className="event-card-page__action-btn-external" />
            </a>
            {event.sourceUrl && (
              <a
                className="event-card-page__action-btn event-card-page__action-btn--tertiary"
                href={event.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                <span>View Source</span>
              </a>
            )}
          </div>
        </section>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: event.title,
            startDate: event.startDateTime,
            endDate: event.endDateTime,
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: event.location
            },
            organizer: {
              '@type': 'Organization',
              name: event.organizer
            },
            description: event.longDescription
          })
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  event: state.events.find((event) => event.id === props.match.params.id)
});

export default connect(mapStateToProps)(EventCard);
