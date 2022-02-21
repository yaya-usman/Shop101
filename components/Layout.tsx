import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";



const Layout: React.FC = ({ children }) => {


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
