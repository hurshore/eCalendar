export const calcPresentMonthLength = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
}

export const calcPrevMonthLength = (date) => {
  let year;
  let month;
  if(date.getMonth() === 0) {
    year = date.getFullYear() - 1;
    month = 11;
  } else {
    year = date.getFullYear();
    month = date.getMonth() - 1;
  }
  return new Date(year, month + 1, 0).getDate();
}

export const getPrevMonthCell = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = new Date(year, month, 1).getDay();
  return day;
}

export const getNextMonthCell = (presentMonthLength, prevMonthCell) => {
  return 42 - (presentMonthLength + prevMonthCell);
}

export const getMonthName = (index) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[index];
}