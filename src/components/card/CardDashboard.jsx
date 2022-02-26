import React, { memo, useEffect, useState } from 'react';
import styles from './CardDashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'service/auth';
import Header from 'components/header/Header';
import CardList from './card_list/CardList';

const CardDashboard = memo(() => {
  const navigate = useNavigate();

  const [uid, setUid] = useState(null);

  // check if user data exists
  // if there is no user data, return to login page
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

  return (
    <>
      <Header />
      <section className={styles.main}>
        <CardList uid={uid} />
      </section>
    </>
  );
});

export default CardDashboard;
