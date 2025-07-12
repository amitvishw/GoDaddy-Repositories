import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";

const CloneUrlCard = ({
  urls,
}: {
  urls: {
    clone_url: string;
    ssh_url: string;
    git_url: string;
  };
}) => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div
      className="bg-gray-950 rounded-xl shadow-lg p-6 border border-gray-900"
      data-testid="clone-url-card"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
        <Download className="w-5 h-5" />
        Clone Repository
      </h3>
      <div className="space-y-3">
        {[
          { label: "HTTPS", url: urls.clone_url, type: "https" },
          { label: "SSH", url: urls.ssh_url, type: "ssh" },
          { label: "Git", url: urls.git_url, type: "git" },
        ].map(({ label, url, type }) => (
          <div
            key={type}
            className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg"
          >
            <code className="flex-1 break-all text-sm font-mono text-gray-300 bg-transparent">
              {url}
            </code>
            <button
              onClick={() => copyToClipboard(url, type)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded cursor-pointer"
              title={`Copy ${label} URL`}
            >
              {copied === type ? (
                <Check className="w-4 h-4 text-green-600"/>
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloneUrlCard;
