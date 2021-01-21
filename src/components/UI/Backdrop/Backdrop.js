import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = ({  clicked }) => {
  return <div className={classes.backdrop} onClick={clicked}></div>
}

export default backdrop;