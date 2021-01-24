export const validateReminder = (reminder) => {
  let err = null;
  const reminderDate = new Date(reminder.date);
  reminderDate.setHours(reminder.time.hours);
  reminderDate.setMinutes(reminder.time.minutes);
  reminderDate.setMilliseconds(0);
  const dateNow = new Date();
  dateNow.setMilliseconds(0);

  if(reminder.title.trim() === '') {
    err = 'Title cannot be empty';
    return err;
  }
  if(reminderDate <= dateNow) err = 'Cannot set a date or time before now';

  return err;
}

export const dayHasPassed = (date) => {
  const dateNow = new Date();
  dateNow.setHours(0);
  dateNow.setMinutes(0);
  dateNow.setMilliseconds(0);
  date.setMilliseconds(0);
  return dateNow > date;
}

export const dateHasPassed = (date) => {
  const dateNow = new Date();
  dateNow.setMilliseconds(0);
  date.setMilliseconds(0);
  return dateNow > date;
}