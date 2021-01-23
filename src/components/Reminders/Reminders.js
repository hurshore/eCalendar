import React, { useContext } from 'react';
import Reminder from './Reminder/Reminder';
import Modal from '../UI/Modal/Modal';
import classes from './Reminders.module.css';
import { ReminderContext } from '../../context/reminderContext';

const Reminders = ({ open, close, date }) => {
  const reminderContext = useContext(ReminderContext);
  const { reminders } = reminderContext;
  const selectedDateReminders = reminders.filter((reminder) => {
    const reminderDate = new Date(reminder.date);
    return reminderDate.getFullYear() === date.getFullYear() &&
    reminderDate.getMonth() === date.getMonth() &&
    reminderDate.getDate() === date.getDate()
  })

  return (
    <Modal open={open} onClose={close}>
      <div className={classes.reminders}>
        {selectedDateReminders.length > 0 ? 
          selectedDateReminders.map((reminder) => <Reminder key={reminder.id} reminder={reminder} />) :
          <div className={classes.empty}>
            <p>You have no reminder for the selected day</p>
          </div>
        }
      </div>
    </Modal>
  )
}
export default Reminders;