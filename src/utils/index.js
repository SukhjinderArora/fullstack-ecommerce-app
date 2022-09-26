export const checkIfEmpty = (obj) => {
  if (obj && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

export const setAllObjectProperties = (obj, value) => {
  const newObj = Object.keys(obj).reduce((acc, cur) => {
    acc[cur] = value;
    return acc;
  }, {});
  return newObj;
};

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

Object.freeze(STATUS);

export const cookies = {
  get(name) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(name))
      ?.split('=')[1];
  },
};

export const debounce = (func, delay = 300) => {
  let timer;
  return (...arg) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arg);
    }, delay);
  };
};

// eslint-disable-next-line camelcase
export const debounce_leading = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
};
