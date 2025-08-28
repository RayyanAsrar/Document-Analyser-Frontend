import { FilesIcon } from "lucide-react";

const formatFileSize = (bytes) => {
  if (!bytes && bytes !== 0) return "-";
  const mb = bytes / (1024 * 1024);
  return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(2)} MB`;
};

const ChatHeader = ({ file }) => {
  return (
    <div className="flex items-center justify-end mb-4">
      <div className="flex items-center gap-3 rounded-lg p-3 w-[280px] bg-primary">
        <FilesIcon className="text-primary-foreground w-5 h-5" />
        <div className="flex flex-col flex-1 min-w-0">
          <span
            title={file?.name || "Untitled"}
            className="font-medium text-primary-foreground truncate"
          >
            {file?.name || "Untitled"}
          </span>
          <span className="text-sm text-primary-foreground/80">
            {formatFileSize(file?.size)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
