import React, { useEffect, useRef, useState } from 'react';
import styles from './Card.module.css';

const Card = ({ card, handleInput, handleDelete }) => {
  const imageRef = useRef();

  const [data, setData] = useState({});

  useEffect(() => {
    setData({ ...card });
  }, [card]);

  const uploadImage = async (image) => {
    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'mfcsvroh');
    imageData.append('cloud_name', 'dr5sekusv');

    try {
      const resp = await fetch(
        ' https://api.cloudinary.com/v1_1/dr5sekusv/image/upload',
        {
          method: 'post',
          body: imageData,
        }
      );
      const result = await resp.json();
      return result.url;
    } catch (err) {
      return console.log(err);
    }
  };

  const handleChange = (event) => {
    if (event.target.value) {
      const newData = { ...data };
      newData[event.target.id] = event.target.value;
      setData(newData);
    }
  };

  const onDelete = () => {
    handleDelete(data.key);
  };

  return (
    <li className={styles.card}>
      <form
        className={`${styles.form} ${styles[`${data.style}`]}`}
        onInput={(event) => {
          event.target.id !== 'profile' &&
            handleInput(event.target.id, event.target.value, data.key);
        }}
      >
        <div className={styles['image-wrap']}>
          <img
            className={styles.image}
            src={data.profile || 'https://via.placeholder.com/100'}
            alt="profile"
          />
          <input
            ref={imageRef}
            id="profile"
            className={styles['image-input']}
            type="file"
            accept="image/*"
            onChange={async (event) => {
              event.preventDefault();
              const image = event.target.files[0];
              const imageUrl = await uploadImage(image);
              console.log(imageUrl);
              handleInput('profile', imageUrl, data.key);
            }}
          />
          <button
            className={styles['image-button']}
            onClick={async (event) => {
              event.preventDefault();
              imageRef.current.click();
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
            value={data.name || ''}
            onChange={handleChange}
          ></input>
          <input
            id="company"
            className={styles.input}
            type="text"
            placeholder="Company"
            value={data.company || ''}
            onChange={handleChange}
          ></input>
          <input
            id="email"
            className={styles.input}
            type="text"
            placeholder="Email"
            value={data.email || ''}
            onChange={handleChange}
          ></input>
          <input
            id="phoneNumber"
            className={styles.input}
            type="text"
            placeholder="Phone Number"
            value={data.phoneNumber || ''}
            onChange={handleChange}
          ></input>
          <textarea
            id="description"
            className={styles.textarea}
            placeholder="Description"
            row="3"
            value={data.description || ''}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
      <button className={styles['delete-button']} onClick={onDelete}>
        <i className="far fa-times-circle"></i>
      </button>
    </li>
  );
};

export default Card;
