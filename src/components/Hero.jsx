import React from "react";
import musicImg from "../assets/playlistcover.jpg"
import maxImg from "../assets/max.jpg"
import resume from "../../public/portfolio/AvinashResume.pdf";

function Hero() {
  return ( 
    <div className="py-20 md:ml-20 ml-4 relative">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white capitalize">
          I'm{" "}
          <a href={resume} className="text-amber-500 hover:text-amber-600 cursor-alias" download="AvinashResume.pdf">
            Avinash, {""}
          </a>
          I make <span className="text-green-500 bg-zinc-900 rounded-sm">full-stack</span>{" "}
          products that I <span className="text-pink-500">love.</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 capitalize ">
          Developer, Tech Enthusiast, {""}
          <span className="text-blue-500">Gamer</span> and Student.
          <br /> I play, read, <span className="text-blue-500">write</span> and
          travel for fun.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 ">
          <a
            href="/signbook"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors hover:scale-115 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
            style={{  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            rel="noopener noreferrer"
          >
            Sign my guestbook
          </a>
          <a
            href="mailto:avinashkamadri67@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:scale-115 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
            style={{  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            rel="noopener noreferrer"
          >
            Send an private email →
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/avikkk19"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/enzofordddddd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a
            href="//https://www.linkedin.com/in/avinash-kamadri-28246935a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://discord.com/users/SixTusop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
          <a
            href="mailto:avinashkamadri67@gmail.com"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>

      </div>
      {/* image playlisttttttt broksy */}
      <a className="fixed top-20 right-36 w-80 z-50 cursor-pointer hidden lg:block" href="https://www.formula1.com/" target="_blank">
        <section className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.07)] dark:shadow-[0_4px_20px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]">
          <img
            src={maxImg}
            alt="music playlist"
            className="w-full h-40 object-cover  brightness-95"
          />
          {/* Overlay content hereeeeeeeee  */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 py-8 bg-black/60">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Sports.
            </h2>
            <div className="text-white text-center text-lg font-medium drop-shadow-lg">
              I’ve been following F1 <br /> lately—it’s a thrilling sport that combines speed, strategy, and technology.
            </div>
          </div>
        </section>
      </a>
      {/* add moreeeeeeeeeeeeeeeeeeeeeee*/}
      <a className="fixed top-64 right-36 w-80 z-50 cursor-pointer hidden lg:block" href="https://open.spotify.com/playlist/3Tn55g8XnYJVZzQ8K6U9Fg?si=5877f4329f70426a"
      target="_blank">
        <section className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.07)] dark:shadow-[0_4px_20px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]">
          <img
            src={musicImg}
            alt="music playlist"
            className="w-full h-40 object-cover  brightness-20"
          />
          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 py-8 bg-black/60">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Playlist.
            </h2>
            <div className="text-white text-center text-lg font-medium drop-shadow-lg">
              These are the songs I listen to regularly, depending on my mood.
            </div>
          </div>
        </section>
      </a>
    </div>
  );
}

export default Hero;
