import { useCallback } from 'react';

const useCookie = () => {
  const get = useCallback((name) => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(name))
      ?.split('=')[1];
  }, []);
  return {
    get,
  };
};

export default useCookie;
