import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AchievementCard = ({ title, imageUrl, link }) => {
  return (
    <a
      href={link}
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl bg-gray-900/5 dark:bg-gray-900/30 hover:bg-gray-900/10 dark:hover:bg-gray-900/40 transition-all duration-300"
    >
      <div className="aspect-[4/3] relative">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full rounded-xl opacity-70"
          loading="lazy"
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 rounded-xl" />
        <div className="absolute bottom-0 left-0 right-0 p-4 ">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <div className="flex items-center">
            {/* <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
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
            </div> */}
          </div>
        </div>
      </div>
    </a>
  );
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const achievementsData = [
        {
          title: "HACKSAVY 25 finalists",
          imagePath: "big4-1.jpg",
          link: "",
        },
        {
          title: "JITS INNOFEST-2025 runners-up",
          imagePath: "big4-2.jpg",
          link: "",
        },
        // add more achievements here in later if had any
      ];

      const achievementsWithUrls = achievementsData.map((achievement) => {
        const fullPath = `achievements/${achievement.imagePath}`;
        const { data } = supabase.storage.from("images").getPublicUrl(fullPath);

        return {
          ...achievement,
          imageUrl: data.publicUrl,
        };
      });

      setAchievements(achievementsWithUrls);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section ref={sectionRef} className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              title={achievement.title}
              imageUrl={achievement.imageUrl}
              link={achievement.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
