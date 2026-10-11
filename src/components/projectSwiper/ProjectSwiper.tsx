"use client"
import React, { useState } from 'react'
import { GitHubRepo, ProjectCard } from "@/src/types/project/projectTypes";
import repoImagesJson from "@/src/data/repo-images.json";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const repoImages: Record<string, string> = repoImagesJson;

type ProjectView = ProjectCard & Partial<GitHubRepo>;

const ProjectModal = ({ project, onClose }: { project: ProjectView; onClose: () => void }) => {
    const repoDetails = project as Partial<GitHubRepo>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                >
                    Close
                </button>

                <div className="mt-10 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                    <img src={project.image} alt={project.name} className="h-64 w-full rounded-lg object-cover" />

                    {project.description && (
                        <p className="text-sm text-gray-700">{project.description}</p>
                    )}

                    <div className="grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                        {repoDetails.full_name && <p><span className="font-semibold">Repo:</span> {repoDetails.full_name}</p>}
                        {repoDetails.language && <p><span className="font-semibold">Language:</span> {repoDetails.language}</p>}
                        {repoDetails.default_branch && <p><span className="font-semibold">Default branch:</span> {repoDetails.default_branch}</p>}
                        {repoDetails.stargazers_count !== undefined && <p><span className="font-semibold">Stars:</span> {repoDetails.stargazers_count}</p>}
                        {repoDetails.watchers_count !== undefined && <p><span className="font-semibold">Watchers:</span> {repoDetails.watchers_count}</p>}
                        {repoDetails.updated_at && <p><span className="font-semibold">Updated:</span> {new Date(repoDetails.updated_at).toLocaleDateString()}</p>}
                    </div>

                    {repoDetails.html_url && (
                        <a
                            href={repoDetails.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            View on GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProjectSwiper = ({ projects }: { projects: ProjectCard[]; repos?: GitHubRepo[] | null }) => {

    const [cards, setCards] = useState<ProjectView[]>([...projects].reverse());
    const [selectedProject, setSelectedProject] = useState<ProjectView | null>(null);
    const [exitingCard, setExitingCard] = useState<{
        index: number;
        direction: "left" | "right";
    } | null>(null);

    const transform: string = `hover:rotate-0 hover:-translate-y-1`
    const animation: string = `transition-transform duration-2000 ease-in-out hover:-translate-y-2 hover:scale-110`
    const textBackground: string = `bg-gradient-to-b from-transparent via-gray-200/30 to-transparent`;

    const getExitAnimation = (exitDirection: "left" | "right") => {
        if (exitDirection === "right") {
            return "translate-x-[150vw] rotate-[45deg]";
        }

        if (exitDirection === "left") {
            return "-translate-x-[150vw] rotate-[-45deg]";
        }

        return "";
    };

    const handleLike = (index: number) => {
        setExitingCard({
            index,
            direction: "right",
        });

        setTimeout(() => {
            setCards(prev => prev.filter((_, i) => i !== index));
            setExitingCard(null);
        }, 500);
    };

    const handleDislike = (index: number) => {
        setExitingCard({
            index,
            direction: "left",
        });

        setTimeout(() => {
            setCards(prev => prev.filter((_, i) => i !== index));
            setExitingCard(null);
        }, 500);
    };

    return (
        <div className="container relative flex flex-col justify-center items-center bg-[#73946B] p-4 mb-24 rounded-xl w-250 h-200">
            {cards.map((card, index) => {
                const isExiting = exitingCard?.index === index;
                const exitAnimation = isExiting ? getExitAnimation(exitingCard.direction) : "";
                const imageShape: string = repoImages[card.name.toLowerCase()] ? "object-scale-down" : "object-cover";


                return (
                    <div
                        key={`${card.name}-${index}`}
                        className={`absolute animate-[cardDrop_1s_cubic-bezier(0.22,1,0.36,1)_both]`}
                        style={{ animationDelay: `${index * 250}ms` }}
                    >
                        <div
                            key={index}
                            className={`project-card aspect-4/3 w-160 ${transform} ${animation} ${exitAnimation} bg-[#537D5D]`}
                            style={{ "--rotation": `${card.rotation}deg` } as React.CSSProperties}
                        >
                            <img src={card.image} alt={card.name} className={`h-full w-full rounded-xl ${imageShape}`} />
                            <p className="absolute bottom-20 left-1/2 w-4/5 -translate-x-1/2 text-center text-sm text-black/80">
                                {card.description}
                            </p>
                            <p className={`absolute bottom-5 left-1/2 -translate-x-1/2 text-black font-semibold h-16 flex items-center justify-center ${textBackground} p-3`}>
                                {card.name}
                            </p>

                            <button
                                onClick={() => setSelectedProject(card)}
                                className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white hover:bg-black/80"
                            >
                                Details
                            </button>

                            <button onClick={() => handleLike(index)}
                                className="absolute bottom-5 right-5 border-green-600 bg-green-700/40 border-2 w-16 h-16 rounded-4xl cursor-pointer hover:bg-green-700/80 flex justify-center items-center">
                                <FaCheck className="text-green-600 text-xl" />
                            </button>
                            <button onClick={() => handleDislike(index)}
                                className="absolute bottom-5 left-5 border-red-600 bg-red-700/40 border-2 w-16 h-16 rounded-4xl cursor-pointer hover:bg-red-700/60 flex justify-center items-center">
                                <ImCross className="text-red-600 text-xl" />
                            </button>
                        </div>
                    </div>
                )
            })}

            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}

            {cards.length === 0 && (
                <p>out of projects...</p>
            )}
        </div>
    )
}

export default ProjectSwiper;
