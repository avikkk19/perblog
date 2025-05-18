import React from "react";
import { supabase } from "../lib/supabase";

const ProjectCard = ({ title, description, stack, imageUrl, link }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900/5 dark:bg-gray-900/30 hover:bg-gray-900/10 dark:hover:bg-gray-900/40 transition-all duration-300">
      <div className="aspect-[4/3] relative">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full rounded-xl"
          loading="lazy"
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 rounded-xl" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-white/80 mb-2 line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {stack.split(",").map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-white/20 text-white rounded-full"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Supermemory",
      description:
        "AI second brain for your team. Supermemory is a tool that helps you capture, organize, and retrieve information from your team's conversations and documents.",
      stack: "React, Node.js, OpenAI",
      imagePath: "projects/supermemory.jpg",
      link: "https://supermemory.com",
    },
    {
      title: "Supermemory DB",
      description:
        "Vector database I made for Supermemory. Fully serverless and infinitely scalable by using Cloudflare R2 and Durable objects.",
      stack: "Cloudflare, R2, Durable Objects",
      imagePath: "projects/supermemorydb.jpg",
      link: "https://db.supermemory.com",
    },
    {
      title: "Markdowner",
      description:
        "Converts websites to LLM-ready markdown data. I built this to help me with Supermemory.",
      stack: "Node.js, Puppeteer",
      imagePath: "projects/markdowner.jpg",
      link: "https://markdowner.dev",
    },
    {
      title: "Discord Bot to Portfolio",
      description:
        "A discord bot that creates a website for yours as you talk to it.",
      stack: "Discord.js, Next.js",
      imagePath: "projects/discordbot.jpg",
      link: "https://discord-portfolio.dev",
    },
    {
      title: "Radish",
      description:
        "Super fast drop-in replacement of the in memory key-value store Redis, made in Golang",
      stack: "Golang",
      imagePath: "projects/radish.jpg",
      link: "https://github.com/radish",
    },
    {
      title: "Lecture Chat",
      description:
        "A virtual TA that listens to the lecture and answers your doubts in real time.",
      stack: "Next.js, Whisper API",
      imagePath: "projects/lecturechat.jpg",
      link: "https://lecturechat.ai",
    },
    {
      title: "Crecon",
      description:
        "This is my personal project, which I've been working on. It's a creators, editors, graphic designers etc other gig finders or work searchers support platform with realtime chats, blogs.",
      stack: "MERN stack",
      imagePath: "projects/crecon.jpg",
      link: "https://crecon.dev",
    },
    {
      title: "DrunkDragon",
      description: "A web app purely about Formula 1.",
      stack: "React, Tailwind, Supabase",
      imagePath: "projects/drunkdragon.jpg",
      link: "https://drunkdragon.com",
    },
  ];

  const projectsWithUrls = projects.map((project) => {
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
      // Fallback to a placeholder image
      return {
        ...project,
        imageUrl: "https://via.placeholder.com/400x300?text=Project+Image",
      };
    }
  });

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Projects
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Here are a few of the projects I've been working on
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsWithUrls.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              stack={project.stack}
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
