import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      src={spinner}
      alt='Spinner'
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '31%',
      }}
    />
  );
};

export default Spinner;
