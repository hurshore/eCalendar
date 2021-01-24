import React, { useState, useContext } from 'react';
import classes from './EditReminder.module.css';
import editIcon from '../../assets/images/pencil.svg';
import Modal from '../UI/Modal/Modal';
import { ThemeContext } from '../../context/themeContext';
import { ReminderContext } from '../../context/reminderContext';
import { validateReminder } from '../../utility/validators';

const EditReminder = ({ reminder }) => {
  const [editing, setEditing] = useState(false);
  const themeContext = useContext(ThemeContext);
  const reminderContext = useContext(ReminderContext);
  const [title, setTitle] = useState(reminder.title)
  const [date, setDate] = useState(reminder.date);
  const [time, setTime] = useState({ 
    hours: reminder.time.hours,
    minutes: reminder.time.minutes
  })
  const [error, setError] = useState(null);
  let hours = [];
  let minutes = [];

  for(let i = 0; i <= 23; i++) {
    hours.push(i);
  }
  for(let i = 0; i < 60; i++) {
    minutes.push(i);
  }

  const reminderDate = new Date(reminder.date);
  const year = reminderDate.getFullYear();
  let month = reminderDate.getMonth() + 1;
  let day = reminderDate.getDate();
  if((month < 10)) month = `0${month}`
  if(day < 10) day = `0${day}`;

  const openModal = () => {
    setEditing(true);
  }

  const closeModal = () => {
    setEditing(false);
  }

  const editReminder = () => {
    const rmd = { title, date, time, id: reminder.id };
    const err = validateReminder(rmd);
    if(err) {
      setError(err);
      return;
    }

    reminderContext.editReminder(rmd);
    setError(null);
    closeModal();
  }

  const deleteReminder = () => {
    reminderContext.deleteReminder(reminder);
    closeModal();
  }

  return (
    <React.Fragment>
      <span onClick={openModal} className={classes.editIcon}>
        <img src={editIcon} alt="edit" width="15" />
      </span>
      {editing && (
        <Modal open={editing} onClose={closeModal}>
          <div className={themeContext.theme === 'light' ? classes.editReminder : `${classes.editReminder} ${classes.dark}`}>
          <div className={classes.header}>
            <p className={classes.headerText}>Edit Reminder</p>
            {error && <p className={classes.error}>{error}</p>}
          </div>
          <div className={classes.content}>
            <div className={classes.formGroup}>
              <label>Title</label>
              <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className={classes.formGroup}>
              <label>Date</label>
              <input type="date" defaultValue={reminder.date} min={`${year}-${month}-${day}`} onChange={(event) => setDate(event.target.value)} />
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
            <button className={`${classes.btn}  ${classes.cancel}`} onClick={deleteReminder}>Delete</button>
            <button className={`${classes.btn}  ${classes.create}`} onClick={editReminder}>Edit</button>
          </div>
        </div>
        </Modal>
      )}
    </React.Fragment>
  )
}

export default EditReminder;