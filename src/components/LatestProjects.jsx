import React from "react";
import { supabase } from "../lib/supabase";
import projectsIcon from "../../public/image.png";

const ProjectCard = ({ title, description, imageUrl, link, liveLink }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900/5 dark:bg-gray-900/30 hover:bg-gray-900/10 dark:hover:bg-gray-900/40 transition-all duration-300 w-80">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="p-4 flex flex-col h-full dark:bg-gray-800 bg-gray-200 opacity-90 w-80 rounded-xl">
          <div className="w-12 h-12 dark:bg-gray-700 bg-gray-200 rounded-full flex items-center justify-center mb-2">
            <img
              src={imageUrl}
              alt={title}
              className="w-10 h-10 object-contain rounded-full"
              loading="lazy"
              onError={(e) => {
                // console.error("Image failed to load:", e.target.src);
                e.target.onerror = null;
                e.target.src = projectsIcon;
              }}
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {description}
          </p>

          <div className="flex justify-between items-center">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-green-400 dark:text-green-500  transition-colors  bg-zinc-800 dark:bg-gray-700 rounded-md px-2 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              View Live Website
            </a>
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors duration-200">
              <svg
                className="w-4 h-4 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Crecon",
      description:
        "This is my personal project, which I've been working on. It's a creators, editors, graphic designers etc other gig finders or work searchers support platform with realtime chats, blogs.",
      imagePath: "projects/crecon-icon.jpg",
      link: "https://github.com/avikkk19/crecon",
      liveLink: "https://crecon.vercel.app",
    },
    {
      title: "DrunkDragon",
      description: "A web app purely about Formula 1.",
      imagePath: "projects/drunkdragon-icon.jpg",
      link: "https://github.com/avikkk19/DrunkDragon",
      liveLink: "https://drunkdragon.vercel.app",
    },
    {
      title: "CardioGuard",
      description:
        "AI-powered cardiac health monitoring and alert system that detects early signs of cardiac arrest using real-time sensor data and machine learning, instantly notifying emergency contacts.",
      imagePath: "projects/cardioguard-icon.jpg",
      link: "https://github.com/5mokshith/CardioGuard",
      liveLink: "https://cardio-guard-landing-page-ggqpsmfv0-mokshiths-projects-8dc2221a.vercel.app",
    },
    {
      title: "Trefloo-Landing",
      description:
        "Trefloo is a travel-tech platform that curates personalized, culture-rich journeys using AI and local insights. Discover hidden destinations, connect with local hosts, and experience travel beyond the ordinary.",
      imagePath: "projects/trefloo-icon.jpg",
      link: "https://github.com/5mokshith/Trefloo-Landing",
      liveLink: "https://trefloo.vercel.app",
    },
    // {
    //   title: "DrunkDragon",
    //   description:
    //     "DrunkDragon is your all-in-one destination for everything Formula 1. From live race updates to exclusive videos and stunning images, we keep you connected to the thrilling world of F1.",
    //   imagePath: "projects/trefloo-icon.jpg",
    //   link: "https://github.com/avikkk19/drunkdragon",
    //   liveLink: "https://drunkdragon.vercel.app/",
    // },
    // {
    //   title: "Enzo",
    //   description:
    //     "Welcome to ENzo — a blog where Formula 1 thrills, the latest tech news, and web development trends collide. Discover the best F1 streaming services, analytics tools, and ways to stay connected with your favorite sport.",
    //   imagePath: "projects/trefloo-icon.jpg",
    //   link: "https://github.com/avikkk19/enzo",
    //   liveLink: "https://enzo-smoky.vercel.app/",
    // },
  ];

  const projectsWithUrls = projects.map((project) => {
    try {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(project.imagePath);
      return {
        ...project,
        imageUrl: data.publicUrl,
      };
    } catch (error) {
      console.error(`Error getting URL for ${project.title}:`, error);
      return {
        ...project,
        imageUrl: projectsIcon,
      };
    }
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 md:mx-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Latest <span className="text-green-500 ">projects.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-4 mr-[320px]">
          {projectsWithUrls.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              link={project.link}
              liveLink={project.liveLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
