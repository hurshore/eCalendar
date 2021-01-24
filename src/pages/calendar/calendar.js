import { useState, useContext, useEffect } from 'react';
import classes from './calendar.module.css';
import Day from '../../components/Day/Day';
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
import { ReminderContext } from '../../context/reminderContext';

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [dateOnDisplay, setCurrentMonth] = useState(new Date());
  const [prevMonthDays, setPrevMonth] = useState([]);
  const [presentMonthDays, setPresentMonth] = useState([]);
  const [nextMonthDays, setNextMonth] = useState([]);
  const [addingReminder, setAddingReminder] = useState(false);
  const themeContext = useContext(ThemeContext);
  const reminderContext = useContext(ReminderContext);
  const { reminders } = reminderContext;


  useEffect(() => {
    const { presentMonth, presentMonthYear,presentMonthLength } = calcPresentMonthLength(dateOnDisplay);
    const { prevMonth, prevMonthYear, prevMonthLength } = calcPrevMonthLength(dateOnDisplay);
    const prevMonthCellCount = getPrevMonthCell(dateOnDisplay);
    const nextMonthCellCount = getNextMonthCell(presentMonthLength, prevMonthCellCount);
    let prevMonthCell = [];
    let presentMonthCell = [];
    let nextMonthCell = [];
    let index = 1;

    for(let i = 1; i <= prevMonthCellCount; i++) {
      const day = prevMonthLength - prevMonthCellCount + index;
      const date = new Date(prevMonthYear, prevMonth, day);
      prevMonthCell.push(date);
      index += 1;
    }
    for(let i = 1; i <= presentMonthLength; i++) {
      const date = new Date(presentMonthYear, presentMonth, i);
      presentMonthCell.push(date);
    }
    for(let i = 1; i <= nextMonthCellCount; i++) {
      const date = new Date(presentMonthYear, presentMonth + 1, i);
      nextMonthCell.push(date);
    }
    setPrevMonth(prevMonthCell);
    setPresentMonth(presentMonthCell);
    setNextMonth(nextMonthCell);
  }, [dateOnDisplay])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if(now.getDate() !== today.getDate()) {
        setToday(now);
      }
    }, 1000)
    return () => clearInterval(interval);
  }, [today])

  useEffect(() => {
    const interval = setInterval(() => {
      reminders.forEach(reminder => {
        const now = new Date();
        now.setMilliseconds(0);
        const date = new Date(reminder.date);
        date.setHours(reminder.time.hours);
        date.setMinutes(reminder.time.minutes);
        date.setMilliseconds(0);
        
        if(date.getTime() === now.getTime()) {
          const audio = new Audio('/notification.mp3');
          audio.play();
          // Set read reminder to true
          
        }
      })
    }, 1000)
    return () => clearInterval(interval);
  }, [reminders])

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
          {prevMonthDays.map((date) => <Day key={date} date={date} className={classes.prevMonth} />)}
          {presentMonthDays.map((date) => (
            today.getFullYear() === dateOnDisplay.getFullYear() && 
            today.getMonth() === dateOnDisplay.getMonth() && 
            date.getDate() === today.getDate() ? 
            <Day key={date} date={date} className={`${classes.today} ${classes.presentMonth}`} /> : 
            <Day key={date} date={date} className={classes.presentMonth} />
          ))}
          {nextMonthDays.map((date) => <Day key={date} date={date} className={classes.nextMonth} />)}
        </div>
        <div className={classes.setReminder} onClick={openAddModal}>
          <img src={addIcon} alt="add" width="12" />
          <span>Add reminder</span>
        </div>
      </div>
      {addingReminder && <AddReminder open={addingReminder} close={closeAddModal} today={today} />}
    </div>
  )
}

export default Calendar;