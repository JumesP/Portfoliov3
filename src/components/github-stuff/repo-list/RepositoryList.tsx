import React, { useState, useEffect } from 'react';
import RepoCard from '../repo-card/RepoCard';
import { Repository } from '@/src/types/githubRepos/githubRepos';

interface RepositoryListProps {
    githubUsername: string;
    githubToken: string;
}

const RepositoryList = ({ githubUsername, githubToken }: RepositoryListProps) => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchRepositories = async () => {
            if (!githubUsername) {
                setError("GitHub username not configured");
                setLoading(false);
                return;
            }

            try {
                // Prepare headers with token if available
                const headers: HeadersInit = {};
                if (githubToken) {
                    headers.Authorization = `token ${githubToken}`;
                }

                const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=pushed`, { headers });

                if (!response.ok) {
                    throw new Error(`Failed to fetch repositories (${response.status})`);
                }

                const data: Repository[] = await response.json();

                // Filter out forks if needed
                const nonForkedRepos = data.filter((repo: Repository) => !repo.fork);

                // Extract unique languages for filters
                const languages = [...new Set(nonForkedRepos.map(repo => repo.language).filter(Boolean))];

                setRepos(nonForkedRepos);
                setFilteredRepos(nonForkedRepos);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [githubUsername, githubToken]);

    return (
        <div className="repository-list">
            {loading && <p>Loading repositories...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && (
                <div>
                    <p>Showing {filteredRepos.length} repositories</p>
                    {filteredRepos.map(repo => (
                        <RepoCard key={repo?.id} repo={repo} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RepositoryList;
