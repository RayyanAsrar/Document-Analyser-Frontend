import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const ArchiveChatCard = ({ chat, onUnarchive, onDelete }) => {
  const { file, summary, createdAt } = chat;

  return (
    <div className="border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        {/* File Info */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 truncate">
            {file?.name || "Untitled Document"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Uploaded: {new Date(file?.createdAt || createdAt).toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <EllipsisVertical className="w-5 h-5 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => onUnarchive(chat._id)}
              className="cursor-pointer"
            >
              Unarchive chat
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(chat._id)}
              className="text-red-500 cursor-pointer"
            >
              Delete chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Summary */}
      <div className="mt-3">
        <p className="text-sm text-gray-700 line-clamp-3">
          {summary || "No summary available."}
        </p>
      </div>
    </div>
  );
};

export default ArchiveChatCard;
