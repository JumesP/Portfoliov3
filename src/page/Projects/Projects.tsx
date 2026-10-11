"use client"
import React from "react";
import ProjectSwiper from "@/src/components/projectSwiper/ProjectSwiper";
import { ProjectCard } from "@/src/types/project/projectTypes";

const rotationAmount = 12

const getRandomRotation = () => {
    return Math.floor(Math.random() * rotationAmount*2+1) - rotationAmount;
};

const featuredProjects: ProjectCard[] = [
    { name: "PortFoliov3", "image": "/images/projects/Portfoliov3.png", description: "A modern portfolio website built with React and TypeScript.", rotation: getRandomRotation()},
    { name: "GeoSim", "image": "/images/projects/GeoSim.png", description: "A geographic information system for simulating real-world scenarios.Made using React and TypeScript.", rotation: getRandomRotation()},
    { name: "MusicPi", "image": "/images/projects/MusicPi.png", description: "A music player for the Raspberry Pi, with a focus on audio quality. Made using Rust and Raspberry Pi OS.", rotation: getRandomRotation()},
]

const Projects = () => {
    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-20 mt-20 max-w-300">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-bold mb-5">Projects</h1>
                    <p className="text-lg font-medium">As a developer, I&apos;ve worked with a wide range of technologies across different domains.</p>
                    <p className="text-lg font-medium">Below are the key projects I&apos;ve worked on throughout my journey,</p>
                    <p className="text-lg font-medium">showcasing both my proficiency level and years of experience with each technology.</p>
                </div>
                <div>
                    <ProjectSwiper projects={featuredProjects} />
                </div>
            </div>
        </div>
    )
}

export default Projects;
