import { render, screen } from "../test/utils";
import { describe, it, expect } from "vitest";
import UsersCard from "./UserCard";
import { User } from "../types/github";

describe("UsersCard", () => {
  const mockUsers: User[] = [
    {
      id: "user1",
      login: "user1",
      avatar_url: "avatar1.jpg",
      url: "https://github.com/user1",
      contributions: 1,
    },
    {
      id: "user2",
      login: "user2",
      avatar_url: "avatar2.jpg",
      url: "https://github.com/user2",
      contributions: 5,
    },
  ];

  it("renders shimmer when loading", () => {
    render(<UsersCard label="Contributors" users={[]} isLoading={true} />);
    expect(screen.getByTestId("users-card-loading")).toBeInTheDocument();
  });

  it("renders users when loaded", () => {
    render(
      <UsersCard label="Contributors" users={mockUsers} isLoading={false} />,
    );
    expect(screen.getByTestId("user-item-user1")).toBeInTheDocument();
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-user2")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  it("shows remaining count when more than 5 users", () => {
    const manyUsers = Array.from({ length: 10 }, (_, i) => ({
      id: `user${i + 1}`,
      login: `user${i + 1}`,
      avatar_url: `avatar${i + 1}.jpg`,
      url: `https://github.com/user${i + 1}`,
      contributions: 0,
    }));

    render(
      <UsersCard label="Contributors" users={manyUsers} isLoading={false} />,
    );

    expect(screen.getByTestId("users-card-remaining")).toBeInTheDocument();
    expect(screen.getByText("+5")).toBeInTheDocument();
    expect(screen.queryByTestId("user-item-user6")).not.toBeInTheDocument();
  });

  it("renders user contributions when available", () => {
    render(
      <UsersCard label="Contributors" users={mockUsers} isLoading={false} />,
    );
    expect(screen.getByText("1 contributions")).toBeInTheDocument();
    expect(screen.getByText("5 contributions")).toBeInTheDocument();
  });
});
