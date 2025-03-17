import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import classes from '../styles/Login.module.css';

export const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

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

    await login(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className={classes.form_layout}>
      <form className={classes.form_card} onSubmit={handleSubmitForm}>
          <h1>Login to your account</h1>
      
          <div className={classes.form_input}>
            <label>Email:</label>
            <input
              type='email' 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={emailError && classes.alert_input}
            />
            {emailError && (
              <div className={classes.error_msg}>
                <label className={classes.alert_msg}>Please enter valid email!</label>
              </div>
            )}
          </div>
      
          <div className={classes.form_input}>
            <label className={classes.label_password}>
              <label>Password:</label>
            </label>
            <input 
              type={showPass ? 'text' : 'password'} 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={passError && classes.alert_input}
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
            type='submit' 
            className={classes.form_btn}
          >
            Login now
          </button>
      
          <label className={classes.link_change}>
            Don't have an account ? 
            <Link to='/signup' className={classes.link_link}>Sign up</Link>
          </label>
          {error && (
            <label className={`${classes.error_style} ${classes.alert_msg}`}>{error}</label>
          )}
      </form>
    </div>
  )
}