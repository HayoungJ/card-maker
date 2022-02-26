import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { setUserData } from './database';
import app from './firebase';

const auth = getAuth(app);

// create user registered with email and password
// add user data in database
export const register = (email, password, handleSuccess, handleError) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      setUserData(user);
      handleSuccess(user);
    })
    .catch((error) => {
      handleError && handleError(error.code);
    });
};

export const login = async (email, password, handleSuccess, handleError) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      handleSuccess(user);
    })
    .catch((error) => {
      handleError && handleError(error.code);
    });
};

export const logout = (handleSuccess, handleError) => {
  signOut(auth)
    .then(() => {
      handleSuccess();
    })
    .catch((error) => {
      handleError && handleError(error);
    });
};

export const getUser = (handleSuccess, handleFail = () => {}) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleSuccess(user);
    } else {
      handleFail();
    }
  });
};
