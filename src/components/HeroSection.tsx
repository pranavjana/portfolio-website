import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Twitter, MapPin, GraduationCap, Download } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

// Use URL imports for the image
import profileImageUrl from "../assets/pranav.png?url";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  cvUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  onExploreClick?: () => void;
}

const HeroSection = ({
  name = "Pranav Janakiraman",
  title = "Full Stack Developer",
  description = "Passionate about creating beautiful and functional web applications. Specialized in React, TypeScript, and modern web technologies.",
  imageUrl = profileImageUrl,
  cvUrl = "/resume.pdf",
  socialLinks = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  onExploreClick = () => {},
}: HeroSectionProps) => {
  return (
    <section className="min-h-screen w-full dark:bg-black bg-white bg-dot dark:bg-dot-white bg-dot-black relative overflow-hidden py-8 sm:py-0">
      {/* Radial gradient overlay */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-4 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left pt-8 lg:pt-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
            >
              Hi, I'm {name}{" "}
              <motion.span
                className="inline-block cursor-default"
                whileHover={{ rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                👋
              </motion.span>
            </motion.h1>

            <HeroHighlight containerClassName="justify-start">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl sm:text-2xl lg:text-3xl text-gray-900 dark:text-white mb-4"
              >
                <Highlight>{title}</Highlight>
              </motion.h2>
            </HeroHighlight>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>Singapore</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-center sm:text-left">Computer Engineering @ National University of Singapore</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8"
            >
              <Button
                size="lg"
                onClick={onExploreClick}
                className="rounded-full text-sm sm:text-base py-2 px-4"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>

              <div className="flex gap-3 sm:gap-4">
                <button className="bg-slate-800 no-underline group cursor-pointer relative rounded-full p-px text-xs sm:text-sm font-semibold leading-6 text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <a
                    href={cvUrl}
                    download
                    className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1.5 sm:py-2 px-3 sm:px-4 ring-1 ring-white/10"
                  >
                    <span className="text-xs sm:text-sm">Download CV</span>
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>

                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 flex justify-center items-center -mt-6 sm:mt-0"
          >
            <CardContainer>
              <CardBody className="relative group/card w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-3xl animate-pulse" />
                <CardItem translateZ={100} className="w-full h-full">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="rounded-full w-full h-full object-cover relative z-10 border-4 border-white dark:border-black"
                    style={{ objectPosition: "center", objectFit: "cover" }}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
