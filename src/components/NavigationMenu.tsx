import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { motion } from "framer-motion";

interface NavigationMenuProps {
  onSectionClick?: (section: string) => void;
  sections?: Array<{ id: string; label: string }>;
}

const NavigationMenuComponent = ({
  onSectionClick = () => {},
  sections = [
    { id: "hero", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
}: NavigationMenuProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg px-8 py-2 border border-gray-200 dark:border-gray-700 w-auto min-w-[500px] flex justify-center"
    >
      <NavigationMenu className="w-full max-w-[800px]">
        <NavigationMenuList className="w-full justify-center gap-4">
          {sections.map((section) => (
            <NavigationMenuItem key={section.id}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => onSectionClick(section.id)}
              >
                {section.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
};

export default NavigationMenuComponent;
