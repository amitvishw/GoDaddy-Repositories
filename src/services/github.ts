import { GitHubRepository } from "../types/github";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRepositories = async (): Promise<GitHubRepository[]> => {
  const response = await fetch(`${BASE_URL}/orgs/godaddy/repos`);
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }
  return response.json();
};

export const fetchRepositoryDetails = async (
  repoName: string,
): Promise<GitHubRepository> => {
  const response = await fetch(`${BASE_URL}/repos/godaddy/${repoName}`);
  if (!response.ok) {
    throw new Error("Repository not found");
  }
  return response.json();
};

export const fetchDataByUrl = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
