import React, { memo } from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from 'service/auth';

const Header = memo(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      navigate('/');
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <img className={styles.logo} src="/images/logo.png" alt="card icon" />
        <h1 className={styles['project-name']}>Business Card Maker</h1>
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        logout
      </button>
    </header>
  );
});

export default Header;
