import React, { useState, useContext } from 'react';
import { useForm } from './useForm'; // Custom hook for form handling
import { AuthContext } from './AuthContext'; // Auth context for user management
import { useMutation } from '@apollo/client'; // For GraphQL mutations
import { SIGNIN, SIGNUP } from '../../queries/mutations'; // GraphQL mutations

const AccountModal = () => {
  const [activeForm, setActiveForm] = useState('login');
  const { login } = useContext(AuthContext);

  // Form handlers using the custom useForm hook
  const {
    values,
    onChange,
    onSubmit,
    formRef,
    isValidated,
    errors,
    setErrors,
  } = useForm(handleSubmit, { contact: '', password: '' });

  const [signIn, { loading: signInLoading }] = useMutation(SIGNIN, {
    onCompleted: (data) => {
      login(data.signIn); // Update AuthContext with user data
    },
    onError: (error) => {
      setErrors({ general: error.message }); // Set errors
    },
  });

  const [signUp, { loading: signUpLoading }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      login(data.signUp); // Update AuthContext with user data
    },
    onError: (error) => {
      setErrors({ general: error.message }); // Set errors
    },
  });

  // Handle form submission based on active form
  function handleSubmit() {
    if (activeForm === 'login') {
      signIn({ variables: { contact: values.contact, password: values.password } });
    } else if (activeForm === 'register') {
      signUp({ variables: { contact: values.contact, password: values.password } });
    }
  }

  // Switch between forms
  const handleFormChange = (form) => {
    setActiveForm(form);
    setErrors({});
  };

  // Custom validation logic
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === 'contact') {
      if (!value) {
        newErrors.contact = 'Phone number or email address is required.';
      } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.contact = 'Please enter a valid phone number or email address.';
      } else {
        delete newErrors.contact;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required.';
      } else if (value.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long.';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  // Handle input change with validation
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(event); // Update form values
    if (isValidated) {
      validateField(name, value); // Validate field if form has been submitted
    }
  };

  return (
    <div id="account-modal" className="ct-panel active" data-behaviour="modal" aria-label="Account modal">
      <div className="ct-panel-actions">
        <button className="ct-toggle-close" data-type="type-1" aria-label="Close account modal">
          <svg className="ct-icon" width="12" height="12" viewBox="0 0 15 15">
            <path d="M1 15a1 1 0 01-.71-.29 1 1 0 010-1.41l5.8-5.8-5.8-5.8A1 1 0 011.7.29l5.8 5.8 5.8-5.8a1 1 0 011.41 1.41l-5.8 5.8 5.8 5.8a1 1 0 01-1.41 1.41l-5.8-5.8-5.8 5.8A1 1 0 011 15z"></path>
          </svg>
        </button>
      </div>

      <div className="ct-panel-content">
        <div className="ct-account-modal">
          <ul>
            <li className={`ct-login ${activeForm === 'login' ? 'active' : ''}`} tabIndex="0" onClick={() => handleFormChange('login')}>
              Login
            </li>
            <li className={`ct-register ${activeForm === 'register' ? 'active' : ''}`} tabIndex="0" onClick={() => handleFormChange('register')}>
              Sign Up
            </li>
          </ul>

          <div className="ct-account-forms">
            {errors.general && <div className="error-message">{errors.general}</div>}

            {(activeForm === 'login' || activeForm === 'register') && (
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                <p>
                  <label htmlFor="contact">Phone Number or Email Address</label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    className={`input ${errors.contact ? 'input-error' : ''}`}
                    value={values.contact}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                  {isValidated && errors.contact && (
                    <div className="error-message">{errors.contact}</div>
                  )}
                </p>

                <p>
                  <label htmlFor="password">Password</label>
                  <span className="account-password-input password-input">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={`input ${errors.password ? 'input-error' : ''}`}
                      value={values.password}
                      onChange={handleChange}
                      autoComplete={activeForm === 'login' ? 'current-password' : 'new-password'}
                      required
                    />
                    <span className="show-password-input"></span>
                  </span>
                  {isValidated && errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </p>

                {activeForm === 'login' && (
                  <p className="login-remember col-2">
                    <span>
                      <input name="rememberme" type="checkbox" id="rememberme" className="ct-checkbox" value="forever" />
                      <label htmlFor="rememberme">Remember Me</label>
                    </span>
                    <a href="#" className="ct-forgot-password" onClick={() => handleFormChange('forgot')}>
                      Forgot Password?
                    </a>
                  </p>
                )}

                <p className="login-submit">
                  <button className="ct-button ct-account-login-submit has-text-align-center" type="submit" disabled={signInLoading || signUpLoading}>
                    {signInLoading || signUpLoading ? (
                      <svg className="ct-button-loader" width="16" height="16" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" opacity="0.2" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2.5"></circle>
                        <path d="m12,2c5.52,0,10,4.48,10,10" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2.5">
                          <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.6s" from="0 12 12" to="360 12 12" repeatCount="indefinite"></animateTransform>
                        </path>
                      </svg>
                    ) : (
                      activeForm === 'login' ? 'Log In' : 'Register'
                    )}
                  </button>
                </p>
              </form>
            )}

            {activeForm === 'forgot' && (
              <div className="ct-forgot-password-form">
                <form name="lostpasswordform" id="lostpasswordform" onSubmit={onSubmit}>
                  <p>
                    <label htmlFor="contact">Phone Number or Email Address</label>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      className={`input ${errors.contact ? 'input-error' : ''}`}
                      value={values.contact}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                    />
                    {isValidated && errors.contact && (
                      <div className="error-message">{errors.contact}</div>
                    )}
                  </p>

                  <p>
                    <button className="ct-button ct-account-lost-password-submit has-text-align-center" type="submit" disabled={signInLoading || signUpLoading}>
                      {signInLoading || signUpLoading ? (
                        <svg className="ct-button-loader" width="16" height="16" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" opacity="0.2" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2.5"></circle>
                          <path d="m12,2c5.52,0,10,4.48,10,10" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2.5">
                            <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="0.6s" from="0 12 12" to="360 12 12" repeatCount="indefinite"></animateTransform>
                          </path>
                        </svg>
                      ) : (
                        'Get New Password'
                      )}
                    </button>
                  </p>
                </form>

                <a href="#" className="ct-back-to-login ct-login" onClick={() => handleFormChange('login')}>
                  ← Back to login
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;