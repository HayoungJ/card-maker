import { useEffect, useState, useRef } from 'react';

const useLocalStorage = (stateKey, defaultValue) => {
  const [state, setState] = useState(defaultValue);
  const isNewSession = useRef(true);

  useEffect(() => {
    if (isNewSession.current) {
      const currentState = localStorage.getItem(stateKey);
      if (currentState) {
        setState(JSON.parse(currentState));
      } else {
        setState(defaultValue);
      }
      isNewSession.current = false;
      return;
    }
    try {
      localStorage.setItem(stateKey, JSON.stringify(state));
    } catch (error) {}
  }, [state, stateKey, defaultValue]);

  useEffect(() => {
    const onReceieveMessage = (event) => {
      const { key, newValue } = event;
      if (key === stateKey) {
        console.log(newValue);
        newValue && setState(JSON.parse(newValue));
      }
    };
    window.addEventListener('storage', onReceieveMessage);
    return () => window.removeEventListener('storage', onReceieveMessage);
  }, [stateKey, setState]);
  return [state, setState];
};

export default useLocalStorage;
