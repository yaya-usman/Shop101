import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import LinearDeterminate from "./LinearDeterminate";


const Layout = ({ children }) => {
  return (
    <>
       {/* <LinearDeterminate /> */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
