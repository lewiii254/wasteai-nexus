import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Bot, MapPin, BarChart3, Users, Mic } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary">GreenAI</h1>
            <p className="text-xs text-muted-foreground">Waste-to-Energy AI</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#ai-query" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Bot className="h-4 w-4" />
            AI Assistant
          </a>
          <a href="#map" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <MapPin className="h-4 w-4" />
            Waste Points
          </a>
          <a href="#insights" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <BarChart3 className="h-4 w-4" />
            Insights
          </a>
          <a href="#community" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Users className="h-4 w-4" />
            Community
          </a>
        </div>

        {/* CTA Button */}
        <Button variant="ai" size="lg" className="hidden sm:flex items-center gap-2">
          <Mic className="h-4 w-4" />
          Call Waste-Energy AI
        </Button>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Bot className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;