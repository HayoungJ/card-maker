import { useState, useEffect } from 'react';

function useLocalStorage(stateKey, initialState) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(stateKey)) || initialState
  );

  // sync state change and localstorage change
  // this is because state change does not occurs across tabs
  useEffect(() => {
    window.localStorage.setItem(stateKey, JSON.stringify(state));
  }, [stateKey, state]);

  // sync localstorage change and state change
  // this is because localstorage change does not occurs re-render
  useEffect(() => {
    const onUpdateStorage = (event) => {
      const { key, newValue } = event;
      if (key === stateKey) {
        newValue && setState(JSON.parse(newValue));
      }
    };

    window.addEventListener('storage', onUpdateStorage);
    return () => window.removeEventListener('storage', onUpdateStorage);
  });

  return [state, setState];
}

export default useLocalStorage;
