import React, { useEffect, useRef, useState } from 'react';
import styles from './Card.module.css';

const Card = ({
  cardInfo: {
    profile,
    name,
    company,
    email,
    phoneNumber,
    description,
    style,
    key,
  },
  handleInput,
}) => {
  const imageRef = useRef();

  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {}, []);

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'mfcsvroh');
    data.append('cloud_name', 'dr5sekusv');

    fetch(' https://api.cloudinary.com/v1_1/dr5sekusv/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <li className={styles.card}>
      <form
        className={`${styles.form} ${styles[`${style}`]}`}
        onInput={(event) => {
          handleInput(event, key);
        }}
      >
        <div className={styles['image-wrap']}>
          <img
            className={styles.image}
            src={url || 'https://via.placeholder.com/100'}
            alt="profile"
          />
          <input
            ref={imageRef}
            className={styles['image-input']}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            className={styles['image-button']}
            onClick={(e) => {
              e.preventDefault();
              imageRef.current.click();
              uploadImage();
            }}
          >
            Add Image
          </button>
        </div>
        <div className={styles['input-wrap']}>
          <input
            id="name"
            className={styles.input}
            type="text"
            placeholder="Name"
            defaultValue={name}
          ></input>
          <input
            id="company"
            className={styles.input}
            type="text"
            placeholder="Company"
            defaultValue={company}
          ></input>
          <input
            id="email"
            className={styles.input}
            type="text"
            placeholder="Email"
            defaultValue={email}
          ></input>
          <input
            id="phoneNumber"
            className={styles.input}
            type="text"
            placeholder="Phone Number"
            defaultValue={phoneNumber}
          ></input>
          <textarea
            id="description"
            className={styles.textarea}
            placeholder="Description"
            row="3"
            defaultValue={description}
          ></textarea>
        </div>
      </form>
    </li>
  );
};

export default Card;
