const colorDiff = (timeAmount) => {
  let backgroundColor = '';

  if (timeAmount >= 3 * 60) {
    //셀 색깔 찐 분 deeppink
    backgroundColor = 'deeppink';
  } else if (timeAmount >= 2 * 60) {
    //셀 색깔 분 pink
    backgroundColor = 'pink';
  } else {
    //셀 색깔 연분 lightpink
    backgroundColor = 'lightpink';
  }
  return backgroundColor;
};
export default colorDiff;
