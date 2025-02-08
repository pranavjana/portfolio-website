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
    icon: <i className="devicon-nextjs-original text-3xl dark:text-white text-black" />,
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
      <svg viewBox="0 0 128 128" className="w-8 h-8">
        <path fill="#252f3e" className="dark:fill-white" d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Z" />
        <path fill="#f90" className="dark:fill-[#FF9900]" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z" />
      </svg>
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
