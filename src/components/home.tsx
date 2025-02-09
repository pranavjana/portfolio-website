import React from "react";
import NavigationMenuComponent from "./NavigationMenu";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import { motion } from "framer-motion";
import CertificationsSection from "./CertificationsSection";
import Footer from "./Footer";

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
}

const Home = ({
  name = "Pranav Janakiraman",
  title = "Full Stack Developer",
  description = "Passionate about creating beautiful and functional web applications. Specialized in React, TypeScript, and modern web technologies.",
  imageUrl = "/pranav.png",
  socialLinks = {
    github: "https://github.com/pranavjana",
    linkedin: "https://linkedin.com/in/pranavjana",
    twitter: "https://twitter.com",
  },
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
      className="bg-white dark:bg-black"
    >
      <NavigationMenuComponent onSectionClick={handleSectionClick} />

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

      <div id="projects">
        <ProjectsSection />
      </div>

      <div id="certifications">
        <CertificationsSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
    </motion.div>
  );
};

export default Home;
