const colorDiff = (timeAmount) => {
  let backgroundColor = '';
  if (timeAmount >= 600) {
    backgroundColor = 'deeppink';
  } else if (timeAmount >= 420) {
    backgroundColor = 'pink';
  } else if (timeAmount >= 240) {
    backgroundColor = 'lightpink';
  } else {
    backgroundColor = 'white';
  }
  return backgroundColor;
};
export default colorDiff;
