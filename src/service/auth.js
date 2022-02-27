import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import app from './firebase';

const auth = getAuth(app);

// create user registered with email and password
// add user data in database
export const register = (email, password, handleSuccess, handleError) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

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

export const googleLogin = (handleSuccess, handleError) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      // setUserData(user);
      handleSuccess(user);
    })
    .catch((error) => {
      handleError && handleError(error);
    });
};

export const githubLogin = (handleSuccess, handleError) => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GithubAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      // setUserData(user);
      handleSuccess(user);
    })
    .catch((error) => {
      handleError && handleError(error);
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

export const getUser = (handleSuccess, handleFail) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleSuccess(user);
    } else {
      handleFail && handleFail();
    }
  });
};
