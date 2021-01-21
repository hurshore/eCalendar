import { useState, useContext, useEffect } from 'react';
import classes from './calendar.module.css';
import leftArrowLight from '../../assets/images/left-arrow-light.svg';
import leftArrowDark from '../../assets/images/left-arrow-dark.svg';
import rightArrowLight from '../../assets/images/right-arrow-light.svg';
import rightArrowDark from '../../assets/images/right-arrow-dark.svg';
import addIcon from '../../assets/images/add.svg';
import { ThemeContext } from '../../context/themeContext';
import AddReminder from '../../components/AddReminder/AddReminder';
import { 
  calcPresentMonthLength, 
  getPrevMonthCell, 
  getNextMonthCell, 
  calcPrevMonthLength, 
  getMonthName 
} from '../../utility/calendar';

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [dateOnDisplay, setCurrentMonth] = useState(new Date());
  const [prevMonthDays, setPrevMonth] = useState([]);
  const [presentMonthDays, setPresentMonth] = useState([]);
  const [nextMonthDays, setNextMonth] = useState([]);
  const [addingReminder, setAddingReminder] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if(now.getDate() !== today.getDate()) {
        setToday(now)
      }
    }, 1000)
    return () => clearInterval(interval);
  }, [today])

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

  const openAddModal = () => {
    setAddingReminder(true);
  }

  const closeAddModal = () => {
    setAddingReminder(false);
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
          {prevMonthDays.map((day) => <div key={day} className={classes.prevMonth}>{day}</div>)}
          {presentMonthDays.map((day) => (
            today.getFullYear() === dateOnDisplay.getFullYear() && 
            today.getMonth() === dateOnDisplay.getMonth() && 
            day === today.getDate() ? 
            <div key={day} className={classes.today}>{day}</div> : 
            <div key={day}>{day}</div>
          ))}
          {nextMonthDays.map((day) => <div key={day} className={classes.nextMonth}>{day}</div>)}
        </div>
        <div className={classes.setReminder} onClick={openAddModal}>
          <img src={addIcon} alt="add" width="12" />
          <span>Add reminder</span>
        </div>
      </div>
      {addingReminder && <AddReminder close={closeAddModal} />}
    </div>
  )
}

export default Calendar;