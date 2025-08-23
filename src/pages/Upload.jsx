import { MainContent } from "../components/MainContent";

export default function UploadPage() {
  return (
    <div
      className="bg-background animate-in fade-in duration-700"
      style={{ maxHeight: "100vh" }}
    >
      <div className="flex h-full w-full">
        <MainContent />
        {/* <ChatBox /> */}
      </div>
    </div>
  );
}
