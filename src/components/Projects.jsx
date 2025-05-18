import React from "react";
import { supabase } from "../lib/supabase";

const ProjectCard = ({ title, description, imageUrl, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl bg-gray-900/5 dark:bg-gray-900/30 hover:bg-gray-900/10 dark:hover:bg-gray-900/40 transition-all duration-300 w-80"
    >
      <div className="p-4 flex flex-col h-full dark:bg-gray-800 bg-gray-200 opacity-90 w-80 rounded-xl">
        <div className="w-12 h-12  dark:bg-gray-700 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <img
            src={imageUrl}
            alt={title}
            className="w-8 h-8 object-contain rounded-full "
            loading="lazy"
            onError={(e) => {
              console.error("Image failed to load:", e.target.src);
              // Set a fallback icon based on first letter
              e.target.onerror = null;
              e.target.src =
                "https://dhravya.dev/_next/image?url=https%3A%2F%2Fi.dhr.wtf%2Fr%2Fsupermemory.png&w=96&q=75";
            }}
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {description}
        </p>

        <div className="self-end">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
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
  );
};

const Projects = () => {
  const projects = [
    // add more later
    {
      title: "CardioGuard",
      description:
        "AI-powered cardiac health monitoring and alert system that detects early signs of cardiac arrest using real-time sensor data and machine learning, instantly notifying emergency contacts.",
      imagePath: "placeholder", // No image available
      link: "https://github.com/5mokshith/CardioGuard",
    },
    {
      title: "Trefloo-Landing",
      description:
        "Trefloo is a travel-tech platform that curates personalized, culture-rich journeys using AI and local insights. Discover hidden destinations, connect with local hosts, and experience travel beyond the ordinary.",
      imagePath: "placeholder", // No image available
      link: "https://github.com/5mokshith/Trefloo-Landing",
    },
    {
      title: "Crecon",
      description:
        "This is my personal project, which I've been working on. It's a creators, editors, graphic designers etc other gig finders or work searchers support platform with realtime chats, blogs.",
      imagePath: "projects/crecon-icon.jpg",
      link: "https://crecon.vercel.app",
    },
    {
      title: "DrunkDragon",
      description: "A web app purely about Formula 1.",
      imagePath: "projects/drunkdragon-icon.jpg",
      link: "https://drunkdragon.vercel.app",
    },
  ];

  const projectsWithUrls = projects.map((project) => {
    // For placeholder images, generate a fallback
    if (project.imagePath === "placeholder") {
      return {
        ...project,
        imageUrl:
          "https://dhravya.dev/_next/image?url=https%3A%2F%2Fi.dhr.wtf%2Fr%2Fsupermemory.png&w=96&q=75",
      };
    }

    // Try to get the public URL from Supabase Storage
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
      // Fallback to a placeholder image with first letter
      return {
        ...project,
        imageUrl:
          "https://dhravya.dev/_next/image?url=https%3A%2F%2Fi.dhr.wtf%2Fr%2Fsupermemory.png&w=96&q=75",
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
