import React, { useEffect } from 'react';
import styles from './CardList.module.css';
import useLocalStorage from 'hooks/useLocalStorage';
import { deleteCardData, getCardData, updateCardData } from 'service/database';
import CardMaker from '../card_maker/CardMaker';
import Card from '../card/Card';

const CardList = ({ uid }) => {
  const [cards, setCards] = useLocalStorage('cards', null);

  // fetch user data from firebase
  useEffect(() => {
    console.log(uid);
    const fetchData = async () => {
      const data = uid ? await getCardData(uid) : null;
      data && setCards(data);
    };

    fetchData();
  }, [uid, setCards]);

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

  const handleInput = async (type, value, key) => {
    const updateCard = { ...cards[key] };
    if (value || value === '') updateCard[type] = value;

    const [data] = await updateCardData(uid, updateCard);
    const newCards = { ...cards };
    newCards[key] = data;
    setCards(newCards);
  };

  const deleteCard = (key) => {
    deleteCardData(uid, key);

    const newCards = { ...cards };
    delete newCards[key];
    setCards(newCards);
  };

  const setRandomStyle = () => {
    const style = ['pink', 'black', 'colorful'];
    const index = Math.floor(Math.random() * 3);

    return style[index];
  };

  return (
    <ul className={styles['card-list']}>
      <CardMaker handleClick={addNewCard} />
      {cards &&
        Object.values(cards).map((card) => (
          <Card
            key={card.key}
            card={card}
            handleInput={handleInput}
            handleDelete={deleteCard}
          />
        ))}
    </ul>
  );
};

export default CardList;
