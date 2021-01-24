import React, { useContext } from 'react';
import Reminder from './Reminder/Reminder';
import Modal from '../UI/Modal/Modal';
import classes from './Reminders.module.css';
import { ReminderContext } from '../../context/reminderContext';
import { ThemeContext } from '../../context/themeContext'
import { dateHasPassed, orderReminders } from '../../utility/calendar';

const Reminders = ({ open, close, date }) => {
  const themeContext = useContext(ThemeContext);
  const reminderContext = useContext(ReminderContext);
  const { reminders } = reminderContext;
  const selectedDateReminders = reminders.filter((reminder) => {
    const reminderDate = new Date(reminder.date);
    return reminderDate.getFullYear() === date.getFullYear() &&
    reminderDate.getMonth() === date.getMonth() &&
    reminderDate.getDate() === date.getDate()
  })

  const hitReminders = selectedDateReminders.filter((reminder) => {
    const date = new Date(reminder.date)
    date.setHours(reminder.time.hours);
    date.setMinutes(reminder.time.minutes);
    return dateHasPassed(date);
  })

  hitReminders.sort((a, b) => {
    return orderReminders(a, b);
  })
  
  const upcomingReminders = selectedDateReminders.filter((reminder) => {
    const date = new Date(reminder.date)
    date.setHours(reminder.time.hours);
    date.setMinutes(reminder.time.minutes);
    return !dateHasPassed(date);
  })

  upcomingReminders.sort((a, b) => {
    return orderReminders(a, b);
  })

  return (
    <Modal open={open} onClose={close}>
      <div className={themeContext.theme === 'light' ? classes.reminders : `${classes.dark} ${classes.reminders}`}>
        {selectedDateReminders.length > 0 ? (
          <React.Fragment>
            <div>
              {hitReminders.map((reminder) => <Reminder key={reminder.id} reminder={reminder} />)}
            </div>
            {upcomingReminders.length > 0 && (
              <div className={classes.upcomingReminders}>
                <p className={classes.heading}>Upcoming</p>
                {upcomingReminders.map((reminder) => <Reminder key={reminder.id} reminder={reminder} upcoming />)}
              </div>
            )}
          </React.Fragment>
        ) :
          <div className={classes.empty}>
            <p>You have no reminder set for the selected day</p>
          </div>
        }
      </div>
    </Modal>
  )
}
export default Reminders;