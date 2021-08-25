//Function to switch between temp units

export const changeTempValue = (tempStat: boolean, arr: any) => {
  let newArr = [...arr];
  if (!tempStat) {
    let changedArr = newArr.map((obj) => ({
      ...obj,
      temperature: ((obj.temperature - 32) * (5 / 9)).toFixed(),
    }));
    return changedArr;
  } else {
    let changedArr = newArr.map((obj) => ({
      ...obj,
      temperature: ((obj.temperature * 9) / 5 + 32).toFixed(),
    }));
    return changedArr;
  }
};
