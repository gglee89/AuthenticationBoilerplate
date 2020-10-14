import React from 'react';

// Components
import Header from './Header';

export default ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}