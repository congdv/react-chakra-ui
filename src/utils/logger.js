export const logError = (description, error) => {
  if (error) {
    if (typeof error === 'object') {
      error.info = description;
      console.error(description, error);
    } else {
      console.log(description, error);
    }
  } else {
    console.error(description);
  }
};
