import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';
import app from 'service/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Register = (props) => {
  const navigate = useNavigate();

  const formRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const errorRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const linkTo = (route = '') => {
    navigate(`/${route}`);
  };

  const createUser = async (email, password) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        return true;
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
        return false;
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (name === '' || email === '' || password === '') return;

    setEmailError(false);
    setPasswordError(false);
    const register = createUser(
      emailRef.current.value,
      passwordRef.current.value
    ).then(() => {
      console.log(register);
    });
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
          <form ref={formRef} className={styles.form} onSubmit={handleRegister}>
            <input
              ref={nameRef}
              className={styles.input}
              type="text"
              placeholder="name"
            />
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
            >
              aa
            </p>
            <button className={styles['register-button']}>Register</button>
            <button className={styles['login-button']} onClick={() => linkTo()}>
              Already have an account?
            </button>
          </form>
        </section>
        <section className={styles.footer}>
          <h4 className={styles.desc}>Create and Save your Business Cards!</h4>
        </section>
      </section>
    </div>
  );
};

export default Register;
