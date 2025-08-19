import React, { useState, useEffect } from "react";
import GithubProfileFinder from "./compo/GithubProfileFinder";
import logo from "./assets/codebyvikas.png"; // ✅ Your logo

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-100 flex flex-col">
      {/* Navbar with glassmorphism + animated shrink on scroll */}
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500
          ${
            isScrolled
              ? "backdrop-blur-md bg-black/60 border-b border-gray-800/70 py-3 shadow-xl"
              : "backdrop-blur-xl bg-black/30 border-b border-gray-700/40 py-6 sm:py-8 shadow-lg"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left Logo + Brand */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt="CodebyVikas Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain 
                  drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] 
                  group-hover:scale-110 group-hover:rotate-3 
                  transition-transform duration-500 ease-out"
              />
              {/* Glow Ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-30 blur-xl animate-pulse"></span>
            </div>
            <span
              className={`font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
                text-xl sm:text-2xl tracking-wide drop-shadow-lg`}
            >
              GitHub Finder
            </span>
          </div>

          {/* Center Nav */}
          <nav
            className={`hidden md:flex gap-6 text-sm font-medium transition-colors
              ${isScrolled ? "text-gray-300" : "text-gray-400"}`}
          >
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-purple-400 transition-colors">
              Explore
            </a>
            <a href="#" className="hover:text-pink-400 transition-colors">
              About
            </a>
          </nav>

          {/* Right CTA Button */}
          <div>
            <a
              href="https://codebyvikas.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold 
                bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 
                hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/40 
                transition-all shadow-md active:scale-95"
            >
              My Portfolio
            </a>
          </div>
        </div>
      </header>

      {/* Spacer for navbar height */}
      <div className={isScrolled ? "h-16" : "h-24 sm:h-28"}></div>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <GithubProfileFinder />
        </div>
      </main>

{/* Footer */}
<footer className="relative mt-10 bg-black/40 backdrop-blur-xl border-t border-gray-800/60">
  {/* Glow gradient top border */}
  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse" />

  <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
    {/* Logo + Brand */}
    <div className="flex items-center gap-3 group">
      <img
        src={logo}
        alt="CodebyVikas Logo"
        className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-[0_0_12px_rgba(236,72,153,0.5)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
      />
      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-lg sm:text-xl tracking-wide">
        CodebyVikas
      </span>
    </div>

    {/* Navigation Links */}
    <nav className="flex gap-6 text-sm font-medium text-gray-400">
      <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
      <a href="#" className="hover:text-purple-400 transition-colors">Explore</a>
      <a href="#" className="hover:text-pink-400 transition-colors">About</a>
      <a href="https://codebyvikas.xyz" target="_blank" rel="noopener noreferrer"
        className="hover:text-cyan-300 transition-colors">
        Portfolio
      </a>
    </nav>

    {/* Social Links */}
    <div className="flex gap-5">
      <a href="https://github.com/fixerror29" target="_blank" rel="noopener noreferrer"
        className="text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110 transform duration-300">
        <i className="lab la-github text-2xl"></i>
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"
        className="text-gray-400 hover:text-purple-400 transition-colors hover:scale-110 transform duration-300">
        <i className="lab la-linkedin text-2xl"></i>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
        className="text-gray-400 hover:text-pink-400 transition-colors hover:scale-110 transform duration-300">
        <i className="lab la-twitter text-2xl"></i>
      </a>
    </div>
  </div>

  {/* Bottom copyright */}
  <div className="border-t border-gray-800/60 text-center py-4 text-xs text-gray-500">
    © {new Date().getFullYear()}{" "}
    <a
      href="https://codebyvikas.xyz"
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:text-purple-400 transition-colors"
    >
      codebyvikas.xyz
    </a>{" "}
    · Crafted with ❤️ · Powered by GitHub API
  </div>
</footer>

    </div>
  );
};

export default App;
