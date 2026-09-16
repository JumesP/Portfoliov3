"use client"
import React, { useState, useEffect } from "react";

interface techStack {
    name: string;
    category: category;
    level: number;
    experience: string;
    icon: string;
    isLanguage: boolean;
}

type category = "all" | "frontend" | "backend" | "database" | "devops" | "tools" | "design";

type techStackCategories = {
    name: category;
    label: string;
}

const Technologies = () => {
    const [filter, setFilter] = useState<category>('all');

    // Sample tech stack data with reliable icon URLs
    const techStack: techStack[] = [
        { name: 'JavaScript', category: 'frontend', level: 90, experience: '2 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', isLanguage: true },
        { name: 'React', category: 'frontend', level: 85, experience: '1,5 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg', isLanguage: false },
        { name: 'HTML/CSS', category: 'frontend', level: 95, experience: '3 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg', isLanguage: false },
        { name: 'Tailwind CSS', category: 'frontend', level: 70, experience: '1 year', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg', isLanguage: false },
        { name: 'Python', category: 'backend', level: 65, experience: '3 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg', isLanguage: true },
        { name: 'MongoDB', category: 'database', level: 70, experience: '2 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg', isLanguage: false },
        { name: 'SQL', category: 'database', level: 80, experience: '2 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg', isLanguage: false },
        // { name: 'Docker', category: 'devops', level: 60, experience: '2 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg', isLanguage: false },
        { name: 'Azure', category: 'devops', level: 65, experience: '0.5 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg', isLanguage: false },
        { name: 'AWS', category: 'devops', level: 85, experience: '1 year', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', isLanguage: false },
        { name: 'Git', category: 'tools', level: 75, experience: '2.5 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg', isLanguage: false },
        { name: 'TypeScript', category: 'frontend', level: 65, experience: '1 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg', isLanguage: true },
        { name: 'Node.js', category: 'backend', level: 80, experience: '2 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg', isLanguage: false },
        { name: 'Express', category: 'backend', level: 75, experience: '2 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg', isLanguage: false },
        { name: 'Figma', category: 'design', level: 50, experience: '1.5 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg', isLanguage: false },
        { name: 'Java', category: 'backend', level: 65, experience: '1.5 years', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg', isLanguage: true },
        { name: 'C#', category: 'backend', level: 60, experience: '1 year', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg', isLanguage: true },
        { name: 'PHP', category: 'backend', level: 25, experience: '1 day', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg', isLanguage: true }
    ];

    const techCategories: techStackCategories[] = [
        { name: 'all', label: 'All' },
        { name: 'frontend', label: 'Frontend' },
        { name: 'backend', label: 'Backend' },
        { name: 'database', label: 'Database' },
        { name: 'devops', label: 'DevOps' },
        { name: 'tools', label: 'Tools' },
        { name: 'design', label: 'Design' }
    ];

    const imageTransitionPopAndRotate = "transition-all duration-300 ease-out\n" +
        "      group-hover:scale-125\n" +
        "      group-hover:-rotate-6"
    const imageTransitionAnimation = "      transition-transform duration-2000\n" +
        "      [transform-style:preserve-3d]\n" +
        "      group-hover:[transform:rotateY(360deg)]"


    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-20 mt-20 max-w-[1200px]">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-bold mb-5">Technologies</h1>
                    <p className="text-lg font-medium">As a developer, I've worked with a wide range of technologies across different domains.</p>
                    <p className="text-lg font-medium">Below are the key tools and frameworks I've mastered throughout my journey,</p>
                    <p className="text-lg font-medium">showcasing both my proficiency level and years of experience with each technology.</p>
                </div>
                <div className="Content flex flex-col gap-8">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">Categories</h2>
                        <div className="flex flex-wrap gap-2 p-5 justify-center">
                            {techCategories.map(category => (
                                <button key={category.name} onClick={() => setFilter(category.name)} className="bg-white text-black px-3 py-1 rounded-full border border-blue-500 text-sm cursor-pointer hover:bg-blue-500 hover:text-white">
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 justify-center">
                        {techStack
                            .filter(tech => filter !== "all" ? tech.category === filter : true)
                            .map(tech => (
                                <div key={tech.name} className="flex flex-col gap-5 border-2 p-4 rounded-lg shadow-md group w-56 h-56">
                                    <div className="flex flex-row gap-2 items-center">
                                        <img src={tech.icon} alt={tech.name} className={`w-16 h-16 ${imageTransitionPopAndRotate}`} />
                                        <h3 className="text-lg font-bold pl-1 h-fit">{tech.name}</h3>

                                    </div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <p className="text-sm text-center text-gray-700">Proficiency</p>
                                        <div className="flex-1 level-indicator">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`star ${star <= Math.round(tech.level/20) ? 'text-black' : 'text-gray-400'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-center">
                                        <p className="text-sm text-center text-gray-700">Experience</p>
                                        <p className="text-sm text-center">{tech.experience}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Technologies;