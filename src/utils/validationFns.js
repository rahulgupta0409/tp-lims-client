export const validateLength = (value, minValue) => {
  return value.length >= minValue;
};

export const validateEmail = (value) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value);
};
