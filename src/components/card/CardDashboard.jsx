import React, { useEffect, useState } from 'react';
import styles from './CardDashboard.module.css';
import { useNavigate } from 'react-router-dom';
import CardMaker from './card_maker/CardMaker';
import Card from './card/Card';

import app from 'service/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  child,
  update,
} from 'firebase/database';

const CardDashboard = (props) => {
  const navigate = useNavigate();

  const [cardsInfo, setCardsInfo] = useState({});
  const [user, setUser] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigate(`/`);
      }
    });
  }, []);

  useEffect(() => {
    console.log(uid);
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `users/${uid}/posts`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCardsInfo(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uid]);

  const handleInput = (event, key) => {
    const database = getDatabase(app);
    const type = event.target.id;
    const value = event.target.value;
    const postData = cardsInfo[key];
    postData[type] = value;

    const updates = {};
    updates[`users/${uid}/posts/${key}`] = postData;

    return update(ref(database), updates);
  };

  const addNewCard = () => {
    const database = getDatabase(app);
    const postData = {
      key: '',
      profile: '',
      name: '',
      company: '',
      email: '',
      phoneNumber: '',
      description: '',
      style: setRandomStyle(),
    };
    const newPostKey = push(child(ref(database), 'posts')).key;
    postData['key'] = newPostKey;

    const newCardsInfo = [postData, ...cardsInfo];
    setCardsInfo(newCardsInfo);

    const updates = {};
    updates[`users/${uid}/posts/${newPostKey}`] = postData;

    return update(ref(database), updates);
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
          {Object.values(cardsInfo).map((el) => (
            <Card key={el.key} cardInfo={el} handleInput={handleInput} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default CardDashboard;
