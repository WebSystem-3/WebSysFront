const colorDiff = (timeAmount) => {
  let backgroundColor = '';
  if (timeAmount >= 600) {
    backgroundColor = '#FF7272';
  } else if (timeAmount >= 420) {
    backgroundColor = '#FF8F8F';
  } else if (timeAmount >= 240) {
    backgroundColor = '#FFCACA';
  } else if (timeAmount > 0) {
    backgroundColor = '#FFE1E1';
  } else {
    backgroundColor = 'white';
  }
  return backgroundColor;
};
export default colorDiff;
