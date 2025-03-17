import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';
import classes from '../styles/SignUp.module.css';

export const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();

  const toggleShowPass = () => {
    setShowPass(prev => !prev);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setEmailError(false);
    setPassError(false);

    if (!email.includes('@')) {
      setEmailError(true);
    }

    if (password.length < 8) {
      setPassError(true);
    }

    await signup(email, password)
    setEmail('');
    setPassword('');
  }

  return (
    <div className={classes.form_layout}>
      <form className={classes.form_card} onSubmit={handleSubmitForm}>
          <h1>Create an account</h1>

          <div className={classes.form_input}>
            <label>Email</label>
            <input 
              type='email' 
              className={emailError && classes.alert_input}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {emailError && (
              <div className={classes.error_msg}>
                <label className={classes.alert_msg}>Please enter valid email!</label>
              </div>
            )}
          </div>

          <div className={classes.form_input}>
            <label>Password</label>
            <input 
              type={showPass ? 'text' : 'password'} 
              className={passError && classes.alert_input}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <img 
              src={showPass ? 'openEye.png' : 'closedEye.png'} 
              alt='eye'
              onClick={toggleShowPass}
            />
            {passError && (
              <div className={classes.error_msg}>
                <label className={classes.alert_msg}>Password must be 8 digit min!</label>
              </div>
            )}
          </div>
          <button 
            disabled={isLoading} 
            className={classes.form_btn}
          >
            Create an account
          </button>

          <label className={classes.link_change}>
            Already have an account ? 
            <Link to='/login' className={classes.link_link}>Log In</Link>
          </label>

          {error && (
            <label className={`${classes.error_style} ${classes.alert_msg}`}>{error}</label>
          )}
      </form>
    </div>
  )
}