import { Outlet } from "react-router-dom";

import Navbar from "../sections/Navbar.jsx";
import Footer from "../sections/Footer.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='min-h-[calc(100vh-128px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
