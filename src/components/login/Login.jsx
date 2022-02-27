import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { getUser, githubLogin, googleLogin, login } from 'service/auth';

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    getUser((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    user && navigate('/dashboard');
  }, [user, navigate]);

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  const handleLoginError = (code) => {
    switch (code) {
      case 'auth/user-not-found':
        setEmailError(true);
        errorRef.current.innerText = '존재하지 않는 계정입니다.';
        break;
      case 'auth/wrong-password':
        setPasswordError(true);
        errorRef.current.innerText = '틀린 비밀번호 입니다.';
        break;
      default:
        console.log(code);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === '' || password === '') return;

    setEmailError(false);
    setPasswordError(false);
    login(email, password, handleLoginSuccess, handleLoginError);
  };

  const handleSnsLogin = (type) => {
    switch (type) {
      case 'google':
        googleLogin(handleLoginSuccess, handleLoginError);
        break;
      case 'github':
        githubLogin(handleLoginSuccess, handleLoginError);
        break;
      default:
        console.log('not valide sns login');
        break;
    }
  };

  return (
    <div className={styles.wrap}>
      <section className={styles.modal}>
        <section className={styles.header}>
          <img className={styles.logo} src="/images/logo.png" alt="card icon" />
          <h2 className={styles['project-title']}>Business Card Maker</h2>
        </section>
        <section className={styles.login}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              ref={emailRef}
              className={`${styles.input} ${emailError ? styles.error : ''}`}
              type="text"
              placeholder="email"
            />
            <input
              ref={passwordRef}
              className={`${styles.input} ${passwordError ? styles.error : ''}`}
              type="password"
              placeholder="password"
            />
            <p
              ref={errorRef}
              className={`${styles['error-message']} ${
                emailError || passwordError ? styles.show : ''
              }`}
            ></p>
            <button className={styles['login-button']}>Login</button>
          </form>
          <button
            className={styles['register-button']}
            onClick={() => navigate('/register')}
          >
            New user? Register Here
          </button>
          <div className={styles['sns-wrap']}>
            <p className={styles['sns-text']}>OR</p>
            <div className={styles['sns-buttons']}>
              <button
                className={styles['sns-button']}
                onClick={() => handleSnsLogin('google')}
              >
                Google
              </button>
              <button
                className={styles['sns-button']}
                onClick={() => {
                  handleSnsLogin('github');
                }}
              >
                Github
              </button>
            </div>
          </div>
        </section>
        <section className={styles.footer}>
          <h4 className={styles.desc}>Create and Save your Business Cards!</h4>
        </section>
      </section>
    </div>
  );
};

export default Login;
