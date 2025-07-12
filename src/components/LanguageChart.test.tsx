import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Languages } from "../types/github";
import LanguageChart from "./LanguageChart";

describe("LanguageChart", () => {
  const mockLanguages: Languages = {
    JavaScript: 15000,
    TypeScript: 8000,
    Python: 5000,
    CSS: 2000,
  };

  const emptyLanguages: Languages = {};

  describe("Loading State", () => {
    it("renders shimmer when loading", () => {
      render(<LanguageChart isLoading={true} languages={emptyLanguages} />);

      expect(screen.getByTestId("language-chart")).toBeInTheDocument();
      expect(screen.getByTestId("language-chart-loading")).toBeInTheDocument();
    });

    it("does not render content when loading", () => {
      render(<LanguageChart isLoading={true} languages={mockLanguages} />);

      expect(
        screen.queryByTestId("language-chart-title"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("language-progress-bar"),
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("language-list")).not.toBeInTheDocument();
    });
  });

  describe("Loaded State with Data", () => {
    it("renders title and content when not loading", () => {
      render(<LanguageChart isLoading={false} languages={mockLanguages} />);

      expect(screen.getByTestId("language-chart-title")).toBeInTheDocument();
      expect(screen.getByText("Languages")).toBeInTheDocument();
      expect(screen.getByTestId("language-progress-bar")).toBeInTheDocument();
      expect(screen.getByTestId("language-list")).toBeInTheDocument();
    });

    it("does not render shimmer when not loading", () => {
      render(<LanguageChart isLoading={false} languages={mockLanguages} />);

      expect(
        screen.queryByTestId("language-chart-shimmer"),
      ).not.toBeInTheDocument();
    });

    it("renders all languages in the list", () => {
      render(<LanguageChart isLoading={false} languages={mockLanguages} />);

      const languageNames = Object.keys(mockLanguages);

      languageNames.forEach((lang) => {
        expect(
          screen.getByTestId(`language-item-${lang.toLowerCase()}`),
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(`language-name-${lang.toLowerCase()}`),
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(`language-dot-${lang.toLowerCase()}`),
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(`language-percentage-${lang.toLowerCase()}`),
        ).toBeInTheDocument();
        expect(
          screen.getByTestId(`language-bar-${lang.toLowerCase()}`),
        ).toBeInTheDocument();
      });
    });

    it("displays correct language names", () => {
      render(<LanguageChart isLoading={false} languages={mockLanguages} />);

      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.getByText("CSS")).toBeInTheDocument();
    });

    it("calculates and displays correct percentages", () => {
      render(<LanguageChart isLoading={false} languages={mockLanguages} />);
      expect(screen.getByText("50.0%")).toBeInTheDocument();
      expect(screen.getByText("26.7%")).toBeInTheDocument();
      expect(screen.getByText("16.7%")).toBeInTheDocument();
      expect(screen.getByText("6.7%")).toBeInTheDocument();
    });

    it("sets correct width styles for progress bars", () => {
      render(<LanguageChart isLoading={false} languages={mockLanguages} />);

      const jsBar = screen.getByTestId("language-bar-javascript");
      const tsBar = screen.getByTestId("language-bar-typescript");

      expect(jsBar).toHaveStyle("width: 50%");
      expect(tsBar).toHaveStyle("width: 26.666666666666668%");
    });

    it("adds title attribute to progress bars", () => {
      render(<LanguageChart isLoading={false} languages={mockLanguages} />);

      const jsBar = screen.getByTestId("language-bar-javascript");
      expect(jsBar).toHaveAttribute("title", "JavaScript: 50.0%");
    });
  });

  describe("Edge Cases", () => {
    it("handles single language correctly", () => {
      const singleLanguage: Languages = { JavaScript: 1000 };
      render(<LanguageChart isLoading={false} languages={singleLanguage} />);

      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("100.0%")).toBeInTheDocument();

      const jsBar = screen.getByTestId("language-bar-javascript");
      expect(jsBar).toHaveStyle("width: 100%");
    });

    it("handles languages with zero bytes", () => {
      const languagesWithZero: Languages = {
        JavaScript: 1000,
        TypeScript: 0,
      };
      render(<LanguageChart isLoading={false} languages={languagesWithZero} />);

      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("100.0%")).toBeInTheDocument();
      expect(screen.getByText("0.0%")).toBeInTheDocument();
    });
  });
});
