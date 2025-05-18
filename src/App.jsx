import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[rgb(15,23,42)] transition-colors duration-200">
        <Navbar />
        <main className="md:ml-54 p-4">
          <Hero />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
