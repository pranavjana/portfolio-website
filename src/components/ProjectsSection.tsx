import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  isAwardWinning?: boolean;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const ProjectsSection = ({
  projects = [
    {
      title: "TaskGenie",
      description:
        "NUS Orbital 2025 Judges' Choice Award - Agentic AI task management hub with collaborative agents.",
      imageUrl: "/taskgenie.png",
      technologies: ["Next.js", "TypeScript", "LangGraph"],
      liveUrl: "https://taskgenie-ai.vercel.app/",
      githubUrl: "https://github.com/pranavjana/taskgenie-ai",
      isAwardWinning: true,
    },
    {
      title: "Pawgress",
      description:
        "HackNRoll 2025 Commendation Award - A gamified task manager with virtual pet companion.",
      imageUrl: "/pawgress.png",
      technologies: ["React", "Tailwind CSS", "Vite", "SQLite"],
      liveUrl: "https://d9c57d06.pawgress.pages.dev/",
      githubUrl: "https://github.com/pranavjana/HacknRoll-2025",
      isAwardWinning: true,
    },
    {
      title: "Project SOAR",
      description:
        "SAP SCALE 2025 2nd Place - Real-time aviation operations dashboard using key SAP technologies.",
      imageUrl: "/soar.png",
      technologies: ["SAPUI5", "SAP BTP", "S/4HANA"],
      liveUrl: "#",
      githubUrl: "https://github.com/feliciahxy/SAP-SCALE",
      isAwardWinning: true,
    },
    {
      title: "AWS Cloud Resume",
      description: "Serverless portfolio website built with AWS services.",
      imageUrl: "/aws.png",
      technologies: ["AWS", "Terraform", "CI/CD"],
      liveUrl: "https://pranav-portfolio.com",
      githubUrl: "https://github.com/pranavjana/awscloud-resume-challenge",
    },
    {
      title: "mBot Maze Solver",
      description: "ATmega328-powered autonomous robot with wall following capabilities.",
      imageUrl: "/mbot.png",
      technologies: ["C++", "Arduino", "Robotics", "Sensors"],
      liveUrl: "#",
      githubUrl: "https://github.com/pranavjana/cg1111a_amazing_race",
    },
  ],
}: ProjectsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = 380; // Width of card
      const gap = 32; // Gap between cards
      const scrollPosition = index * (cardWidth + gap);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      // If on first dot, scroll to beginning
      scrollToIndex(0);
    } else {
      // Go to second project of previous dot group
      scrollToIndex(0);
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    if (currentIndex === 0) {
      // Go to first project of next dot group (AWS Cloud Resume)
      scrollToIndex(3);
      setCurrentIndex(1);
    } else {
      // Already at last dot, scroll to last project
      scrollToIndex(projects.length - 1);
    }
  };

  // Handle scroll events to update current index
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = 380;
      const gap = 32;
      const scrollPosition = carousel.scrollLeft;
      const projectIndex = Math.round(scrollPosition / (cardWidth + gap));
      // Map project index to dot index (3 projects for first dot, 2 for second)
      const dotIndex = projectIndex < 3 ? 0 : 1;
      setCurrentIndex(dotIndex);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  return (
    <section id="projects" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of my notable projects that showcase my skills and experience in software development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-50"
            onClick={handleNext}
            disabled={currentIndex === 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel Container */}
          <div className="mx-12">
            <div 
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <div key={index} className="flex-none snap-center">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex flex-col items-center mt-8">
            <div className="flex justify-center gap-2">
              {[0, 1].map((dotIndex) => (
                <button
                  key={dotIndex}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    dotIndex === currentIndex 
                      ? 'bg-primary' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => scrollToIndex(dotIndex === 0 ? 0 : 3)}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              ← Scroll to see more! →
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
