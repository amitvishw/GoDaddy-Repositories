import { Users } from "lucide-react";
import { User } from "../types/github";
import ShimmerElement from "./ShimmerElement";

interface UserCardProps {
  label: string;
  users: User[];
  isLoading: boolean;
}

const UsersCard = ({ label, users = [], isLoading = true }: UserCardProps) => {
  if (isLoading) {
    return (
      <div
        data-testid="users-card-loading"
        className="rounded-xl shadow-lg p-6 bg-gray-950 border border-gray-900"
      >
        <div className="flex items-center gap-2 mb-4">
          <ShimmerElement className="w-5 h-5 rounded" />
          <ShimmerElement className="h-6 w-28" />
        </div>

        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2 p-3">
              <ShimmerElement className="w-10 h-10 rounded-full" />
              <ShimmerElement className="h-4 w-16" />
              <ShimmerElement className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  const displayUsers = users?.slice(0, 5) || [];
  const remainingCount = users && users.length > 5 ? users.length - 5 : 0;
  return (
    <div
      data-testid="users-card"
      className="rounded-xl shadow-lg p-6 bg-gray-950 border border-gray-900"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200">
        <Users className="w-5 h-5" />
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {displayUsers.map((user) => (
          <a
            href={user.url}
            target="_blank"
            rel="noopener noreferrer"
            key={user.id}
            data-testid={`user-item-${user.login}`}
            className="hover:transform hover:scale-105 transition-transform duration-200"
          >
            <div className="flex flex-col items-center gap-2 p-3 hover:bg-gray-800 rounded-lg transition-colors duration-200">
              <div>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-10 h-10 rounded-full border-2 border-gray-700 hover:border-gray-500 transition-colors duration-200"
                />
              </div>
              <div className="text-sm text-gray-300 text-center">
                {user.login}
              </div>
              {user.contributions && (
                <div className="text-xs text-gray-500">
                  {user.contributions} contributions
                </div>
              )}
            </div>
          </a>
        ))}

        {remainingCount > 0 && (
          <div
            data-testid="users-card-remaining"
            className="flex flex-col items-center gap-2 p-3"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
              <span className="text-xs text-gray-300 font-semibold">
                +{remainingCount}
              </span>
            </div>
            <div className="text-xs text-gray-500">more</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersCard;
