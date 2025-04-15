
import { toast } from "@/components/ui/use-toast";

/**
 * Generic fetch function with error handling and JSON fallback
 */
export async function fetchWithFallback<T>(
  apiFunction: () => Promise<T>,
  fallbackFunction: () => Promise<T>,
  errorMessage: string = "Failed to fetch data"
): Promise<T> {
  try {
    return await apiFunction();
  } catch (error) {
    console.error(errorMessage, error);
    toast({
      title: "API Error",
      description: errorMessage,
      variant: "destructive",
    });
    
    try {
      return await fallbackFunction();
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw new Error(`${errorMessage} and fallback failed`);
    }
  }
}

/**
 * Load JSON data from local file
 */
export async function loadLocalData<T>(path: string): Promise<T> {
  try {
    const module = await import(`../data/${path}`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load local data from ${path}:`, error);
    throw error;
  }
}
