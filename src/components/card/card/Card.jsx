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
      const response = await fetch(
        ' https://api.cloudinary.com/v1_1/dr5sekusv/image/upload',
        {
          method: 'post',
          body: imageData,
        }
      );
      const result = await response.json();
      return result.url;
    } catch (error) {
      return console.log(error);
    }
  };

  const onChange = (event) => {
    if (event.target.value) {
      const newData = { ...data };
      newData[event.target.id] = event.target.value;
      setData(newData);
    }
  };

  const onInput = (event) => {
    handleInput(event.target.id, event.target.value, data.key);
  };

  const onDelete = () => {
    handleDelete(data.key);
  };

  return (
    <li className={styles.card}>
      <section className={`${styles['form-wrap']} ${styles[`${data.style}`]}`}>
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
        <form className={styles['input-wrap']} onInput={onInput}>
          <input
            id="name"
            className={styles.input}
            type="text"
            placeholder="Name"
            value={data.name || ''}
            onChange={onChange}
          ></input>
          <input
            id="company"
            className={styles.input}
            type="text"
            placeholder="Company"
            value={data.company || ''}
            onChange={onChange}
          ></input>
          <input
            id="email"
            className={styles.input}
            type="text"
            placeholder="Email"
            value={data.email || ''}
            onChange={onChange}
          ></input>
          <input
            id="phoneNumber"
            className={styles.input}
            type="text"
            placeholder="Phone Number"
            value={data.phoneNumber || ''}
            onChange={onChange}
          ></input>
          <textarea
            id="description"
            className={styles.textarea}
            placeholder="Description"
            row="3"
            value={data.description || ''}
            onChange={onChange}
          ></textarea>
        </form>
        <button className={styles['delete-button']} onClick={onDelete}>
          <i className="far fa-times-circle"></i>
        </button>
      </section>
    </li>
  );
};

export default Card;
