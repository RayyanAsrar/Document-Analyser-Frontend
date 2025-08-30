import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Download, Eye, MessageSquare, MoreVertical } from "lucide-react";

const FileCard = ({ file, handleView, handleDownload, handleShowInChat }) => {
  return (
    <Card key={file._id} className="relative">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-base font-bold">{file.name}</CardTitle>
          <CardDescription className="mt-1 text-xs">
            {file.contentType.split("/")[1].toUpperCase()} •{" "}
            {(file.size / 1024).toFixed(1)} KB
          </CardDescription>
        </div>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="ghost" size="icon">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2"
                onClick={() => handleView(file)}
              >
                <Eye size={16} /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2"
                onClick={() => handleDownload(file)}
              >
                <Download size={16} /> Download
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2"
                onClick={() => handleShowInChat(file)}
              >
                <MessageSquare size={16} /> Show in Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">
          <span className="font-semibold">Summary:</span>{" "}
          {file.summary?.slice(0, 100) || "No summary available."} ...
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold">Uploaded:</span>{" "}
          {new Date(file.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
