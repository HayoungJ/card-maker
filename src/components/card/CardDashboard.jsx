import React, { useEffect, useState } from 'react';
import styles from './CardDashboard.module.css';
import app from 'service/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CardMaker from './card_maker/CardMaker';
import Card from './card/Card';

const CardDashboard = (props) => {
  const [cardsInfo, setCardsInfo] = useState([]);

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

  const addNewCard = () => {
    const newCard = {
      color: setRandomStyle(),
    };
    const newList = [newCard, ...cardsInfo];
    setCardsInfo(newList);
  };

  const setRandomStyle = () => {
    const style = ['pink', 'black', 'colorful'];
    const index = Math.floor(Math.random() * 3);

    return style[index];
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
      <section className={styles.main}>
        <ul className={styles['card-list']}>
          <CardMaker handleClick={addNewCard} />
          {cardsInfo.map((el, index) => (
            <Card key={index} colorStyle={el.color} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default CardDashboard;
