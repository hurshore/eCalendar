import React, { useContext } from 'react';
import Modal from '../UI/Modal/Modal';
import classes from './AddReminder.module.css';
import { ThemeContext } from '../../context/themeContext';

const AddReminder = ({ close }) => {
  const themeContext = useContext(ThemeContext);
  let hours = [];
  let minutes = [];
  for(let i = 0; i < 23; i++) {
    hours.push(i);
  }
  for(let i = 0; i < 60; i++) {
    minutes.push(i);
  }

  return (
    <Modal clicked={close}>
      <div className={themeContext.theme === 'light' ? classes.addReminder : `${classes.addReminder} ${classes.dark}`}>
        <p className={classes.header}>Create a Reminder</p>
        <div className={classes.content}>
          <div className={classes.formGroup}>
            <label>Title</label>
            <input type="text" placeholder="Title" />
          </div>
          <div className={classes.formGroup}>
            <label>Date</label>
            <input type="date" />
          </div>
          <div className={classes.formGroup}>
            <div className={classes.time}>
              <div className={classes.hour}>
                <label>Hour</label>
                <select>
                  {hours.map((hr) => <option key={hr} value={hr}>{hr}</option>)}
                </select>
              </div>
              <div className={classes.minute}>
                <label>Minute</label>
                <select>
                  {minutes.map((min) => <option key={min} value={min}>{min}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <button className={`${classes.btn}  ${classes.cancel}`} onClick={close}>Cancel</button>
          <button className={`${classes.btn}  ${classes.create}`}>Create</button>
        </div>
      </div>
    </Modal>
  )
}

export default AddReminder;