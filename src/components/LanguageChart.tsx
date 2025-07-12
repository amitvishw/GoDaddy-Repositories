import { Code } from "lucide-react";
import { Languages } from "../types/github";
import { getLanguageBgColor } from "../utils/utils";
import ShimmerElement from "./ShimmerElement";

interface LanguageChartProps {
  isLoading: boolean;
  languages: Languages;
}

const LanguageChart = ({
  isLoading = true,
  languages = {},
}: LanguageChartProps) => {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const languageEntries = Object.entries(languages);
  return (
    <div
      className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900"
      data-testid="language-chart"
    >
      {isLoading ? (
        <div data-testid="language-chart-loading">
          <div className="flex items-center gap-2 mb-4">
            <ShimmerElement className="h-5 w-5 rounded" />
            <ShimmerElement className="h-6 w-28" />
          </div>
          <div className="space-y-3">
            <div className="space-y-3">
              {[...Array(2)].map((_, index) => (
                <div key={index}>
                  <ShimmerElement className="h-3 rounded-full mb-2" />
                  <ShimmerElement className="h-3 w-28 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3
            className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200"
            data-testid="language-chart-title"
          >
            <Code className="w-5 h-5" />
            Languages
          </h3>
          <div className="space-y-4">
            <div
              className="flex h-3 bg-gray-200 rounded-full overflow-hidden"
              data-testid="language-progress-bar"
            >
              {languageEntries.map(([lang, bytes]) => (
                <div
                  key={lang}
                  className={`transition-all duration-1000 ease-out ${getLanguageBgColor(
                    lang,
                  )}`}
                  style={{
                    width: `${(bytes / total) * 100}%`,
                  }}
                  data-testid={`language-bar-${lang.toLowerCase()}`}
                  title={`${lang}: ${((bytes / total) * 100).toFixed(1)}%`}
                />
              ))}
            </div>
            <div className="space-y-2" data-testid="language-list">
              {languageEntries.map(([lang, bytes]) => (
                <div
                  key={lang}
                  className="flex items-center justify-between text-sm"
                  data-testid={`language-item-${lang.toLowerCase()}`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getLanguageBgColor(
                        lang,
                      )}`}
                      data-testid={`language-dot-${lang.toLowerCase()}`}
                    />
                    <span
                      className="font-medium text-gray-200"
                      data-testid={`language-name-${lang.toLowerCase()}`}
                    >
                      {lang}
                    </span>
                  </div>
                  <span
                    className="text-gray-200"
                    data-testid={`language-percentage-${lang.toLowerCase()}`}
                  >
                    {((bytes / total) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageChart;
