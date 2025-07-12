import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RepositoryCard from "./RepositoryCard";
import { BrowserRouter } from "react-router-dom";

const mockRepository: any = {
  id: 1,
  name: "test-repository",
  description: "A comprehensive test repository for unit testing",
  html_url: "https://github.com/testuser/test-repository",
  stargazers_count: 150,
  forks_count: 45,
  open_issues_count: 8,
  size: 2048,
  language: "JavaScript",
  license: {
    name: "MIT",
    key: "mit",
  },
  created_at: "2023-01-15T10:30:00Z",
  updated_at: "2023-12-10T14:45:00Z",
  archived: true,
  owner: {
    login: "testuser",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
  },
};

const renderWithRouter = (component: any) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("RepositoryCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render repository card with all basic information", () => {
      renderWithRouter(<RepositoryCard repository={mockRepository} />);

      const internalLink = screen.getAllByRole("link")[0];
      const externalLink = screen.getAllByRole("link")[1];
      const avatar = screen.getByAltText("testuser");
      expect(screen.getByText("test-repository")).toBeInTheDocument();
      expect(
        screen.getByText("A comprehensive test repository for unit testing"),
      ).toBeInTheDocument();
      expect(screen.getByText("testuser")).toBeInTheDocument();
      expect(internalLink).toHaveAttribute("href", "/repo/test-repository");
      expect(screen.getByText("Archived")).toBeInTheDocument();
      expect(screen.getByText("MIT")).toBeInTheDocument();
      expect(screen.queryByText("Archived")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("8")).toBeInTheDocument();
      expect(screen.getByText("150")).toBeInTheDocument();
      expect(screen.getByText("45")).toBeInTheDocument();
      expect(screen.getByText("2.0 MB")).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute(
        "src",
        "https://avatars.githubusercontent.com/u/123456?v=4",
      );
      expect(externalLink).toHaveAttribute(
        "href",
        "https://github.com/testuser/test-repository",
      );
    });
  });
});
