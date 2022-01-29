import React, { useRef } from 'react';
import styles from './CardMaker.module.css';

const CardMaker = (props) => {
  const cardRef = useRef([]);

  return (
    <div className={styles.wrap}>
      <form className={styles.form}>
        <table className={styles.table}>
          <tr className={styles['table-tr']}>
            <td className={styles['table-td']}>
              <input
                ref={cardRef.current[0]}
                className={styles.input}
                type="text"
                placeholder="Name"
              ></input>
            </td>
            <td className={styles['table-td']}>
              <input
                ref={cardRef.current[1]}
                className={styles.input}
                type="text"
                placeholder="Company"
              ></input>
            </td>
            <td className={styles['table-td']}>
              <select
                ref={cardRef.current[2]}
                className={styles.select}
                name="Style"
                required
              >
                <option value="" style={{ display: 'none' }}>
                  Style
                </option>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Colorful">Colorful</option>
              </select>
            </td>
          </tr>
          <tr className={styles['table-tr']}>
            <td className={styles['table-td']}>
              <input
                ref={cardRef.current[3]}
                className={styles.input}
                type="text"
                placeholder="Title"
              ></input>
            </td>
            <td className={styles['table-td']}>
              <input
                ref={cardRef.current[4]}
                className={styles.input}
                type="email"
                placeholder="Email"
              ></input>
            </td>
            <td className={styles['table-td']}>
              <input
                ref={cardRef.current[5]}
                className={styles.input}
                type="number"
                placeholder="Phone Number"
              ></input>
            </td>
          </tr>
          <tr className={styles['table-tr']}>
            <td className={styles['table-td']} colspan="3">
              <input
                ref={cardRef.current[6]}
                className={styles.input}
                type="text"
                placeholder="Description"
              ></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default CardMaker;
