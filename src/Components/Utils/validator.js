const timerIsValid = (data) => {
    let titleIsValid = true;
    let MinIsValid = true;
    let SecIsValid = true;
    const [min, sec] = data.time.split(" : ");
  
    if (data.title.length > 20 || data.title.length < 1) titleIsValid = false;
    if (+min > 999 || +min < 0 || min === "") MinIsValid = false;
    if (+sec > 59 || +sec < 0 || sec === "") SecIsValid = false;
    return [titleIsValid, MinIsValid, SecIsValid];
  };
  
  export default timerIsValid;