import React, { useState } from 'react';
import classes from './Day.module.css';
import Reminders from '../Reminders/Reminders';

const Day = ({ date, className }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openReminderModal = () => {
    setModalIsOpen(true);
  }

  const closeReminderModal = () => {
    setModalIsOpen(false)
  }

  return (
    <React.Fragment>
      <div className={!className ? classes.day : `${className} ${classes.day}`} onClick={openReminderModal}>{date.getDate()}</div>
      {modalIsOpen && <Reminders open={modalIsOpen} close={closeReminderModal} date={date} />}
    </React.Fragment>
  )
}

export default Day;