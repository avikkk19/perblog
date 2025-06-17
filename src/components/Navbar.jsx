import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import favicon from "../../public/senna.png";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <>
      {/* Desktop Vertical Navbar */}
      <nav className="bg-white dark:bg-[rgb(15,23,42)] shadow-md backdrop-blur-3xl py-4 fixed left-0 top-0 bottom-0 h-full z-50 w-54 flex-col hidden md:flex items-end border-r border-gray-200 dark:border-gray-800/50">
        {/* Logo */}
        <a
          className={`flex items-center justify-end w-full pr-4 mb-10 transition-opacity duration-500 ease-in-out  ${
            pageLoaded ? "opacity-100" : "opacity-0"
          }`}
          href="/"
        >
          {/* <p className="text-gray-900 dark:text-white text-xs font-medium">
            Avinash
          </p> */}
          <img src={favicon} alt="logo" className="w-14 h-25 rounded-full hover:scale-110 transition-transform duration-300" />
        </a>

        {/* Navigation Icons - Vertical Stack */}
        <div className="flex flex-col space-y-8 flex-grow items-end justify-center w-full pr-4">
          <a
            href="/"
            className={`text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 rounded-full flex items-center justify-center ${
              pageLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "100ms" }}
            title="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              /> 
            </svg>
          </a>

          <a
            href="/projects"
            className={`text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 rounded-full flex items-center justify-center ${
              pageLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "100ms" }}
            title="Projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </a>

          <a
            href="/photography"
            className={`text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 rounded-full flex items-center justify-center ${
              pageLoaded
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "200ms" }}
            title="Photography"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </a>

          <a
            href="/signbook"
            className={`text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 rounded-full flex items-center justify-center ${
              pageLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "300ms" }}
            title="Guest Book"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </a>
          <a
            href="/blog"
            className={`text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 rounded-full flex items-center justify-center ${
              pageLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
            style={{ transitionDelay: "300ms" }}
            title="Blog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="fill-current" width="28" height="28"><path fill-opacity=".16" fill-rule="nonzero" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"></path></svg>
          </a>
        </div>

        {/* Theme Toggle - At bottom */}
        <div
          className={`mt-auto flex flex-col items-end space-y-4 w-full pr-4 mb-4 transition-all duration-500 ${
            pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? "🌞" : "🌙"}
          </button>
        </div>
      </nav>

      {/* Mobile Floating Bottom Navbar  slayyyyyyyyyyyy*/}
      <nav
        className={`md:hidden fixed bottom-4 left-4 right-4 bg-white/80 dark:bg-[rgb(15,23,42)]/80 backdrop-blur-xl rounded-full shadow-lg h-16 z-50 border border-gray-200 dark:border-gray-800/30 transition-all duration-500 ${
          pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center justify-around h-full px-2">
          <a
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
          <a
            href="/projects"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </a>
          <a
            href="/photography"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </a>
          <a
            href="/signbook"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
            aria-label="Guest Book"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </a>
                 <a
            href="/blog"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2"
            aria-label="Blog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="fill-current" width="28" height="28"><path fill-opacity=".16" fill-rule="nonzero" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"></path></svg>
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
            aria-label="Toggle theme"
          >
            {isDark ? "🌞" : "🌙"}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
