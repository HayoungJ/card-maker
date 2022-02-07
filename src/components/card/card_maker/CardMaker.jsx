import React from 'react';
import styles from './CardMaker.module.css';

const CardMaker = ({ handleClick }) => {
  const onClick = (event) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <li className={styles.wrap}>
      <button className={styles.add} onClick={onClick}>
        <i className="fas fa-plus-circle"></i>
      </button>
    </li>
  );
};

export default CardMaker;
