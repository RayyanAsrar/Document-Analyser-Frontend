import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
  return (
    <section className="flex flex-col h-full min-h-[calc(100vh-85px)] p-4 gap-6">
      <div className="flex justify-end">
        <div className="flex items-center gap-3 rounded-lg p-3 w-[280px] bg-muted">
          <Skeleton className="w-5 h-5 rounded" />
          <div className="flex flex-col flex-1 min-w-0">
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="h-5 w-32 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 max-w-full">
            <div className="flex items-end justify-end gap-2">
              <div className="flex flex-col items-end max-w-[80%]">
                <Skeleton className="h-5 w-48 mb-1 rounded-lg" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex items-start gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex flex-col items-start max-w-[80%]">
                <Skeleton className="h-5 w-64 mb-1 rounded-lg" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChatSkeleton;
