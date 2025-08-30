import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FileX } from "lucide-react";

const NoFileFallback = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full col-span-3 py-12 bg-background rounded-lg border border-dashed border-muted">
      <FileX className="mb-6 w-16 h-16 opacity-60" />
      <div className="mb-2 text-xl font-bold text-muted-foreground">
        Looks like you haven't uploaded a file yet
      </div>
      <div className="mb-6 text-sm text-muted-foreground">
        Start by uploading your first document to get started!
      </div>
      <Button onClick={() => navigate("/upload")} variant="default" size="lg">
        Upload a file
      </Button>
    </div>
  );
};
export default NoFileFallback;
