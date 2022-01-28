import React, { useEffect, useState } from 'react';
import styles from './toast.module.css';

const Toast = ({ message, time }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, time);
  }, [message, time]);

  return (
    <section className={`${styles.toast} ${show ? styles.show : ''}`}>
      {message}
    </section>
  );
};

export default Toast;
