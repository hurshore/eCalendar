import { useState, useContext, useEffect } from 'react';
import classes from './calendar.module.css';
import leftArrowLight from '../../assets/images/left-arrow-light.svg';
import leftArrowDark from '../../assets/images/left-arrow-dark.svg';
import rightArrowLight from '../../assets/images/right-arrow-light.svg';
import rightArrowDark from '../../assets/images/right-arrow-dark.svg';
import addIcon from '../../assets/images/add.svg';
import { ThemeContext } from '../../context/themeContext';
import { 
  calcPresentMonthLength, 
  getPrevMonthCell, 
  getNextMonthCell, 
  calcPrevMonthLength, 
  getMonthName 
} from '../../utility/calendar';

const Calendar = () => {
  const [today] = useState(new Date());
  const [dateOnDisplay, setCurrentMonth] = useState(new Date());
  const [prevMonthDays, setPrevMonth] = useState([]);
  const [presentMonthDays, setPresentMonth] = useState([]);
  const [nextMonthDays, setNextMonth] = useState([]);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    const presentMonthLength = calcPresentMonthLength(dateOnDisplay);
    const prevMonthLength = calcPrevMonthLength(dateOnDisplay);
    const prevMonthCellCount = getPrevMonthCell(dateOnDisplay);
    const nextMonthCellCount = getNextMonthCell(presentMonthLength, prevMonthCellCount);
    let prevMonthCell = [];
    let presentMonthCell = [];
    let nextMonthCell = [];
    let index = 1;

    for(let i = 1; i <= prevMonthCellCount; i++) {
      prevMonthCell.push(prevMonthLength - prevMonthCellCount + index);
      index += 1;
    }
    for(let i = 1; i <= presentMonthLength; i++) {
      presentMonthCell.push(i);
    }
    for(let i = 1; i <= nextMonthCellCount; i++) {
      nextMonthCell.push(i);
    }
    setPrevMonth(prevMonthCell);
    setPresentMonth(presentMonthCell);
    setNextMonth(nextMonthCell);
  }, [dateOnDisplay])

  const getPrevMonth = () => {
    if(dateOnDisplay.getMonth() === 0) {
      setCurrentMonth(new Date(dateOnDisplay.getFullYear() - 1, 11))
    } else {
      setCurrentMonth(new Date(dateOnDisplay.getFullYear(), dateOnDisplay.getMonth() - 1));
    }
  }

  const getNextMonth = () => {
    if(dateOnDisplay.getMonth() === 11) {
      setCurrentMonth(new Date(dateOnDisplay.getFullYear() + 1, 0))
    } else {
      setCurrentMonth(new Date(dateOnDisplay.getFullYear(), dateOnDisplay.getMonth() + 1));
    }
  }

  return (
    <div className={themeContext.theme === 'light' ? classes.calendar : `${classes.calendar} ${classes.dark}`}>
      <div className={classes.calendarBox}>
        <div className={classes.calendarControls}>
          <span className={classes.arrow} onClick={getPrevMonth}>
            {themeContext.theme === 'light' ? 
              <img src={leftArrowDark} alt="left arrow" width="12" /> : 
              <img src={leftArrowLight} alt="left arrow" width="12" />
            }
          </span>
            <p className={classes.presentMonth}>{`${getMonthName(dateOnDisplay.getMonth())} ${dateOnDisplay.getFullYear()}`}</p>
          <span className={classes.arrow} onClick={getNextMonth}>
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
          {prevMonthDays.map((day) => <div key={day}>{day}</div>)}
          {presentMonthDays.map((day) => (
            today.getFullYear() === dateOnDisplay.getFullYear() && 
            today.getMonth() === dateOnDisplay.getMonth() && 
            day === today.getDate() ? 
            <div key={day} className={classes.today}>{day}</div> : 
            <div key={day}>{day}</div>
          ))}
          {nextMonthDays.map((day) => <div key={day}>{day}</div>)}
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