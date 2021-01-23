import React, { useState, useCallback } from 'react';

export const ReminderContext = React.createContext({ theme: 'dark' })

const ReminderContextProvider = props => {
  const [reminders, setReminders] = useState([]);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  }

  const fetchReminders = useCallback(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders'));
    if(storedReminders) setReminders(storedReminders);
  }, [])

  return (
    <ReminderContext.Provider value={{ reminders, fetchReminders, addReminder }}>
      {props.children}
    </ReminderContext.Provider>
  )
}

export default ReminderContextProvider;