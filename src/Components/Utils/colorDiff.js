const colorDiff = (timeAmount) => {
  let backgroundColor = '';

  if (timeAmount >= 2000) {
    //셀 색깔 연 분 lightpink
    backgroundColor = 'lightpink';
  } else if (timeAmount >= 1800) {
    //셀 색깔 분 pink
    backgroundColor = 'pink';
  } else {
    //셀 색깔 찐 분 deeppink
    backgroundColor = 'deeppink';
  }
  return backgroundColor;
};
export default colorDiff;
