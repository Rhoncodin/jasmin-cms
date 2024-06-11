import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />

      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
