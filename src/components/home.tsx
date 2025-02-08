import React from "react";
import NavigationMenuComponent from "./NavigationMenu";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import CertificationsSection from "./CertificationsSection";

interface HomeProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  email?: string;
}

const Home = ({
  name = "John Doe",
  title = "Full Stack Developer",
  description = "Passionate about creating beautiful and functional web applications. Specialized in React, TypeScript, and modern web technologies.",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio",
  socialLinks = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  email = "hello@example.com",
}: HomeProps) => {
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900"
    >
      <NavigationMenuComponent onSectionClick={handleSectionClick} />
      <ThemeToggle />

      <div id="hero">
        <HeroSection
          name={name}
          title={title}
          description={description}
          imageUrl={imageUrl}
          socialLinks={socialLinks}
          onExploreClick={() => handleSectionClick("skills")}
        />
      </div>

      <div id="skills">
        <SkillsSection />
      </div>

      <div id="certifications">
        <CertificationsSection />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="contact">
        <ContactSection email={email} socialLinks={socialLinks} />
      </div>
    </motion.div>
  );
};

export default Home;
