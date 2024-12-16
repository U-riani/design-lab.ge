import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useScreenWidth from "../hooks/useScreenWidth";

const Navbar = () => {
  const screenWidth = useScreenWidth();

  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [toggleLang, setTogglelang] = useState(
    localStorage.getItem("language") || i18n.language
  );

  const handleLangChange = () => {
    const newLang = toggleLang === "ge" ? "en" : "ge";
    setTogglelang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  // Toggle the menu open and closed
  const toggleMenu = () => {
    if (screenWidth < 1024) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (isMenuOpen) {
      // document.querySelector('main').style.filter = 'blur(1px)'
      document.querySelector("main").classList.add("blur-effect");
    } else {
      document.querySelector("main").classList.remove("blur-effect");
    }
  }, [isMenuOpen]);

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 relative z-50">
      <div className="w-screen flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/lab-logo.png" alt="logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Logo
          </span> */}
        </Link>
        <button
          onClick={toggleMenu} // Toggle the menu when clicked
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } z-10 min-w-[120px] lg:block  absolute lg:relative lg:h-fit right-0 top-[72px] lg:top-0  transition-transform duration-300 ease-in-out lg:translate-x-0`}
          id="navbar-solid-bg"
        >
          <ul className="h-[calc(100vh-72px)] px-3 lg:px-0 lg:h-fit lg:align-middle flex flex-col font-medium bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent dark:bg-gray-800 lg:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3  lg:p-0 text-gray-900  lg:bg-transparent lg:text-blue-700 lg:dark:text-blue-500 dark:bg-blue-600 lg:dark:bg-transparent"
                aria-current="page"
                onClick={toggleMenu}
              >
                MAIN
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                to="/aboutUs"
                className="block py-2 px-3 lg:p-0 text-gray-900  hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                to="/news"
                className="block py-2 px-3 lg:p-0 text-gray-900  hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                NEWS
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                to="/partners"
                className="block py-2 px-3 lg:p-0 text-gray-900  hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                PARTNERS
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                to="/designers"
                className="block py-2 px-3 lg:p-0 text-gray-900  hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                DESIGNERS
              </Link>
            </li>
            <li>
              <button
                onClick={toggleDropdown}
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="navbar-dropdown-button flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                CONTACT{" "}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownNavbar"
                className={`z-10 ${
                  showDropdown ? "" : "hidden"
                } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 w-fit lg:absolute lg:mt-2`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <a
                      href="/contact"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      CONTACT
                    </a>
                  </li>
                  <li>
                    <a
                      href="/reservation"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      RESERVATION
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className="py-2 px-3 lg:py-0 flex justify-center align-center"
              onClick={() => handleLangChange()}
            >
              <img
                className="w-[30px] h-[30px]"
                src={`${
                  toggleLang === "ge"
                    ? "/images/lang-icons/georgia.png"
                    : "/images/lang-icons/uk.png"
                }`}
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
