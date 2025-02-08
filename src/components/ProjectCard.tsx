import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const getTechBadgeStyles = (tech: string) => {
  const styles: { [key: string]: string } = {
    "React": "bg-[#61DAFB]/10 text-[#61DAFB] border-[#61DAFB]/20",
    "Tailwind CSS": "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/20",
    "Vite": "bg-[#646CFF]/10 text-[#646CFF] border-[#646CFF]/20",
    "SQLite": "bg-[#003B57]/10 text-[#003B57] dark:text-[#0078D4] border-[#003B57]/20",
    "Firebase": "bg-[#FFCA28]/10 text-[#FFCA28] border-[#FFCA28]/20",
    "Material-UI": "bg-[#007FFF]/10 text-[#007FFF] border-[#007FFF]/20",
    "OpenWeather API": "bg-[#E96E50]/10 text-[#E96E50] border-[#E96E50]/20",
    "Leaflet": "bg-[#199900]/10 text-[#199900] border-[#199900]/20",
    "TypeScript": "bg-[#3178C6]/10 text-[#3178C6] border-[#3178C6]/20",
    "Node.js": "bg-[#339933]/10 text-[#339933] border-[#339933]/20",
    "AWS": "bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20",
    "Terraform": "bg-[#7B42BC]/10 text-[#7B42BC] border-[#7B42BC]/20",
    "CI/CD": "bg-[#2088FF]/10 text-[#2088FF] border-[#2088FF]/20",
    "C++": "bg-[#00599C]/10 text-[#00599C] border-[#00599C]/20",
    "Arduino": "bg-[#00979D]/10 text-[#00979D] border-[#00979D]/20",
    "Robotics": "bg-[#FF1E1E]/10 text-[#FF1E1E] border-[#FF1E1E]/20",
    "Sensors": "bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20",
  };
  
  return styles[tech] || "bg-gray-100 dark:bg-black/40 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700";
};

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  isAwardWinning?: boolean;
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and its key features. This showcases the main functionality and purpose of the project.",
  imageUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
  technologies = ["React", "TypeScript", "Tailwind"],
  liveUrl = "#",
  githubUrl = "#",
  isAwardWinning = false,
}: ProjectCardProps) => {
  const triggerConfetti = () => {
    const confetti = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    };

    // @ts-ignore
    window.confetti(confetti);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="w-full sm:w-[340px] md:w-[360px] lg:w-[380px] bg-white dark:bg-black relative"
    >
      {isAwardWinning && (
        <div 
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10 animate-bounce cursor-pointer"
          onClick={triggerConfetti}
        >
          <span className="text-2xl sm:text-3xl" role="img" aria-label="award">🏆</span>
        </div>
      )}
      <Card className="h-[400px] sm:h-[450px] overflow-hidden flex flex-col bg-gray-100/40 dark:bg-stone-800/30">
        <CardHeader className="p-0">
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 flex-1">
          <div className="flex flex-col h-full">
            <CardTitle className="text-lg sm:text-xl font-semibold mb-2">{title}</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
              {description}
            </CardDescription>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={cn(
                    "border rounded-full text-xs sm:text-sm px-2 py-0.5",
                    getTechBadgeStyles(tech)
                  )}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-auto">
              <Button variant="outline" size="sm" asChild className="h-8 sm:h-9 text-xs sm:text-sm">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Code
                </a>
              </Button>
              <Button size="sm" asChild className="h-8 sm:h-9 text-xs sm:text-sm">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Live Demo
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
