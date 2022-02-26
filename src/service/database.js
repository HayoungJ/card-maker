import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import app from './firebase';

export const setUserData = (uid) => {
  //
};

export const getCardData = (uid) => {
  const dbRef = ref(getDatabase(app));

  return get(child(dbRef, `users/${uid}/posts`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateCardData = (uid, data) => {
  const db = getDatabase(app);

  const postKey = data.key || push(child(ref(db), 'posts')).key;
  data['key'] = postKey;

  const updates = {};
  updates[`users/${uid}/posts/${postKey}`] = data;

  return update(ref(db), updates)
    .then(() => {
      return [data, postKey];
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCardData = (uid, key) => {
  const db = getDatabase(app);
  remove(ref(db, `users/${uid}/posts/${key}`));
};
