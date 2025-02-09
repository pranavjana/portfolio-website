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
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationMenuProps {
  onSectionClick?: (section: string) => void;
  sections?: Array<{ id: string; label: string }>;
}

const NavigationMenuComponent = ({
  onSectionClick = () => {},
  sections = [
    { id: "hero", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ],
}: NavigationMenuProps) => {
  return (
    <div className="hidden sm:flex fixed top-4 left-0 right-0 z-50 justify-center items-center gap-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full shadow-lg px-8 py-2 border border-gray-200 dark:border-gray-700"
      >
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            {sections.map((section) => (
              <NavigationMenuItem key={section.id}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent",
                    "cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-primary"
                  )}
                  onClick={() => onSectionClick(section.id)}
                >
                  {section.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
      
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ThemeToggle className="bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700" />
      </motion.div>
    </div>
  );
};

export default NavigationMenuComponent;
