
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ArticlesList } from "@/components/admin/ArticlesList";
import { 
  PieChart, 
  Users, 
  FileText, 
  TrendingUp 
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Articles", value: "124", icon: FileText, change: "+12%", isPositive: true },
    { title: "Total Users", value: "3,521", icon: Users, change: "+18%", isPositive: true },
    { title: "Page Views", value: "42,312", icon: TrendingUp, change: "+24%", isPositive: true },
    { title: "Engagement Rate", value: "8.2%", icon: PieChart, change: "-2%", isPositive: false },
  ];
  
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      
      <div className="flex-1">
        <AdminHeader />
        
        <main className="p-6">
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
        </main>
      </div>
    </div>
  );
}
