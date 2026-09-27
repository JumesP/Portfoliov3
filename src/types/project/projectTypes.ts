export interface ProjectCard {
    name: string;
    image: string;
    rotation: number;
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    fork: boolean;
    language: string | null;
    topics: string[];
    stargazers_count: number;
    watchers_count: number;
    default_branch: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
};
