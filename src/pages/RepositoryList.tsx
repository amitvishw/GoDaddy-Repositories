import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchRepositories } from "../services/github";
import ShimmerCard from "../components/ShimmerCard";
import ErrorMessage from "../components/ErrorMessage";
import RepoCard from "../components/RepositoryCard";

const RepositoryList = () => {
  const {
    data: repositories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["repositories"],
    queryFn: fetchRepositories,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-min items-stretch"
    >
      {isLoading &&
        Array(6)
          .fill(1)
          .map(() => <ShimmerCard />)}
      {repositories?.map((repository) => (
        <RepoCard key={repository.id} repository={repository} />
      ))}
    </motion.div>
  );
};

export default RepositoryList;
