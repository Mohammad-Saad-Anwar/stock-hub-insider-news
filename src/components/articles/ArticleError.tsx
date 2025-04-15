
import React from "react";

interface ArticleErrorProps {
  isMobile: boolean;
}

export function ArticleError({ isMobile }: ArticleErrorProps) {
  return (
    <main className="container px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p>The article you are looking for doesn't exist or has been removed.</p>
      </div>
    </main>
  );
}
