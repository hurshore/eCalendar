export const calcPresentMonthLength = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return {
    presentMonth: month,
    presentMonthYear: year,
    presentMonthLength:  new Date(year, month + 1, 0).getDate()
  }
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
  return {
    prevMonth: month,
    prevMonthYear: year,
    prevMonthLength: new Date(year, month + 1, 0).getDate()
  }
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

export const dateHasPassed = (date) => {
  const dateNow = new Date();
  dateNow.setMilliseconds(0);
  date.setMilliseconds(0);
  return dateNow > date;
}

export const orderReminders = (reminderA, reminderB) => {
  const dateA = new Date(reminderA.date);
  const dateB = new Date(reminderB.date);
  dateA.setHours(reminderA.time.hours);
  dateB.setHours(reminderB.time.hours);
  dateA.setMinutes(reminderA.time.minutes);
  dateB.setMinutes(reminderB.time.minutes);
  return dateA - dateB;
}