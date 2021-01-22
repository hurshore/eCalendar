import React, { useState, useContext } from 'react';
import Modal from '../UI/Modal/Modal';
import classes from './AddReminder.module.css';
import { ThemeContext } from '../../context/themeContext';
import { validateReminder } from '../../utility/validators';
import { v4 as uuidv4 } from 'uuid';

const AddReminder = ({ close, today, addReminder }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(null);
  const [time, setTime] = useState({ 
    hours: new Date().getHours() + 1,
    minutes: new Date().getMinutes()
  })
  const [error, setError] = useState(null);
  const themeContext = useContext(ThemeContext);
  let hours = [];
  let minutes = [];

  for(let i = 0; i <= 23; i++) {
    hours.push(i);
  }
  for(let i = 0; i < 60; i++) {
    minutes.push(i);
  }

  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  if((month < 10)) month = `0${month}`
  if(day < 10) day = `0${day}`;

  const createReminder = () => {
    let reminders = [];
    const reminder = { title, date, time, read: false, id: uuidv4() };
    const err = validateReminder(reminder);
    if(err) {
      setError(err);
      return;
    }
    const storedReminders = localStorage.getItem('reminders');

    if(storedReminders) {
      reminders = [...JSON.parse(storedReminders), reminder];
    } else {
      reminders = [reminder]
    }

    addReminder(reminder)
    localStorage.setItem('reminders', JSON.stringify(reminders));
    setError(null);
    close();
  }
  

  return (
    <Modal clicked={close}>
      <div className={themeContext.theme === 'light' ? classes.addReminder : `${classes.addReminder} ${classes.dark}`}>
        <div className={classes.header}>
          <p className={classes.headerText}>Create a Reminder</p>
          {error && <p className={classes.error}>{error}</p>}
        </div>
        <div className={classes.content}>
          <div className={classes.formGroup}>
            <label>Title</label>
            <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className={classes.formGroup}>
            <label>Date</label>
            <input type="date" min={`${year}-${month}-${day}`} onChange={(event) => setDate(event.target.value)} />
          </div>
          <div className={classes.formGroup}>
            <div className={classes.time}>
              <div className={classes.hour}>
                <label>Hour</label>
                <select defaultValue={time.hours} onChange={(event) => setTime({...time, hours: parseInt(event.target.value)})}>
                  {hours.map((hr) => <option key={hr} value={hr}>{hr < 10 ? `0${hr}` : hr}</option>)}
                </select>
              </div>
              <div className={classes.minute}>
                <label>Minute</label>
                <select defaultValue={time.minutes} onChange={(event) => setTime({...time, minutes: parseInt(event.target.value)})}>
                  {minutes.map((min) => <option key={min} value={min}>{min < 10 ? `0${min}` : min}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <button className={`${classes.btn}  ${classes.cancel}`} onClick={close}>Cancel</button>
          <button className={`${classes.btn}  ${classes.create}`} onClick={createReminder}>Create</button>
        </div>
      </div>
    </Modal>
  )
}

export default AddReminder;