
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ArticlesList } from "@/components/admin/ArticlesList";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import { 
  PieChart, 
  Users, 
  FileText, 
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { initializeDatabase } from "@/api/articles";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const stats = [
    { title: "Total Articles", value: "124", icon: FileText, change: "+12%", isPositive: true },
    { title: "Total Users", value: "3,521", icon: Users, change: "+18%", isPositive: true },
    { title: "Page Views", value: "42,312", icon: TrendingUp, change: "+24%", isPositive: true },
    { title: "Engagement Rate", value: "8.2%", icon: PieChart, change: "-2%", isPositive: false },
  ];

  useEffect(() => {
    const initDb = async () => {
      try {
        setIsLoading(true);
        const result = await initializeDatabase();
        
        if (result.success) {
          setIsDbInitialized(true);
          toast({
            title: "Database initialized",
            description: result.message || "Database has been successfully initialized.",
          });
        } else {
          throw new Error(result.error || "Failed to initialize database");
        }
      } catch (error) {
        console.error("Failed to initialize database:", error);
        toast({
          title: "Database initialization failed",
          description: "An error occurred while initializing the database. Using client-side mock data instead.",
          variant: "destructive",
        });
        // Still set to true so we use mock data
        setIsDbInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    initDb();
  }, [toast]);
  
  // Main dashboard content
  const DashboardContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div 
            key={stat.title} 
            className="bg-card rounded-lg border border-border p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className={`mt-4 text-sm ${
              stat.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>
      
      <ArticlesList />
    </>
  );
  
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      
      <div className="flex-1">
        <AdminHeader />
        
        <main className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : !isDbInitialized ? (
            <div className="bg-card rounded-lg border border-border p-6 flex items-center">
              <AlertCircle className="h-8 w-8 text-destructive mr-4" />
              <div>
                <h3 className="font-bold text-lg">Database Error</h3>
                <p className="text-muted-foreground">Failed to connect to the database. Please check your connection.</p>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/articles" element={<ArticlesList />} />
              <Route path="/articles/new" element={<ArticleEditor />} />
              <Route path="/articles/edit/:id" element={<ArticleEditor />} />
              <Route path="/settings" element={<SettingsPanel />} />
              {/* Redirect any other admin routes to dashboard */}
              <Route path="*" element={<DashboardContent />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
}
