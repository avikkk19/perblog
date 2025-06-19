import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import SignBook from "./components/SignBook";
import Photography from "./components/Photography";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import BlogList from "./components/Blog";
import LatestProjects from "./components/LatestProjects";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <div className="min-h-screen bg-white dark:bg-[rgb(15,23,42)] transition-colors duration-200">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main className="md:ml-54 p-4">
                <Hero />
                <Achievements />
                <LatestProjects />
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
          <Route
            path="/projects"
            element={
              <main className="md:ml-54 p-4">
                <Projects />
                <Footer />
              </main>
            }
          />

          <Route
            path="/photography"
            element={
              <main className="md:ml-54 p-4">
                <Photography />
                <Footer />
              </main>
            }
          />
          <Route
            path="/blog"
            element={
              <main className="md:ml-54 p-4">
                <BlogList />
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
