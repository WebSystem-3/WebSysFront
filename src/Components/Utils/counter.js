const counter = (time) => {
    const [min, sec] = time.split(" : ");
    if (+sec > 0) {
      let changeSec = `${+sec - 1 + ""}`;
      if (sec.length === 1 || sec[0] === "0" || sec === "10")
        changeSec = `0${changeSec}`;
      return `${min} : ${changeSec}`;
    }
    if (+sec === 0) {
      let changeMin = `${+min - 1 + ""}`;
      if (min.length === 1 || min[0] === "0" || min === "10")
        changeMin = `0${changeMin}`;
      if (+min > 0) return `${changeMin} : ${"59"}`;
      else return "00 : 00";
    }
  };
  
  export default counter;