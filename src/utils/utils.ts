const LANGUAGE_CLASSES = {
  PHP: { bg: "bg-purple-500", text: "text-purple-500" },
  JavaScript: { bg: "bg-yellow-500", text: "text-yellow-500" },
  Python: { bg: "bg-blue-500", text: "text-blue-500" },
  Java: { bg: "bg-red-500", text: "text-red-500" },
  TypeScript: { bg: "bg-blue-600", text: "text-blue-600" },
  "C++": { bg: "bg-pink-500", text: "text-pink-500" },
  "C": { bg: "bg-pink-300", text: "text-pink-300" },
  "C#": { bg: "bg-green-500", text: "text-green-500" },
  Go: { bg: "bg-cyan-500", text: "text-cyan-500" },
  Rust: { bg: "bg-orange-500", text: "text-orange-500" },
  Swift: { bg: "bg-orange-600", text: "text-orange-600" },
  Perl: { bg: "bg-rose-600", text: "text-rose-600" },
  Ruby: { bg: "bg-red-600", text: "text-red-600" },
  Shell: { bg: "bg-green-300", text: "text-green-300" },
  "Objective-C":{ bg: "bg-blue-300", text: "text-blue-300" }
}

type Language = keyof typeof LANGUAGE_CLASSES;

export const getLanguageBgColor = (language: string) => {
  return LANGUAGE_CLASSES[language as Language]?.bg || "bg-gray-500";
};

export const getLanguageTextColor = (language: string) => {
  return LANGUAGE_CLASSES[language as Language]?.text || "text-gray-500";
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
