import React, { useRef } from 'react';
import styles from './Card.module.css';

const Card = ({ colorStyle }) => {
  const imageRef = useRef();

  return (
    <li className={styles.card}>
      <form className={`${styles.form} ${styles[`${colorStyle}`]}`}>
        <div className={styles['image-wrap']}>
          <img
            className={styles.image}
            src="https://via.placeholder.com/100"
            alt="profile"
          />
          <input
            ref={imageRef}
            className={styles['image-input']}
            type="file"
            accept="image/*"
          />
          <button
            className={styles['image-button']}
            onClick={(e) => {
              e.preventDefault();
              imageRef.current.click();
            }}
          >
            Add Image
          </button>
        </div>
        <div className={styles['input-wrap']}>
          <input
            className={styles.input}
            type="text"
            placeholder="Name"
          ></input>
          <input
            className={styles.input}
            type="text"
            placeholder="Company"
          ></input>
          <input
            className={styles.input}
            type="text"
            placeholder="Email"
          ></input>
          <input
            className={styles.input}
            type="text"
            placeholder="Phone Number"
          ></input>
          <textarea
            className={styles.textarea}
            placeholder="Description"
            row="3"
          ></textarea>
        </div>
      </form>
    </li>
  );
};

export default Card;
