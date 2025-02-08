import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Figma, GitBranch, Boxes } from "lucide-react";

interface Skill {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  {
    name: "Figma",
    description:
      "UI/UX design and prototyping tool for creating modern interfaces",
    icon: <Figma className="w-8 h-8" />,
  },
  {
    name: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript",
    icon: <span className="text-2xl">TS</span>,
  },
  {
    name: "React",
    description:
      "Library for building user interfaces with reusable components",
    icon: <span className="text-2xl">⚛️</span>,
  },
  {
    name: "Next.js",
    description: "React framework for production-grade applications",
    icon: <span className="text-2xl">N</span>,
  },
  {
    name: "Tailwind",
    description: "Utility-first CSS framework for rapid UI development",
    icon: <span className="text-2xl">🎨</span>,
  },
  {
    name: "Git",
    description: "Version control system for tracking code changes",
    icon: <GitBranch className="w-8 h-8" />,
  },
  {
    name: "Supabase",
    description: "Open source Firebase alternative with PostgreSQL",
    icon: <span className="text-2xl">S</span>,
  },
  {
    name: "Appwrite",
    description: "Open source backend server for web and mobile apps",
    icon: <Boxes className="w-8 h-8" />,
  },
];

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Technology Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modern tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
