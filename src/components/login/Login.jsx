import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

const Login = (props) => {
  const navigate = useNavigate();

  const linkTo = (route = '') => {
    navigate(`/${route}`);
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
          <form className={styles.form}>
            <input className={styles.input} type="text" placeholder="email" />
            <input
              className={styles.input}
              type="password"
              placeholder="password"
            />
            <button className={styles['login-button']}>Login</button>
            <button
              className={styles['register-button']}
              onClick={() => linkTo('register')}
            >
              New user? Register Here
            </button>
          </form>
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
