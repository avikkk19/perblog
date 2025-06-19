import React, { useEffect, useRef, useState } from "react";

const cursorSize = 38;

// List of selectors for interactive elements
const interactiveSelectors = [
  "a",
  "button",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
  "textarea",
  "select",
  "label",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
];

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0,
      mouseY = 0;
    let raf;

    const moveCursor = (e) => {
      mouseX = e.clientX - cursorSize / 2;
      mouseY = e.clientY - cursorSize / 2;
    };

    const render = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      raf = requestAnimationFrame(render);
    };
    render();

    // Detect pointer/hand state
    const handlePointer = (e) => {
      const el = e.target;
      if (el.closest && interactiveSelectors.some((sel) => el.closest(sel))) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    // Detect dark mode
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handlePointer);
    window.addEventListener("mouseout", handlePointer);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handlePointer);
      window.removeEventListener("mouseout", handlePointer);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: cursorSize,
        height: cursorSize,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.13s cubic-bezier(.22,1,.36,1)",
        mixBlendMode: "normal",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isPointer ? (
        // Custom drag SVG (blue in light, white in dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <circle
            cx="49.5"
            cy="50.5"
            r="36.5"
            fill={isDark ? "#fff" : "#2563eb"}
            fillOpacity="1"
          />
          <path
            fill="none"
            stroke="#231f20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M93.043,68.15 c-3.846-10.314-8.057-20.558-10.593-23.511c-5.591-6.511-9.081-1.756-9.081-1.756"
          />
          <path
            fill="none"
            stroke="#231f20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M76.907,49.652 c0,0-5.588-14.723-14.228-6.997"
          />
          <path
            fill="none"
            stroke="#231f20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M50.462,46.917 c0,0-4.418,10.679-4.24,16.48c0.179,5.801,7.616,15.043,12.237,28.907"
          />
          <path
            fill="none"
            stroke="#231f20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M65.423,48.889 c0,0-5.304-12.853-9.237-17.465s-10.205-1.921-8.676,5.044c1.529,6.965,5.717,17.727,6.543,27.475"
          />
          <polygon
            fill="none"
            stroke="#231f20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="43,38.638 20.5,15.734 20.5,48.473 27.789,41.359 34.015,54.033 38.941,51.847 32.833,39.439"
          />
        </svg>
      ) : // Provided SVG as the normal pointer (blue in light, white in dark)
      isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <linearGradient
            id="whitePointer"
            x1="7.717"
            x2="33.49"
            y1="11.281"
            y2="44.269"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#e5e5e5" stopOpacity="1" />
          </linearGradient>
          <path
            fill="url(#whitePointer)"
            d="M36.224,27.737L17.09,8.603V6.001h-3.064C13.947,6.001,13,6.043,13,7.054v30.663 c0,0.638,0.524,1.064,1.077,1.065v0.01h3.007v-2.188l4.755-3.966l4.664,10.728c0.174,0.4,0.566,0.637,0.977,0.632v0h2.978v-1.204 l1.086-0.472c0.533-0.232,0.777-0.852,0.545-1.385l-4.628-10.647l8.1-0.726C36.468,29.484,36.868,28.381,36.224,27.737z"
          />
          <linearGradient
            id="whitePointer2"
            x1="15.236"
            x2="24.428"
            y1="27.904"
            y2="24.776"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".022" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#e5e5e5" stopOpacity="1" />
          </linearGradient>
          <path
            fill="url(#whitePointer2)"
            d="M16,7.054v30.663 c0,0.91,1.062,1.407,1.761,0.824l7.078-5.903l4.664,10.728c0.232,0.533,0.851,0.777,1.384,0.545l1.865-0.811L16.634,6.091 C16.276,6.246,16,6.593,16,7.054z"
          />
          <polygon
            fill="#fff"
            fillOpacity="1"
            points="18,35.737 25.608,29.392 30.959,41.699 32.877,40.866 27.521,28.546 36.408,27.75 18,9.343"
          />
          <path
            fill="#e5e5e5"
            fillOpacity="1"
            d="M35.089,40.938l-4.628-10.647l8.1-0.726c0.907-0.081,1.307-1.184,0.663-1.828L17.796,6.31 c-0.336-0.336-0.793-0.379-1.162-0.219l16.118,37.011l1.792-0.779C35.077,42.091,35.321,41.471,35.089,40.938z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <linearGradient
            id="h92YKRkEnBR3oN6T0Avu3a_2dcQtCVzhde4_gr1"
            x1="7.717"
            x2="33.49"
            y1="11.281"
            y2="44.269"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#0078d3" stopOpacity="1" />
            <stop offset="1" stopColor="#0858a1" stopOpacity="1" />
          </linearGradient>
          <path
            fill="url(#h92YKRkEnBR3oN6T0Avu3a_2dcQtCVzhde4_gr1)"
            d="M36.224,27.737L17.09,8.603V6.001h-3.064C13.947,6.001,13,6.043,13,7.054v30.663 c0,0.638,0.524,1.064,1.077,1.065v0.01h3.007v-2.188l4.755-3.966l4.664,10.728c0.174,0.4,0.566,0.637,0.977,0.632v0h2.978v-1.204 l1.086-0.472c0.533-0.232,0.777-0.852,0.545-1.385l-4.628-10.647l8.1-0.726C36.468,29.484,36.868,28.381,36.224,27.737z"
          />
          <linearGradient
            id="h92YKRkEnBR3oN6T0Avu3b_2dcQtCVzhde4_gr2"
            x1="15.236"
            x2="24.428"
            y1="27.904"
            y2="24.776"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".022" stopColor="#87efff" stopOpacity="1" />
            <stop offset="1" stopColor="#35c1f1" stopOpacity="1" />
          </linearGradient>
          <path
            fill="url(#h92YKRkEnBR3oN6T0Avu3b_2dcQtCVzhde4_gr2)"
            d="M16,7.054v30.663 c0,0.91,1.062,1.407,1.761,0.824l7.078-5.903l4.664,10.728c0.232,0.533,0.851,0.777,1.384,0.545l1.865-0.811L16.634,6.091 C16.276,6.246,16,6.593,16,7.054z"
          />
          <polygon
            fill="#35c1f1"
            fillOpacity="1"
            points="18,35.737 25.608,29.392 30.959,41.699 32.877,40.866 27.521,28.546 36.408,27.75 18,9.343"
          />
          <path
            fill="#199be2"
            fillOpacity="1"
            d="M35.089,40.938l-4.628-10.647l8.1-0.726c0.907-0.081,1.307-1.184,0.663-1.828L17.796,6.31 c-0.336-0.336-0.793-0.379-1.162-0.219l16.118,37.011l1.792-0.779C35.077,42.091,35.321,41.471,35.089,40.938z"
          />
        </svg>
      )}
    </div>
  );
};

export default CustomCursor;
