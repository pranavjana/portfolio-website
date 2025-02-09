import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

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
    name: "C++",
    description: "Programming Language",
    icon: <i className="devicon-cplusplus-plain colored text-3xl" />,
  },
  {
    name: "JavaScript",
    description: "Programming Language",
    icon: <i className="devicon-javascript-plain colored text-3xl" />,
  },
  {
    name: "React",
    description: "JavaScript Library",
    icon: <i className="devicon-react-original colored text-3xl" />,
  },
  {
    name: "Next.js",
    description: "React framework",
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
        className="w-8 h-8 dark:invert"
      />
    ),
  },
  {
    name: "Tailwind",
    description: "CSS framework",
    icon: <i className="devicon-tailwindcss-plain colored text-3xl" />,
  },
  {
    name: "Git",
    description: "Version control",
    icon: <i className="devicon-git-plain colored text-3xl" />,
  },
  {
    name: "Supabase",
    description: "Backend tool",
    icon: <i className="devicon-supabase-plain colored text-3xl" />,
  },
  {
    name: "AWS",
    description: "Cloud Platform",
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
        className="w-8 h-8"
      />
    ),
  },
];

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Current technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            I'm proficient in a range of modern technologies that empower me to build highly functional solutions. These are some of my main technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-50 dark:bg-[#1C1C1C] border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {skill.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {skill.description}
                      </p>
                    </div>
                  </div>
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
