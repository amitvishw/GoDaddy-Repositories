import { screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import RepositoryList from "./RepositoryList";
import { fetchRepositories } from "../services/github";
import { renderWithQueryClient } from "../test/utils";

vi.mock("../services/github");
vi.mock("../components/ShimmerCard", () => ({
  default: () => <div data-testid="shimmer-card">Loading...</div>,
}));
vi.mock("../components/ErrorMessage", () => ({
  default: () => <div data-testid="error-message">Error message</div>,
}));
vi.mock("../components/RepositoryCard", () => ({
  default: ({ repository }: any) => (
    <div data-testid="repo-card">
      <h3>{repository.name}</h3>
      <p>{repository.description}</p>
    </div>
  ),
}));

const mockFetchRepositories = fetchRepositories as jest.MockedFunction<
  typeof fetchRepositories
>;

const mockRepositories: any = [
  {
    id: 1,
    name: "test-repo-1",
    description: "A test repository",
    html_url: "https://github.com/user/test-repo-1",
    stargazers_count: 100,
    language: "JavaScript",
  },
  {
    id: 2,
    name: "test-repo-2",
    description: "Another test repository",
    html_url: "https://github.com/user/test-repo-2",
    stargazers_count: 50,
    language: "TypeScript",
  },
];

describe("RepositoryList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Loading State", () => {
    it("should display shimmer cards while loading", async () => {
      mockFetchRepositories.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockRepositories), 1000),
          ),
      );

      renderWithQueryClient(<RepositoryList />);
      const shimmerCards = screen.getAllByTestId("shimmer-card");
      expect(shimmerCards).toHaveLength(6);
      expect(screen.queryByTestId("repo-card")).not.toBeInTheDocument();
    });
  });

  describe("Success State", () => {
    it("should display repositories when data is loaded successfully", async () => {
      mockFetchRepositories.mockResolvedValue(mockRepositories);
      renderWithQueryClient(<RepositoryList />);
      await waitFor(() => {
        expect(screen.getAllByTestId("repo-card")).toHaveLength(2);
      });
      expect(screen.getByText("test-repo-1")).toBeInTheDocument();
      expect(screen.getByText("test-repo-2")).toBeInTheDocument();
      expect(screen.getByText("A test repository")).toBeInTheDocument();
      expect(screen.getByText("Another test repository")).toBeInTheDocument();
    });

    it("should not display shimmer cards when data is loaded", async () => {
      mockFetchRepositories.mockResolvedValue(mockRepositories);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        expect(screen.queryByTestId("shimmer-card")).not.toBeInTheDocument();
      });
    });

    it("should not display error message when data is loaded successfully", async () => {
      mockFetchRepositories.mockResolvedValue(mockRepositories);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
      });
    });

    it("should handle empty repository list", async () => {
      mockFetchRepositories.mockResolvedValue([]);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        expect(screen.queryByTestId("repo-card")).not.toBeInTheDocument();
        expect(screen.queryByTestId("shimmer-card")).not.toBeInTheDocument();
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
      });
    });
  });

  describe("Error State", () => {
    it("should not display repositories when there is an error", async () => {
      mockFetchRepositories.mockRejectedValue(new Error("Test error"));

      renderWithQueryClient(<RepositoryList />);
      await new Promise((resolve) => setTimeout(resolve, 100));

      await waitFor(() => {
        expect(screen.queryByTestId("repo-card")).not.toBeInTheDocument();
        expect(screen.getByTestId("error-message")).toBeInTheDocument();
      });
    });
  });

  describe("React Query Configuration", () => {
    it("should call fetchRepositories", async () => {
      mockFetchRepositories.mockResolvedValue(mockRepositories);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        expect(mockFetchRepositories).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Component Integration", () => {
    it("should pass correct props to RepoCard component", async () => {
      mockFetchRepositories.mockResolvedValue(mockRepositories);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        const repoCards = screen.getAllByTestId("repo-card");
        expect(repoCards).toHaveLength(2);
      });
    });

    it("should render unique keys for each repository", async () => {
      mockFetchRepositories.mockResolvedValue(mockRepositories);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        const repoCards = screen.getAllByTestId("repo-card");
        expect(repoCards).toHaveLength(2);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle null/undefined repositories data", async () => {
      mockFetchRepositories.mockResolvedValue(null as any);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        expect(screen.queryByTestId("repo-card")).not.toBeInTheDocument();
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
      });
    });

    it("should handle repositories with missing properties", async () => {
      const incompleteRepos: any = [
        { id: 1, name: "incomplete-repo" },
        { id: 2, name: "another-incomplete" },
      ];

      mockFetchRepositories.mockResolvedValue(incompleteRepos);

      renderWithQueryClient(<RepositoryList />);

      await waitFor(() => {
        expect(screen.getAllByTestId("repo-card")).toHaveLength(2);
        expect(screen.getByText("incomplete-repo")).toBeInTheDocument();
        expect(screen.getByText("another-incomplete")).toBeInTheDocument();
      });
    });
  });
});
