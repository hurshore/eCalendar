import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const layout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        {props.children}
      </main>
    </React.Fragment>
  )
}

export default layout;