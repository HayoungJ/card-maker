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

const db = getDatabase(app);
const dbRef = ref(db);

// export const setUserData = (user) => {
//   set(ref(db, 'users/' + user.uid), {
//     email: user.email,
//     uid: user.uid,
//   });
// };

export const getCardData = async (uid) => {
  return get(child(dbRef, `users/${uid}/posts`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateCardData = async (uid, data) => {
  const postKey = data.key || push(child(dbRef, 'posts')).key;
  data['key'] = postKey;

  const updates = {};
  updates[`users/${uid}/posts/${postKey}`] = data;

  return update(dbRef, updates)
    .then(() => {
      return [data, postKey];
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCardData = (uid, key) => {
  remove(ref(db, `users/${uid}/posts/${key}`));
};
