import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';
import app from 'service/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'components/toast/Toast';

const Register = (props) => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const errorRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [toast, setToast] = useState(false);

  const linkTo = (route = '') => {
    navigate(`/${route}`);
  };

  const createUser = (email, password) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        setToast(true);
        setTimeout(() => {
          linkTo();
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/invalid-email':
            setEmailError(true);
            errorRef.current.innerText = '유효하지 않은 이메일 주소입니다.';
            break;
          case 'auth/email-already-in-use':
            setEmailError(true);
            errorRef.current.innerText = '중복 이메일 주소입니다.';
            break;
          case 'auth/weak-password':
            setPasswordError(true);
            errorRef.current.innerText = '비밀번호는 6자 이상이여야 합니다.';
            break;
          default:
            console.log(errorCode);
        }
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === '' || password === '') return;

    setEmailError(false);
    setPasswordError(false);
    createUser(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <div className={styles.wrap}>
      <section className={styles.modal}>
        <section className={styles.header}>
          <img className={styles.logo} src="/images/logo.png" alt="card icon" />
          <h2 className={styles['project-title']}>Business Card Maker</h2>
        </section>
        <section className={styles.register}>
          <h1 className={styles.title}>Register</h1>
          <form className={styles.form} onSubmit={handleRegister}>
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
            <button className={styles['register-button']}>Register</button>
          </form>
          <button className={styles['login-button']} onClick={() => linkTo()}>
            Already have an account?
          </button>
        </section>
        <section className={styles.footer}>
          <h4 className={styles.desc}>Create and Save your Business Cards!</h4>
        </section>
      </section>
      {toast ? <Toast message={'Register Succeed'} time={1000} /> : <></>}
    </div>
  );
};

export default Register;
