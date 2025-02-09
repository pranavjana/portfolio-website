import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

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
      title: "Pawgress",
      description:
        "HackNRoll 2025 Commendation Award - A gamified task manager with virtual pet companion.",
      imageUrl: "/pawgress.png",
      technologies: ["React", "Tailwind CSS", "Vite", "SQLite"],
      liveUrl: "https://pawgress.vercel.app",
      githubUrl: "https://github.com/pranavjana/HacknRoll-2025",
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
  return (
    <section id="projects" className="py-16 sm:py-24">
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
