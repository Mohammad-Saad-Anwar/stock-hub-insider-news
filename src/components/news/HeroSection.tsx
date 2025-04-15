
import { ArrowRight, BarChart3, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Your Trusted Source for <span className="text-primary">Tech Stocks</span> News & Analysis
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300">
              Stay ahead of the market with expert insights, breaking news, and in-depth analysis of the technology sector.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Latest Reports <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Subscribe
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/10 border-none">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <TrendingUp className="h-10 w-10 mb-3 text-primary" />
                <h3 className="font-semibold">Market Trends</h3>
                <p className="text-sm text-slate-300">Daily updates on tech stock performance</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <BarChart3 className="h-10 w-10 mb-3 text-primary" />
                <h3 className="font-semibold">Data Analysis</h3>
                <p className="text-sm text-slate-300">Expert insights and forecasts</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <BookOpen className="h-10 w-10 mb-3 text-primary" />
                <h3 className="font-semibold">Research Reports</h3>
                <p className="text-sm text-slate-300">Deep dives into tech companies</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <ArrowRight className="h-10 w-10 mb-3 text-primary" />
                <h3 className="font-semibold">Get Started</h3>
                <p className="text-sm text-slate-300">Create a free account today</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
