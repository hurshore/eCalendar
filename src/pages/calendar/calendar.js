import React from 'react';
import classes from './calendar.module.css';
import leftArrow from '../../assets/images/left-arrow.svg';
import rightArrow from '../../assets/images/right-arrow.svg';
import addIcon from '../../assets/images/add.svg';

const calendar = () => {
  return (
    <div className={classes.calendar}>
      <div className={classes.calendarBox}>
        <div className={classes.calendarControls}>
          <span className={classes.arrow}>
            <img src={leftArrow} alt="left arrow" width="12" />
          </span>
            <p className={classes.today}>January 2021</p>
          <span className={classes.arrow}>
            <img src={rightArrow} alt="right arrow" width="12" />
          </span>
        </div>
        <div className={classes.calendarGrid}>
          <div className={classes.weekDays}>
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>
          {Array(42).fill('x').map((el, index) => <div key={index}>3</div>)}
        </div>
        <div className={classes.setReminder}>
          <img src={addIcon} alt="add" width="12" />
          <span>Add reminder</span>
        </div>
      </div>
    </div>
  )
}

export default calendar;