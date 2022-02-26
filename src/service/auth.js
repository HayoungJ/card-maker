import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import app from './firebase';

export const register = (email, password, handleSuccess, handleError) => {
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const db = getDatabase(app);
      set(ref(db, 'users/' + user.uid), {
        email: user.email,
        uid: user.uid,
      });

      handleSuccess();
    })
    .catch((error) => {
      handleError(error.code);
    });
};

export const login = async (email, password, handleSuccess, handleError) => {
  const auth = getAuth(app);

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      handleSuccess(user);
    })
    .catch((error) => {
      handleError(error.code);
    });
};

export const logout = (handleSuccess, handleError) => {
  const auth = getAuth(app);

  signOut(auth)
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      handleError(error);
    });
};

export const getUser = (handleSuccess, handleFail = () => {}) => {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleSuccess(user);
    } else {
      handleFail();
    }
  });
};
