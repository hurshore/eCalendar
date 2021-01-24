import React, { useContext } from 'react';
import classes from './Reminder.module.css';
import { ThemeContext } from '../../../context/themeContext';

const Reminder = ({ reminder, upcoming }) => {
  const themeContext = useContext(ThemeContext);
  let hours = reminder.time.hours;
  let minutes = reminder.time.minutes;
  if(hours < 10) hours = `0${reminder.time.hours}`;
  if(minutes < 10) minutes = `0${reminder.time.minutes}`;

  return (
    <div className={themeContext.theme === 'light' ? classes.reminder : `${classes.reminder} ${classes.dark}`}>
      <p className={classes.title}>
        {upcoming && <span className={classes.dot}></span>}
        {reminder.title}
      </p>
      <p className={classes.time}>{`${hours}:${minutes}`}</p>
    </div>
  )
}

export default Reminder;