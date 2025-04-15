
import React from "react";

interface ArticleLoadingProps {
  isMobile: boolean;
}

export function ArticleLoading({ isMobile }: ArticleLoadingProps) {
  return (
    <main className="container px-4 py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-96 bg-muted rounded-lg"></div>
        <div className="h-10 bg-muted rounded-md w-3/4"></div>
        <div className="h-4 bg-muted rounded-md w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded-md"></div>
          <div className="h-4 bg-muted rounded-md"></div>
          <div className="h-4 bg-muted rounded-md w-5/6"></div>
        </div>
      </div>
    </main>
  );
}
