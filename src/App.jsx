import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import SignBook from "./components/SignBook";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[rgb(15,23,42)] transition-colors duration-200">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main className="md:ml-54 p-4">
                <Hero />
                <Achievements />
                <Projects />
                <Footer />
              </main>
            }
          />
          <Route
            path="/signbook"
            element={
              <main className="md:ml-54 p-4">
                <SignBook />
                <Footer />
              </main>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
