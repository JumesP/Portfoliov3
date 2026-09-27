"use client"
import React, {useState, useEffect} from "react";
import ProjectSwiper from "@/src/components/projectSwiper/ProjectSwiper";
import { ProjectCard, GitHubRepo } from "@/src/types/project/projectTypes";
import repoImagesJson from "@/src/data/repo-images.json";
import GithubRepos from "@/src/components/github-stuff/gitbub-repos/GitHubRepos";

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

const repoImages: Record<string, string> = repoImagesJson;

const Projects = () => {
    const [projects, setProjects] = useState<ProjectCard[]>([]);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "JumesP";
	const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN || null;

    console.log("GitHub Username:", githubUsername, "GitHub Token:", githubToken ? "Configured" : "Not Configured");

    useEffect(() => {
        const fetchRepositories = async () => {
            if (!githubUsername) {
                setError("GitHub username not configured");
                setLoading(false);
                return;
            }

            try {
                const headers: Record<string, string> = {};
                if (githubToken) {
                    headers.Authorization = `token ${githubToken}`;
                }

                const response = await fetch(
                    `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=pushed`,
                    { headers }
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch repositories (${response.status})`);
                }

                const data = (await response.json()) as GitHubRepo[];
                const nonForkedRepos = data.filter((repo) => !repo.fork);
                const languages = [...new Set(nonForkedRepos.map((repo) => repo.language).filter((language): language is string => Boolean(language)))];

                const projectCards: ProjectCard[] = nonForkedRepos.map((repo) => ({
                    name: repo.name,
                    image: repoImages[repo.name.toLowerCase()] || `https://opengraph.githubassets.com/1/${githubUsername}/${repo.name}`,
                    rotation: getRandomRotation(),
                }));

                setProjects(projectCards);

                setRepos(nonForkedRepos);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch repositories");
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [githubUsername, githubToken]);


    return (
        <div className="MainContent flex flex-row justify-center">
            <div className="Content flex flex-col gap-20 mt-20 max-w-300">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-5xl font-bold mb-5">Projects</h1>
                    <p className="text-lg font-medium">As a developer, I've worked with a wide range of technologies across different domains.</p>
                    <p className="text-lg font-medium">Below are the key projects I've worked on throughout my journey,</p>
                    <p className="text-lg font-medium">showcasing both my proficiency level and years of experience with each technology.</p>
                </div>
                <div>
                    {loading && <p>Loading repositories...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && <ProjectSwiper projects={projects ? projects : featuredProjects} repos={repos} />}
                    {/* <GithubRepos /> */}
                </div>
            </div>
        </div>
    )
}

export default Projects;
