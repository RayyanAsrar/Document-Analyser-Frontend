import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const ArchiveChatCard = ({ chat, onUnarchive, onDelete }) => {
  const { file, createdAt } = chat;

  return (
    <div className="border  rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg  truncate">
            {file?.name || "Untitled Document"}
          </h3>
          <p className="text-xs mt-1">
            Uploaded: {new Date(file?.createdAt || createdAt).toLocaleString()}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 transition-colors cursor-pointer">
              <EllipsisVertical className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => onUnarchive(chat._id, chat.isArchived)}
              className="cursor-pointer"
            >
              Unarchive
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(chat._id, chat.isDeleted)}
              className="text-red-500 cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {file.summary || "No summary available."} ...
        </p>
      </div>
    </div>
  );
};

export default ArchiveChatCard;
