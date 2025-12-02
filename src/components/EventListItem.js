import React from 'react';
import { Link } from 'react-router-dom';
import { faClock, faArrowRight, faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Better date/time formatting
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Check if it's today
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  // Check if it's tomorrow
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  
  // Otherwise return formatted date
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
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

// Category color mapping
const getCategoryColor = (category) => {
  const colors = {
    'Academic': '#6366f1',        // Indigo (blue-purple)
    'Social': '#a855f7',          // Purple
    'Career': '#f59e0b',          // Amber (yellow-orange)
    'STEM': '#3b82f6',            // Blue
    'Entrepreneurship': '#f97316', // Orange
    'Athletics': '#ef4444',       // Red
    'Networking': '#06b6d4',      // Cyan (light blue)
    'Sustainability': '#84cc16',  // Lime (yellow-green)
    'Sports': '#dc2626',          // Dark Red
    'Workshop': '#8b5cf6',        // Violet
    'Cultural': '#ec4899',        // Pink
    'General': '#64748b'          // Slate (gray)
  };
  return colors[category] || colors['General'];
};

export const EventListItem = ({ 
  id, 
  title, 
  startDateTime, 
  endDateTime, 
  location, 
  category, 
  costType, 
  shortDescription 
}) => (
  <article className="event-list-item">
    <div className="event-list-item__content">
      {/* Header with Category Badge */}
      <div className="event-list-item__header">
        <span 
          className="event-list-item__category-badge"
          style={{ 
            '--category-color': getCategoryColor(category),
            backgroundColor: `${getCategoryColor(category)}15`,
            borderColor: getCategoryColor(category),
            color: getCategoryColor(category)
          }}
        >
          {category}
        </span>
        <span className={`event-list-item__cost-badge event-list-item__cost-badge--${costType.toLowerCase()}`}>
          {costType}
        </span>
      </div>

      {/* Title */}
      <Link className="event-list-item__title" to={`/event/${id}`}>
        <h3>{title}</h3>
      </Link>

      {/* Description */}
      {shortDescription && (
        <p className="event-list-item__description">{shortDescription}</p>
      )}

      {/* Metadata */}
      <div className="event-list-item__meta">
        <div className="event-list-item__meta-item">
          <FontAwesomeIcon icon={faCalendarAlt} className="event-list-item__meta-icon" />
          <span className="event-list-item__meta-label">Date</span>
          <span className="event-list-item__meta-value">{formatDate(startDateTime)}</span>
        </div>

        <div className="event-list-item__meta-item">
          <FontAwesomeIcon icon={faClock} className="event-list-item__meta-icon" />
          <span className="event-list-item__meta-label">Time</span>
          <span className="event-list-item__meta-value">{formatTimeRange(startDateTime, endDateTime)}</span>
        </div>

        {location && (
          <div className="event-list-item__meta-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="event-list-item__meta-icon" />
            <span className="event-list-item__meta-label">Location</span>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ' Florida Tech')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="event-list-item__meta-value event-list-item__meta-link"
            >
              {location}
            </a>
          </div>
        )}
      </div>
    </div>

    {/* Action Button */}
    <Link 
      to={`/event/${id}`} 
      className="event-list-item__action"
      aria-label={`View details for ${title}`}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  </article>
);

export default EventListItem;
