import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => (
  <div className="not-found-page">
    <div className="not-found-page__container">
      {/* Illustration/Icon */}
      <div className="not-found-page__illustration">
        <div className="not-found-page__icon-wrapper">
          <FontAwesomeIcon icon={faExclamationTriangle} className="not-found-page__icon" />
        </div>
        <div className="not-found-page__number">404</div>
      </div>

      {/* Better Messaging */}
      <div className="not-found-page__content">
        <h1 className="not-found-page__title">Page Not Found</h1>
        <p className="not-found-page__message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="not-found-page__suggestion">
          Don't worry, let's get you back on track. You can return to the homepage or browse our events.
        </p>

        {/* Clear CTA to Go Home */}
        <div className="not-found-page__actions">
          <Link to="/" className="not-found-page__cta not-found-page__cta--primary">
            <FontAwesomeIcon icon={faHome} />
            <span>Go to Homepage</span>
          </Link>
          <Link to="/" className="not-found-page__cta not-found-page__cta--secondary">
            <FontAwesomeIcon icon={faSearch} />
            <span>Browse Events</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
