import { useQuery } from "@tanstack/react-query";
import {
  Archive,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  GitFork,
  Star,
  Users,
} from "lucide-react";

import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import UsersCard from "../components/UserCard";
import { fetchDataByUrl, fetchRepositoryDetails } from "../services/github";
import { Languages, User } from "../types/github";
import { formatDate, getLanguageTextColor } from "../utils/utils";
import CloneUrlCard from "../components/CloneUrlCard";
import LanguageChart from "../components/LanguageChart";
import RepositoryShimmer from "../components/RepositoryShimmer";
import { motion } from "framer-motion";

const RepositoryDetails = ({}) => {
  const { repoName } = useParams<{ repoName: string }>();
  const {
    data: repository,
    error,
    isLoading: repositoryLoading,
  } = useQuery({
    queryKey: ["repository", repoName],
    queryFn: () => fetchRepositoryDetails(repoName!),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: languages, isLoading: languagesLoading } = useQuery({
    queryKey: ["languages", repository?.languages_url],
    queryFn: () => fetchDataByUrl<Languages>(repository!.languages_url),
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: {},
  });

  const { data: contributors, isLoading: contributorsLoading } = useQuery({
    queryKey: ["contributors", repository?.contributors_url],
    queryFn: () => fetchDataByUrl<User[]>(repository!.contributors_url),
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: [],
  });

  const { data: subscribers, isLoading: subscribersLoading } = useQuery({
    queryKey: ["subscribers", repository?.subscribers_url],
    queryFn: () => fetchDataByUrl<User[]>(repository!.subscribers_url),
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: [],
  });

  if (error) {
    return <ErrorMessage />;
  }

  if (repositoryLoading) {
    return <RepositoryShimmer />;
  }

  if (!repository) {
    return <ErrorMessage />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <img
            src={repository?.owner.avatar_url}
            alt={repository?.owner.login}
            className="w-16 h-16 rounded-full border-4 border-gray-950 shadow-lg"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center gap-2 mb-2">
              <div>
                <a
                  href={repository?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <h1 className="text-2xl font-bold text-gray-100 group-hover:text-blue-600 transition-colors duration-200 flex items-center">
                    {repository.name}
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h1>
                </a>
              </div>
              {repository.archived && (
                <div className="inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full text-gray-700">
                  <Archive className="w-4 h-4" />
                  Archived
                </div>
              )}
            </div>
            <p className="text-gray-200 mb-4">{repository.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {repository.stargazers_count} stars
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {repository.forks_count} forks
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {repository.watchers_count} watchers
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {repository.subscribers_count} subscribers
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-8 gap-4">
        <div className="md:col-span-5 space-y-6">
          <div className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-300">
              <FileText className="w-5 h-5" />
              Repository
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4">
                <div className="text-2xl font-bold text-blue-400">
                  {repository.size}
                </div>
                <div className="text-sm text-gray-300">
                  Repository Size (KB)
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-green-400">
                  {repository.open_issues_count}
                </div>
                <div className="text-sm text-gray-300">Open Issues</div>
              </div>
              <div className="p-4">
                <div
                  className={`text-2xl font-bold ${getLanguageTextColor(
                    repository.language || "",
                  )} `}
                >
                  {repository.language}
                </div>
                <div className="text-sm text-gray-300">Primary Language</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-orange-400">
                  {repository.license?.name || "No License"}
                </div>
                <div className="text-sm text-gray-300">License</div>
              </div>
            </div>
          </div>
          <UsersCard
            label="Contributors"
            isLoading={contributorsLoading}
            users={contributors}
          />
          <UsersCard
            label="Subscribers"
            isLoading={subscribersLoading}
            users={subscribers}
          />
        </div>
        <div className="md:col-span-3 space-y-6">
          <CloneUrlCard
            urls={{
              clone_url: repository.clone_url,
              ssh_url: repository.ssh_url,
              git_url: repository.git_url,
            }}
          />
          <LanguageChart isLoading={languagesLoading} languages={languages} />
          <div className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
              <Clock className="w-5 h-5" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-200">Created</div>
                  <div className="text-sm text-gray-300">
                    {formatDate(repository.created_at)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-200">Last Updated</div>
                  <div className="text-sm text-gray-300">
                    {formatDate(repository.updated_at)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <div>
                  <div className="font-medium text-gray-200">Last Push</div>
                  <div className="text-sm text-gray-300">
                    {formatDate(repository.pushed_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RepositoryDetails;
