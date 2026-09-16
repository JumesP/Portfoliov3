"use client"
import React, {useState, useEffect} from "react";
import ProjectSwiper from "@/src/components/projectSwiper/ProjectSwiper";
import {ProjectCard} from "@/src/types/project/projectTypes";

const rotationAmount = 12

const getRandomRotation = () => {
    return Math.floor(Math.random() * rotationAmount*2+1) - rotationAmount;
};

const featuredProjects: ProjectCard[] = [
    { name: "James Mart", "image": "images/projects/JamesMart.png", rotation: getRandomRotation()},
    { name: "Project2", "image": "https://images.unsplash.com/photo-1789348991835-b464f797fb2e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project3", "image": "https://images.unsplash.com/photo-1788771813083-1053f70233b5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project4", "image": "https://images.unsplash.com/photo-1789207051591-05b3c423cc14?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project5", "image": "https://images.unsplash.com/photo-1789348991835-b464f797fb2e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project6", "image": "https://images.unsplash.com/photo-1788771813083-1053f70233b5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project7", "image": "https://images.unsplash.com/photo-1789207051591-05b3c423cc14?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project8", "image": "https://images.unsplash.com/photo-1789348991835-b464f797fb2e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
    { name: "Project9", "image": "https://images.unsplash.com/photo-1788771813083-1053f70233b5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", rotation: getRandomRotation()},
]


const Projects = () => {
    const [projects, setProjects] = useState<ProjectCard[]>([]);


    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-20 mt-20 max-w-[1200px]">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-bold mb-5">Projects</h1>
                    <p className="text-lg font-medium">As a developer, I've worked with a wide range of technologies across different domains.</p>
                    <p className="text-lg font-medium">Below are the key projects I've worked on throughout my journey,</p>
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