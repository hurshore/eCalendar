import React, { useState, useContext } from 'react';
import classes from './Day.module.css';
import Reminders from '../Reminders/Reminders';
import { ReminderContext } from '../../context/reminderContext';

const Day = ({ date, className }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const reminderContext = useContext(ReminderContext);
  const { reminders } = reminderContext;

  const openReminderModal = () => {
    setModalIsOpen(true);
  }

  const closeReminderModal = () => {
    setModalIsOpen(false)
  }

  const selectedDateReminders = reminders.filter((reminder) => {
    const reminderDate = new Date(reminder.date);
    return reminderDate.getFullYear() === date.getFullYear() &&
    reminderDate.getMonth() === date.getMonth() &&
    reminderDate.getDate() === date.getDate()
  })

  return (
    <React.Fragment>
      <div className={!className ? classes.day : `${className} ${classes.day}`} 
      onClick={openReminderModal}>
        {date.getDate()}
        {selectedDateReminders.length > 0 ? <span className={classes.dot}></span> : <span className={`${classes.dot} ${classes.invisible}`}></span>}
      </div>
      {modalIsOpen && <Reminders open={modalIsOpen} close={closeReminderModal} date={date} />}
    </React.Fragment>
  )
}

export default Day;