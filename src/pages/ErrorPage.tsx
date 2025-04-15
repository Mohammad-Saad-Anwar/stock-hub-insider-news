
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { AlertTriangle, Server, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  type?: "404" | "500" | "403";
}

export default function ErrorPage({ type }: ErrorPageProps) {
  const routeError = useRouteError() as { status?: number; statusText?: string; message?: string };
  
  // Determine error type from route error if not explicitly provided
  const errorType = type || (routeError?.status === 404 ? "404" : 
                             routeError?.status === 403 ? "403" : "500");
  
  const errorConfig = {
    "404": {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      icon: XOctagon,
      color: "text-amber-500",
    },
    "500": {
      title: "Server Error",
      description: "Something went wrong on our server. Please try again later.",
      icon: Server,
      color: "text-red-500",
    },
    "403": {
      title: "Access Forbidden",
      description: "You don't have permission to access this resource.",
      icon: AlertTriangle,
      color: "text-orange-500",
    }
  }[errorType];

  // If we somehow got an unknown error type
  if (!errorConfig) {
    return <div>Unknown error occurred</div>;
  }

  const IconComponent = errorConfig.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container px-4 py-8 text-center">
        <IconComponent className={`h-20 w-20 ${errorConfig.color} mx-auto mb-6`} />
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{errorType}</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">{errorConfig.title}</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {errorConfig.description}
        </p>
        
        {routeError?.message && (
          <div className="text-sm text-muted-foreground mb-8 max-w-md mx-auto bg-muted p-4 rounded-lg">
            <code>{routeError.message}</code>
          </div>
        )}
        
        <Button asChild>
          <Link to="/">Back to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
