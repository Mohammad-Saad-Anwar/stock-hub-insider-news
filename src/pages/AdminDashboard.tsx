
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ArticlesList } from "@/components/admin/ArticlesList";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import { CategoriesList } from "@/components/admin/CategoriesList";
import { useToast } from "@/components/ui/use-toast";
import { initializeDatabase } from "@/api/articles";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [databaseInitialized, setDatabaseInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const initDb = async () => {
      try {
        setIsInitializing(true);
        const result = await initializeDatabase();
        setDatabaseInitialized(result.success);
        
        if (result.success) {
          toast({
            title: "Database initialized",
            description: result.message,
          });
        } else {
          console.error("Failed to initialize database:", result.error);
          toast({
            title: "Database initialization failed",
            description: result.error || "Cannot initialize database",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to initialize database:", error);
        toast({
          title: "Error",
          description: "Failed to initialize database",
          variant: "destructive",
        });
      } finally {
        setIsInitializing(false);
      }
    };
    
    initDb();
  }, [toast]);

  useEffect(() => {
    // Close sidebar on route change for mobile views
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="container max-w-7xl mx-auto px-4 py-6">
          {/* Browser notice */}
          {typeof window !== 'undefined' && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4 mb-6">
              <p className="font-medium">Browser Environment Detected</p>
              <p className="text-sm">
                Running in browser mode with mock data. In a production environment, 
                this admin panel would connect to a real database.
              </p>
            </div>
          )}
          
          <Routes>
            <Route path="/" element={<Navigate to="/admin/articles" replace />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/new" element={<ArticleEditor />} />
            <Route path="/articles/edit/:id" element={<ArticleEditor />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/settings" element={<SettingsPanel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
