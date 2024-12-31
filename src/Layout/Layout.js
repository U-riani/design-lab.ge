import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import PartnersComponent from "../components/PartnersComponent";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import Hero from "../components/Hero";
import ScrollUp from "../components/ScrollUp";

const Layout = () => {
  return (
    <>
      <header className="App-header w-full fixed top-0 left-0 ">
        <Navbar />
      </header>
      <main className="App w-full overflow-x-hidden relative mt-[72px]">
        <div className="main-hero h-[30vh] md:h-40vh lg:h-[calc(100vh-72px)] overflow-hidden">
          <Hero />
        </div>
        <Outlet />
        <ScrollUp />
        <PartnersComponent />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
};

export default Layout;
