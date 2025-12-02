import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { startSignUp } from '../actions/auth';
import isEmail from 'validator/lib/isEmail';
import { Link } from 'react-router-dom';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SignupPage = ({ startSignUp, error, unsetError, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [focused, setFocused] = useState({
    name: false,
    handle: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    if (error) {
      setLocalError(error);
      unsetError();
    }
  }, [error, unsetError]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setLocalError('');
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: formData[field].length > 0 });
  };

  const onStartSignUp = (e) => {
    e.preventDefault();
    setLocalError('');

    // Validation
    if (!formData.name || !formData.handle || !formData.email || !formData.password || !formData.confirmPassword) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (!isEmail(formData.email)) {
      setLocalError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords don't match");
      return;
    }

    const credentials = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      handle: formData.handle
    };

    startSignUp(credentials).catch(() => {
      // Error handling is done via Redux
    });
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login
    console.log(`Sign up with ${provider}`);
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
              Join CampusFlow to discover and plan events at Florida Tech.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-page__form-container">
          {loading && (
            <div className="auth-page__loading">
              <div className="auth-page__spinner"></div>
              <p>Creating your account...</p>
            </div>
          )}

          <div className="auth-page__form-wrapper">
            <h2 className="auth-page__form-title">Create an account</h2>
            <p className="auth-page__form-subtitle">Sign up to get started</p>

            {/* Error Display */}
            {localError && (
              <div className="auth-page__error" role="alert">
                <span className="auth-page__error-icon">⚠</span>
                <span>{localError}</span>
              </div>
            )}

            <form onSubmit={onStartSignUp} className="auth-page__form" noValidate>
              {/* Name Input */}
              <div className="auth-page__input-group">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  className={`auth-page__input ${localError && !formData.name ? 'auth-page__input--error' : ''}`}
                  required
                />
                <label
                  htmlFor="name"
                  className={`auth-page__label ${focused.name || formData.name ? 'auth-page__label--floating' : ''}`}
                >
                  Full name
                </label>
              </div>

              {/* Handle Input */}
              <div className="auth-page__input-group">
                <input
                  id="handle"
                  type="text"
                  value={formData.handle}
                  onChange={(e) => handleChange('handle', e.target.value)}
                  onFocus={() => handleFocus('handle')}
                  onBlur={() => handleBlur('handle')}
                  className={`auth-page__input ${localError && !formData.handle ? 'auth-page__input--error' : ''}`}
                  required
                />
                <label
                  htmlFor="handle"
                  className={`auth-page__label ${focused.handle || formData.handle ? 'auth-page__label--floating' : ''}`}
                >
                  User handle
                </label>
              </div>

              {/* Email Input */}
              <div className="auth-page__input-group">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className={`auth-page__input ${localError && !formData.email ? 'auth-page__input--error' : ''}`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`auth-page__label ${focused.email || formData.email ? 'auth-page__label--floating' : ''}`}
                >
                  Email address
                </label>
              </div>

              {/* Password Input */}
              <div className="auth-page__input-group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  className={`auth-page__input ${localError && !formData.password ? 'auth-page__input--error' : ''}`}
                  required
                />
                <label
                  htmlFor="password"
                  className={`auth-page__label ${focused.password || formData.password ? 'auth-page__label--floating' : ''}`}
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

              {/* Confirm Password Input */}
              <div className="auth-page__input-group">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`auth-page__input ${localError && formData.password !== formData.confirmPassword ? 'auth-page__input--error' : ''}`}
                  required
                />
                <label
                  htmlFor="confirmPassword"
                  className={`auth-page__label ${focused.confirmPassword || formData.confirmPassword ? 'auth-page__label--floating' : ''}`}
                >
                  Confirm password
                </label>
                <button
                  type="button"
                  className="auth-page__password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <button
                type="submit"
                className="auth-page__submit-btn"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>

            {/* Social Login Buttons */}
            <div className="auth-page__social">
              <div className="auth-page__social-divider">
                <span>Or sign up with</span>
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

            {/* Login Link */}
            <div className="auth-page__footer">
              <p>
                Already have an account?{' '}
                <Link to="/" className="auth-page__link">
                  Sign in
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
  startSignUp: (credentials) => dispatch(startSignUp(credentials)),
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
