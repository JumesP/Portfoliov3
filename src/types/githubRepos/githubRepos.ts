export interface Repository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    homepage: string | null;
    description: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    size: number;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    fork: boolean;
    language: string | null;
}
