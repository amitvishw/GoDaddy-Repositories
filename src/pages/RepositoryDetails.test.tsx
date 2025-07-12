import { screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { fetchDataByUrl, fetchRepositoryDetails } from "../services/github";
import { renderWithRouter } from "../test/utils";
import RepositoryDetails from "./RepositoryDetails";

vi.mock("../services/github");

const mockFetchRepositoryDetails =
  fetchRepositoryDetails as jest.MockedFunction<typeof fetchRepositoryDetails>;
const mockFetchDataByUrl = fetchDataByUrl as jest.MockedFunction<
  typeof fetchDataByUrl
>;

const mockRepository: any = {
  id: 1,
  name: "test-repo",
  description: "A test repository for unit testing",
  html_url: "https://github.com/user/test-repo",
  stargazers_count: 100,
  forks_count: 50,
  watchers_count: 25,
  subscribers_count: 10,
  size: 1024,
  open_issues_count: 5,
  language: "JavaScript",
  license: { name: "MIT" },
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-12-01T00:00:00Z",
  pushed_at: "2023-12-15T00:00:00Z",
  archived: false,
  owner: {
    login: "testuser",
    avatar_url: "https://github.com/testuser.png",
  },
  languages_url: "https://api.github.com/repos/user/test-repo/languages",
  contributors_url: "https://api.github.com/repos/user/test-repo/contributors",
  subscribers_url: "https://api.github.com/repos/user/test-repo/subscribers",
  clone_url: "https://github.com/user/test-repo.git",
  ssh_url: "git@github.com:user/test-repo.git",
  git_url: "git://github.com/user/test-repo.git",
};

const mockLanguages = {
  JavaScript: 75000,
  TypeScript: 25000,
  CSS: 5000,
};

const mockUsers = [
  { login: "contributor1", avatar_url: "https://github.com/contributor1.png" },
  { login: "contributor2", avatar_url: "https://github.com/contributor2.png" },
];

describe("RepositoryDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Loading States", () => {
    it("should display repository shimmer while loading repository data", () => {
      mockFetchRepositoryDetails.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockRepository), 1000),
          ),
      );
      window.history.pushState({}, "Test", "/repo/test-repo");
      renderWithRouter(<RepositoryDetails />);

      expect(screen.getByTestId("repository-shimmer")).toBeInTheDocument();
    });
  });

  describe("Error States", () => {
    it("should display error message when repository fetch fails", async () => {
      mockFetchRepositoryDetails.mockRejectedValue(
        new Error("Repository not found"),
      );

      window.history.pushState({}, "Test", "/repo/test-repo");
      renderWithRouter(<RepositoryDetails />);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await waitFor(() => {
        expect(screen.getByTestId("error-message")).toBeInTheDocument();
      });
    });

    it("should display error message when repository is null", async () => {
      mockFetchRepositoryDetails.mockResolvedValue(null as any);

      window.history.pushState({}, "Test", "/repo/test-repo");
      renderWithRouter(<RepositoryDetails />);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await waitFor(() => {
        expect(screen.getByTestId("error-message")).toBeInTheDocument();
      });
    });
  });

  describe("Success State - Repository Information", () => {
    beforeEach(async () => {
      mockFetchRepositoryDetails.mockResolvedValue(mockRepository);
      mockFetchDataByUrl
        .mockResolvedValueOnce(mockLanguages)
        .mockResolvedValueOnce(mockUsers)
        .mockResolvedValueOnce(mockUsers);

      window.history.pushState({}, "Test", "/repo/test-repo");
      renderWithRouter(<RepositoryDetails />);

      await waitFor(() => {
        expect(screen.getByText("test-repo")).toBeInTheDocument();
      });
    });

    it("should display repository header information", () => {
      expect(screen.getByText("test-repo")).toBeInTheDocument();
      expect(
        screen.getByText("A test repository for unit testing"),
      ).toBeInTheDocument();
      expect(screen.getByText("100 stars")).toBeInTheDocument();
      expect(screen.getByText("50 forks")).toBeInTheDocument();
      expect(screen.getByText("25 watchers")).toBeInTheDocument();
      expect(screen.getByText("10 subscribers")).toBeInTheDocument();
    });

    it("should display owner avatar and link", () => {
      const avatar = screen.getByAltText("testuser");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "https://github.com/testuser.png");

      const repoLink = screen.getByRole("link");
      expect(repoLink).toHaveAttribute(
        "href",
        "https://github.com/user/test-repo",
      );
    });

    it("should display repository statistics", () => {
      expect(screen.getByText("1024")).toBeInTheDocument();
      expect(screen.getByText("Repository Size (KB)")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("Open Issues")).toBeInTheDocument();
      expect(screen.getAllByText("JavaScript").length == 2);
      expect(screen.getByText("Primary Language")).toBeInTheDocument();
      expect(screen.getByText("MIT")).toBeInTheDocument();
      expect(screen.getByText("License")).toBeInTheDocument();
    });

    it("should display timeline information", () => {
      expect(screen.getByText("Created")).toBeInTheDocument();
      expect(screen.getByText("Last Updated")).toBeInTheDocument();
      expect(screen.getByText("Last Push")).toBeInTheDocument();
    });

    it("should render child components with correct props", () => {
      expect(screen.getByTestId("clone-url-card")).toBeInTheDocument();
      expect(screen.getByTestId("language-chart")).toBeInTheDocument();
      expect(screen.getAllByTestId("users-card").length == 2);
    });
  });
});
