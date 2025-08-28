import { Send, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ChatInput = ({ newQuestion, setNewQuestion, submitting, onSubmit, onKeyDown }) => {
  return (
    <div className="border-t border-border bg-background p-3 sticky bottom-0 left-0 w-full">
      <div className="max-w-[1200px] mx-auto flex items-center gap-2">
        <Textarea
          placeholder="Ask a question... (Shift+Enter for newline)"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 resize-none"
          rows={2}
        />
        <Button
          onClick={onSubmit}
          disabled={submitting || !newQuestion.trim()}
          className="shrink-0"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>
      <p className="text-xs text-center text-muted-foreground mt-2">
        OmniView AI can make mistakes.
      </p>
    </div>
  );
}

export default ChatInput