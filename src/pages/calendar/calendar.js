import { useContext } from 'react';
import classes from './calendar.module.css';
import leftArrowLight from '../../assets/images/left-arrow-light.svg';
import leftArrowDark from '../../assets/images/left-arrow-dark.svg';
import rightArrowLight from '../../assets/images/right-arrow-light.svg';
import rightArrowDark from '../../assets/images/right-arrow-dark.svg';
import addIcon from '../../assets/images/add.svg';
import { ThemeContext } from '../../context/themeContext';

const Calendar = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className={themeContext.theme === 'light' ? classes.calendar : `${classes.calendar} ${classes.dark}`}>
      <div className={classes.calendarBox}>
        <div className={classes.calendarControls}>
          <span className={classes.arrow}>
            {themeContext.theme === 'light' ? 
              <img src={leftArrowDark} alt="left arrow" width="12" /> : 
              <img src={leftArrowLight} alt="left arrow" width="12" />
            }
          </span>
            <p className={classes.today}>January 2021</p>
          <span className={classes.arrow}>
            {themeContext.theme === 'light' ? 
              <img src={rightArrowDark} alt="right arrow" width="12" /> : 
              <img src={rightArrowLight} alt="right arrow" width="12" />
            }
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

export default Calendar;