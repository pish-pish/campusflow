import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import isEmail from 'validator/lib/isEmail';
import { Link } from 'react-router-dom';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LoginPage = ({ startLogin, error, unsetError, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [focused, setFocused] = useState({ email: false, password: false });

  useEffect(() => {
    if (error) {
      setLocalError(error);
      unsetError();
    }
  }, [error, unsetError]);

  const onStartLogin = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (!isEmail(email)) {
      setLocalError('Please enter a valid email address');
      return;
    }

    const credentials = { email, password };
    startLogin(credentials).catch(() => {
      // Error handling is done via Redux
    });
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="auth-page">
      {/* Split Screen Layout */}
      <div className="auth-page__split">
        {/* Left Side - Branding */}
        <div className="auth-page__branding">
          <div className="auth-page__branding-content">
            <img src="/images/logo.png" alt="CampusFlow" className="auth-page__logo" />
            <h1 className="auth-page__brand-title">CampusFlow</h1>
            <p className="auth-page__brand-subtitle">
              Discover what is happening around Florida Tech and plan your week.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-page__form-container">
          {loading && (
            <div className="auth-page__loading">
              <div className="auth-page__spinner"></div>
              <p>Signing in...</p>
            </div>
          )}

          <div className="auth-page__form-wrapper">
            <h2 className="auth-page__form-title">Welcome back</h2>
            <p className="auth-page__form-subtitle">Sign in to your account</p>

            {/* Error Display */}
            {localError && (
              <div className="auth-page__error" role="alert">
                <span className="auth-page__error-icon">⚠</span>
                <span>{localError}</span>
              </div>
            )}

            <form onSubmit={onStartLogin} className="auth-page__form" noValidate>
              {/* Email Input with Floating Label */}
              <div className="auth-page__input-group">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused({ ...focused, email: true })}
                  onBlur={() => setFocused({ ...focused, email: email.length > 0 })}
                  className={`auth-page__input ${localError && !email ? 'auth-page__input--error' : ''}`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`auth-page__label ${focused.email || email ? 'auth-page__label--floating' : ''}`}
                >
                  Email address
                </label>
              </div>

              {/* Password Input with Floating Label and Toggle */}
              <div className="auth-page__input-group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused({ ...focused, password: true })}
                  onBlur={() => setFocused({ ...focused, password: password.length > 0 })}
                  className={`auth-page__input ${localError && !password ? 'auth-page__input--error' : ''}`}
                  required
                />
                <label
                  htmlFor="password"
                  className={`auth-page__label ${focused.password || password ? 'auth-page__label--floating' : ''}`}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="auth-page__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <button
                type="submit"
                className="auth-page__submit-btn"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            {/* Social Login Buttons */}
            <div className="auth-page__social">
              <div className="auth-page__social-divider">
                <span>Or continue with</span>
              </div>
              <div className="auth-page__social-buttons">
                <button
                  type="button"
                  className="auth-page__social-btn auth-page__social-btn--google"
                  onClick={() => handleSocialLogin('google')}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="auth-page__social-btn auth-page__social-btn--facebook"
                  onClick={() => handleSocialLogin('facebook')}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                  <span>Facebook</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="auth-page__footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="auth-page__link">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: (credentials) => dispatch(startLogin(credentials)),
  unsetError: () =>
    dispatch({
      type: 'SET_ERRORS',
      error: ''
    })
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
