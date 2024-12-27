import React from "react";
import type { User } from "@/types";

type Props = {
  users: User[];
};

const UsersList = ({ users }: Props) => {
  return (
    <div className="w-64 bg-white border-l p-4">
      <h2 className="font-semibold text-gray-800 mb-4">Online Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.username}
            className="flex items-center justify-between"
          >
            <span className="text-gray-700">{user.username}</span>
            {user.isTyping && (
              <span className="text-xs text-gray-500">typing...</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
