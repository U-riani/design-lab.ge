import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import PartnersComponent from "../components/PartnersComponent";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

const Layout = () => {
  return (
    <>
      <header className="App-header fixed top-0 left-0 z-50">
        <Navbar />
      </header>
      <main className="App overflow-x-hidden relative mt-[72px]">
        <div className="main-hero h-[calc(100vh-72px)] overflow-hidden">
          <BeforeAfterSlider
            beforeImage={"/slide1-b.jpg"}
            afterImage={"/slide1.jpg"}
          />
        </div>
        <Outlet />
        <PartnersComponent />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
};

export default Layout;
