import React, { useState } from 'react';
import repoImages from '../../../data/repo-images.json';
import { Repository } from '@/src/types/githubRepos/githubRepos';

interface RepoCardProps {
    repo: Repository;
}

const RepoCard = ({ repo }: RepoCardProps) => {
    const [showModal, setShowModal] = useState(false);

    // Helper function to get image URL for a repository
    const getRepoImage = (repoName: string) => {
        return (repoImages as Record<string, string>)[repoName] || null;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getLanguageColor = (language: string) => {
        const colors: Record<string, string> = {
            JavaScript: '#f7df1e',
            TypeScript: '#3178c6',
            HTML: '#e34c26',
            CSS: '#563d7c',
            Python: '#3572A5',
            Java: '#b07219',
            Ruby: '#701516',
            PHP: '#4F5D95',
            Go: '#00ADD8',
            Rust: '#dea584',
            // Add more languages as needed
        };
        return colors[language] || '#8e8e8e';
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const repoImage = getRepoImage(repo.name);
    console.log(repo.name);

    return (
        <>
            <div className="repo-card" onClick={openModal}>
                <div className="repo-image-container">
                    {repoImage && (
                        <img
                            src={repoImage}
                            alt={`${repo.name} project screenshot`}
                            className="repo-image"
                        />
                    )}
                </div>
                <div className="repo-header">
                    <div className="repo-logo">
                        <img src="https://github.githubassets.com/favicons/favicon.svg" alt="GitHub Logo" />
                    </div>
                    <h3 className="repo-name">{repo.name}</h3>
                </div>
                <div className="repo-info">
                    <p className="repo-description">{repo.description || "No description available"}</p>
                    <div className="repo-language">
                        <span
                            className="language-dot"
                            style={{ backgroundColor: repo.language ? getLanguageColor(repo.language) : '#cccccc' }}
                        ></span>
                        <span>{repo.language || "No language"}</span>
                    </div>
                    <div className="repo-stats">
                        <span>⭐ {repo.stargazers_count}</span>
                        <span>🍴 {repo.forks_count}</span>
                    </div>
                    <div className="repo-updated">
                        Updated: {formatDate(repo.updated_at)}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="repo-modal-overlay">
                    <div className="repo-modal">
                        <div className="modal-header">
                            <h2>{repo.name}</h2>
                            <button className="close-button" onClick={closeModal}>×</button>
                        </div>

                        <div className="modal-content">
                            {repoImage && (
                                <div className="modal-section">
                                    <div className="modal-image-container">
                                        <img
                                            src={repoImage}
                                            alt={`${repo.name} project screenshot`}
                                            className="modal-image"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="modal-section">
                                <h3>Description</h3>
                                <p>{repo.description || "No description available"}</p>
                            </div>

                            <div className="modal-section">
                                <h3>Stats</h3>
                                <ul className="modal-stats">
                                    <li><strong>Stars:</strong> {repo.stargazers_count}</li>
                                    <li><strong>Forks:</strong> {repo.forks_count}</li>
                                    <li><strong>Watchers:</strong> {repo.watchers_count}</li>
                                    <li><strong>Open Issues:</strong> {repo.open_issues_count}</li>
                                    <li><strong>Size:</strong> {Math.round(repo.size / 1024 * 10) / 10} MB</li>
                                </ul>
                            </div>

                            <div className="modal-section repo-dates">
                                <div>
                                    <h3>Created</h3>
                                    <p>{formatDate(repo.created_at)}</p>
                                </div>
                                <div>
                                    <h3>Last Updated</h3>
                                    <p>{formatDate(repo.updated_at)}</p>
                                </div>
                                <div>
                                    <h3>Last Pushed</h3>
                                    <p>{formatDate(repo.pushed_at)}</p>
                                </div>
                            </div>

                            {repo.language && (
                                <div className="modal-section">
                                    <h3>Main Language</h3>
                                    <div className="modal-language">
                                        <span
                                            className="language-dot"
                                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                                        ></span>
                                        <span>{repo.language}</span>
                                    </div>
                                </div>
                            )}

                            <div className="modal-section">
                                <h3>Links</h3>
                                <div className="modal-links">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-button">
                                        View on GitHub
                                    </a>
                                    {repo.homepage && (
                                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="repo-button">
                                            Visit Homepage
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RepoCard;
