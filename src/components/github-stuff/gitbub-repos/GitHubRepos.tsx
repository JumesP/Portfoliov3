import React from "react";
// import GithubStats from "../component/organisms/github_stats";
import RepositoryList from "../repo-list/RepositoryList";

const GithubRepos = () => {
	const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "JumesP";
	const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN || null;

	return (
		<div className="projects-container">
			<h1>My Projects</h1>
			<p className="intro">
				Here you can explore my GitHub repositories and see what I've been working on.
				The data below is pulled directly from GitHub to show my latest activity.
			</p>

			{/* GitHub Stats Component */}
            <h2>GitHub Analytics</h2>
            {/* <GithubStats username={githubUsername} token={githubToken} /> */}

			{/* Repository List Component */}
            <h2>GitHub Repositories</h2>
            {githubToken && (<RepositoryList githubUsername={githubUsername} githubToken={githubToken} />)}
		</div>
	);
};

export default GithubRepos;
