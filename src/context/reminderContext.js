import React, { useState, useCallback } from 'react';

export const ReminderContext = React.createContext({ theme: 'dark' })

const ReminderContextProvider = props => {
  const [reminders, setReminders] = useState([]);

  const fetchReminders = useCallback(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders'));
    if(storedReminders) setReminders(storedReminders);
  }, [])

  const addReminder = (reminder) => {
    const newReminders = [...reminders, reminder];
    setReminders(newReminders);
    localStorage.setItem('reminders', JSON.stringify(newReminders));
  }

  const editReminder = (reminder) => {
    const newReminders = reminders.map((rmd) => rmd.id !== reminder.id ? 
      rmd : { ...rmd, title: reminder.title, date: reminder.date, time: reminder.time, read: reminder.read }
    )
    setReminders(newReminders);
    localStorage.setItem('reminders', JSON.stringify(newReminders));
  }

  const deleteReminder = (reminder) => {
    const newReminders = reminders.filter((rmd) => rmd.id !== reminder.id);
    setReminders(newReminders);
    localStorage.setItem('reminders', JSON.stringify(newReminders));
  }

  return (
    <ReminderContext.Provider value={{ reminders, fetchReminders, addReminder, editReminder, deleteReminder }}>
      {props.children}
    </ReminderContext.Provider>
  )
}

export default ReminderContextProvider;