import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import app from 'service/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = (props) => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const errorRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const linkTo = (route = '') => {
    navigate(`/${route}`);
  };

  const checkAccount = (email, password) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        linkTo('dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            setEmailError(true);
            errorRef.current.innerText = '존재하지 않는 계정입니다.';
            break;
          case 'auth/wrong-password':
            setPasswordError(true);
            errorRef.current.innerText = '틀린 비밀번호 입니다.';
            break;
          default:
            console.log(errorCode);
        }
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === '' || password === '') return;

    setEmailError(false);
    setPasswordError(false);
    checkAccount(email, password);
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
            onClick={() => linkTo('register')}
          >
            New user? Register Here
          </button>
          <div className={styles['sns-wrap']}>
            <p className={styles['sns-text']}>OR</p>
            <div className={styles['sns-buttons']}>
              <button className={styles['sns-button']}>Google</button>
              <button className={styles['sns-button']}>Github</button>
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
