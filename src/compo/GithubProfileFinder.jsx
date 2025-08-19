import React, { useState } from "react";
import { Search, Users, Repeat, Package, Rocket, Star, GitFork } from "lucide-react";

export default function GithubProfileFinder() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch profile data
  const fetchProfile = async (e) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userRes.json();

      if (userData.message === "Not Found") {
        setProfile(null);
        setRepos([]);
        setLoading(false);
        return alert("⚠️ User not found!");
      }

      setProfile(userData);

      const repoRes = await fetch(userData.repos_url);
      const repoData = await repoRes.json();

      // Sort repos by stars ⭐
      const sortedRepos = repoData
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 9);

      setRepos(sortedRepos);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
    setLoading(false);
  };

  // ✅ Profile Card
  const ProfileCard = () =>
    profile && (
      <div className="relative p-8 text-center bg-gradient-to-br from-[#111]/90 to-[#1a1a1a]/95 
        backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 
        transition-all duration-500 hover:shadow-purple-500/40">
        
        {/* Avatar with glow ring */}
        <div className="relative w-32 h-32 mx-auto">
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl animate-pulse opacity-40"></span>
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-32 h-32 rounded-full border-4 border-cyan-400/70 
            shadow-lg relative z-10 hover:scale-110 transition-transform duration-500"
          />
        </div>

        <h2 className="text-3xl font-extrabold mt-4 text-white drop-shadow">
          {profile.name}
        </h2>
        <p className="text-cyan-400">@{profile.login}</p>
        <p className="mt-2 text-gray-300 italic max-w-lg mx-auto">{profile.bio}</p>

        <div className="flex flex-wrap justify-center gap-6 mt-6 text-emerald-300 font-semibold">
          <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
            <Users size={18} /> {profile.followers} Followers
          </span>
          <span className="flex items-center gap-1 hover:text-purple-400 transition-colors">
            <Repeat size={18} /> {profile.following} Following
          </span>
          <span className="flex items-center gap-1 hover:text-pink-400 transition-colors">
            <Package size={18} /> {profile.public_repos} Repos
          </span>
        </div>
      </div>
    );

  // ✅ Repo Grid
  const RepoList = () =>
    repos.length > 0 && (
      <div className="p-4 sm:p-6">
        <h3 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow">
          🚀 Top Repositories
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#111]/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10 
              hover:scale-105 hover:-rotate-1 hover:shadow-lg hover:shadow-cyan-500/30 
              transition-all duration-500 group"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-lg text-cyan-400 group-hover:text-purple-300 transition-colors"
              >
                {repo.name}
              </a>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {repo.description || "No description provided"}
              </p>
              <div className="flex gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={14} className="text-pink-400" /> {repo.forks_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0f] to-[#111] p-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <SearchBar
          query={username}
          setQuery={setUsername}
          handleSearch={fetchProfile}
          loading={loading}
        />
        <div className="mt-12 space-y-12 animate-fadeIn">
          {loading && <Spinner />}
          {!loading && !profile && (
            <p className="text-center text-gray-400 italic text-lg flex justify-center items-center gap-2">
              <Search size={18} className="text-cyan-400" /> Search for a GitHub
              profile to see details...
            </p>
          )}
          <ProfileCard />
          <RepoList />
        </div>
      </div>
    </div>
  );
}

// ✅ SearchBar Component
function SearchBar({ query, setQuery, handleSearch, loading }) {
  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter GitHub username..."
        className="w-full pl-12 pr-20 py-3 rounded-full border border-white/10 
        focus:outline-none focus:ring-4 focus:ring-purple-500/50 
        text-white placeholder-gray-500 bg-[#1A1A1A]/70 backdrop-blur-xl
        transition-all duration-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
      />
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      {loading ? (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-6 h-6 border-2 border-transparent border-t-cyan-400 border-l-purple-400 rounded-full animate-spin"></div>
        </div>
      ) : (
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 
          hover:from-purple-500 hover:to-cyan-500 text-white px-6 py-1.5 rounded-full text-sm font-semibold
          transition-all shadow-md hover:shadow-purple-500/40 active:scale-95"
        >
          Go
        </button>
      )}
    </form>
  );
}

// ✅ Spinner Component
function Spinner() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-16 h-16 border-4 border-transparent border-t-cyan-400 border-l-purple-400 rounded-full animate-spin shadow-lg"></div>
    </div>
  );
}
