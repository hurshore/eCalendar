import React, { useContext } from 'react';
import classes from './Navbar.module.css';
import Day from '../../assets/images/day.svg';
import Night from '../../assets/images/night.svg';
import { ThemeContext } from '../../context/themeContext';

const Navbar = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className={themeContext.theme === 'light' ? classes.navbar : `${classes.navbar} ${classes.dark}`}>
      <div className={classes.logo}>
        <h3>eCalendar</h3>
      </div>
      <ul className={classes.navLinks}>
        <li className={classes.themeToggle} onClick={() => themeContext.toggleTheme()}>
          {themeContext.theme === 'light' ? 
            <img src={Night} alt="dark mode" width="25" /> :
            <img src={Day} alt="light mode" width="25" />
          }
        </li>
      </ul>
    </div>
  )
}

export default Navbar;