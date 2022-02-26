import React, { useEffect, useState } from 'react';
import styles from './CardDashboard.module.css';
import { useNavigate } from 'react-router-dom';
import CardMaker from './card_maker/CardMaker';
import Card from './card/Card';

import { getUser, logout } from 'service/auth';
import { deleteCardData, getCardData, updateCardData } from 'service/database';
import useLocalStorage from 'hooks/useLocalStorage';

const CardDashboard = (props) => {
  const navigate = useNavigate();

  const [cards, setCards] = useLocalStorage('cards', null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    getUser(
      (user) => {
        setUid(user.uid);
      },
      () => {
        navigate('/');
      }
    );
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCardData(uid);
      setCards(data);
    };

    fetchData();
  }, [uid, setCards]);

  const handleInput = async (event, key) => {
    const type = event.target.id;
    const value = event.target.value;

    const updateCard = { ...cards[key] };
    updateCard[type] = value;

    const data = await updateCardData(uid, updateCard);
    const newCards = { ...cards };
    newCards[key] = data;
    setCards(newCards);
  };

  const addNewCard = async () => {
    const postData = {
      key: null,
      profile: '',
      name: '',
      company: '',
      email: '',
      phoneNumber: '',
      description: '',
      style: setRandomStyle(),
    };

    const [data, key] = await updateCardData(uid, postData);
    const newCards = { [key]: data, ...cards };
    setCards(newCards);
  };

  const deleteCard = (key) => {
    deleteCardData(uid, key);
    const newCards = { ...cards };
    delete newCards[key];
    setCards(newCards);
  };

  const updateImage = async (url, key) => {
    const updateCard = { ...cards[key] };
    if (url) updateCard['profile'] = url;

    const data = await updateCardData(uid, updateCard);
    const newCards = { ...cards };
    newCards[key] = data;
    setCards(newCards);
  };

  const setRandomStyle = () => {
    const style = ['pink', 'black', 'colorful'];
    const index = Math.floor(Math.random() * 3);

    return style[index];
  };

  const handleLogout = () => {
    logout(
      () => {
        navigate('/');
      },
      () => {}
    );
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.title}>
          <img className={styles.logo} src="/images/logo.png" alt="card icon" />
          <h1 className={styles['project-name']}>Business Card Maker</h1>
        </div>
        <button className={styles.logout} onClick={handleLogout}>
          logout
        </button>
      </header>
      <section className={styles.main}>
        <ul className={styles['card-list']}>
          <CardMaker handleClick={addNewCard} />
          {cards &&
            Object.values(cards).map((el) => (
              <Card
                key={el.key}
                card={el}
                handleInput={handleInput}
                updateImage={updateImage}
                handleDelete={deleteCard}
              />
            ))}
        </ul>
      </section>
    </>
  );
};

export default CardDashboard;
