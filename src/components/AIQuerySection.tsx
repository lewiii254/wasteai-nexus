import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Mic, Bot, User, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIQuerySection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your GreenAI assistant. I can help you optimize waste collection, predict energy output, and find the nearest waste-to-energy facilities. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Based on your query about "${inputValue}", I can help you optimize waste collection in your area. The nearest waste-to-energy facility is 2.3 km away and can process approximately 50 tons per day, generating 150 kWh of clean energy.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Web Speech API integration would go here
  };

  const handlePlayResponse = (content: string) => {
    setIsSpeaking(!isSpeaking);
    // ElevenLabs TTS integration would go here
  };

  return (
    <section id="ai-query" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Ask Your <span className="hero-text">AI Assistant</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant insights on waste optimization, energy predictions, and collection strategies
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="p-6 shadow-eco">
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-background border border-border'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePlayResponse(message.content)}
                          className="h-6 px-2 text-xs"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="h-3 w-3 mr-1" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3 w-3 mr-1" />
                              Play
                            </>
                          )}
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                  {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about waste optimization, energy predictions, or collection points..."
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleVoiceInput}
                  className={`absolute right-1 top-1 h-8 w-8 ${
                    isListening ? 'text-accent animate-pulse' : 'text-muted-foreground'
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="ai" 
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                'Find nearest collection point',
                'Predict energy output',
                'Optimize collection route',
                'Calculate environmental impact'
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIQuerySection;