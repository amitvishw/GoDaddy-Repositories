import { motion } from "framer-motion";
import {
  Star,
  GitFork,
  AlertCircle,
  Calendar,
  ExternalLink,
  Archive,
} from "lucide-react";
import { Link } from "react-router-dom";
import { GitHubRepository } from "../types/github";
import { getLanguageBgColor, formatDate } from "../utils/utils";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.04 }}
      className="h-full"
    >
      <div className="h-full p-6 rounded-xl shadow-lg bg-gray-950 border border-gray-900 hover:shadow-xl transition-shadow duration-300">
        <Link to={`/repo/${repository.name}`} className="h-full">
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-300">
                    {repository.owner.login}
                  </p>
                </div>
              </div>
              {repository.archived && (
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs text-gray-700">
                  <Archive className="w-3 h-3" />
                  <span>Archived</span>
                </div>
              )}
            </div>
            <div className="mb-3">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-600 transition-colors duration-200 flex items-center">
                  {repository.name}
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </a>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {repository.description}
            </p>
            <div className="flex items-center space-x-4 mb-4">
              {repository.language && (
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getLanguageBgColor(
                      repository.language,
                    )}`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {repository.language}
                  </span>
                </div>
              )}
              {repository.license && (
                <div className="text-sm text-gray-600">
                  {repository.license.name}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {repository.stargazers_count}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <GitFork className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {repository.forks_count}
                  </span>
                </div>
                {repository.open_issues_count > 0 && (
                  <div className="flex items-center space-x-1 text-gray-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {repository.open_issues_count}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {(repository.size / 1024).toFixed(1)} MB
              </div>
            </div>
            <div className="border-t border-gray-900 pt-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created {formatDate(repository.created_at)}</span>
                </div>
                <div>Updated {formatDate(repository.updated_at)}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default RepositoryCard;
