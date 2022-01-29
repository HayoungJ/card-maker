import React, { useEffect, useState } from 'react';
import styles from './CardDashboard.module.css';
import app from 'service/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CardList from './card_list/CardList';
import CardMaker from './card_maker/CardMaker';

const CardDashboard = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('singed in ' + user.email);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const openMaker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>
          <img className={styles.logo} src="/images/logo.png" alt="card icon" />
          <h1 className={styles['project-name']}>Business Card Maker</h1>
        </div>
        <button className={styles.logout}>logout</button>
      </header>
      <section className={styles.maker}>
        {isOpen ? (
          <button className={styles.open} onClick={openMaker}>
            <i class="fas fa-chevron-up"></i>
          </button>
        ) : (
          <button className={styles.open} onClick={openMaker}>
            <i class="fas fa-chevron-down"></i>
          </button>
        )}
        <h2 className={styles['section-title']}>Card Maker</h2>
        {isOpen ? <CardMaker /> : <></>}
      </section>
      <section className={styles.list}>
        <CardList />
      </section>
    </>
  );
};

export default CardDashboard;
