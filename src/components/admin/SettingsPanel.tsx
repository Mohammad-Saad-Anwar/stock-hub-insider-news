
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { testConnection } from "@/server/mongodb";

export function SettingsPanel() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "TechStocksInsider",
    siteDescription: "Latest US Tech Stock News & Analysis",
    contactEmail: "info@techstocksinsider.com",
    enableComments: true,
    enableSubscriptions: true,
    articlesPerPage: 10
  });
  
  const [dbSettings] = useState({
    dbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/techstocksinsider",
    dbName: "techstocksinsider"
  });
  
  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleToggleChange = (name, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };
  
  const saveSettings = async () => {
    setIsSaving(true);
    
    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    }, 1000);
  };
  
  const testDbConnection = async () => {
    setIsTestingConnection(true);
    try {
      const result = await testConnection();
      
      if (result.success) {
        toast({
          title: "Connection successful",
          description: "Successfully connected to MongoDB database.",
        });
      } else {
        throw new Error(result.error || "Connection failed");
      }
    } catch (error) {
      console.error("Database connection test failed:", error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to MongoDB database: " + error.message,
        variant: "destructive"
      });
    } finally {
      setIsTestingConnection(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
        <Button onClick={saveSettings} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Settings
        </Button>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Site Name</label>
                  <Input 
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input 
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Description</label>
                <Input 
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Articles Per Page</label>
                <Input 
                  type="number"
                  name="articlesPerPage"
                  value={generalSettings.articlesPerPage}
                  onChange={handleNumberChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Enable or disable site features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Comments</p>
                  <p className="text-sm text-muted-foreground">
                    Allow users to comment on articles
                  </p>
                </div>
                <Switch 
                  checked={generalSettings.enableComments}
                  onCheckedChange={(checked) => handleToggleChange("enableComments", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Subscriptions</p>
                  <p className="text-sm text-muted-foreground">
                    Allow users to subscribe to your newsletter
                  </p>
                </div>
                <Switch 
                  checked={generalSettings.enableSubscriptions}
                  onCheckedChange={(checked) => handleToggleChange("enableSubscriptions", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>
                MongoDB connection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">MongoDB URI</label>
                <Input 
                  value={dbSettings.dbUri}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Set using environment variable MONGODB_URI
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Database Name</label>
                <Input 
                  value={dbSettings.dbName}
                  disabled
                />
              </div>
              
              <Button onClick={testDbConnection} disabled={isTestingConnection}>
                {isTestingConnection ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Test Connection"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Theme customization options will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                These settings are for advanced users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced configuration options will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
