import React, { useContext } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { ThemeContext } from '../../../context/themeContext';

const Modal = (props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <React.Fragment>
      <Backdrop clicked={props.clicked} />
      <div className={themeContext.theme === 'light' ? classes.modal : `${classes.modal} ${classes.dark}`}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default Modal;