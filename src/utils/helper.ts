export const console_log = (...args: any) => {
  if (__DEV__) {
    console.log(...args);
  }
};

export const getCurrentTime = () => {
  return new Date();
};
