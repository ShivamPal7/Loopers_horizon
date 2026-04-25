import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { formatCurrency, type SimulationResult, type Milestone } from '@/lib/finance-utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AIChatbotProps {
  projection: SimulationResult[];
  milestones: Milestone[];
  currentAge: number;
  className?: string;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  type?: 'insight' | 'warning' | 'success';
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ projection, milestones, className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Horizon AI. I've analyzed your financial trajectory. How can I help you optimize your life plan today?",
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "Shortfall Risk", query: "Check for shortfall risks" },
    { label: "Terminal Wealth", query: "What is my wealth at age 80?" },
    { label: "Savings Impact", query: "How does saving more help?" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateAIResponse = (userQuery: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let response = "";
      let type: Message['type'] = 'insight';
      const query = userQuery.toLowerCase();
      const terminalWealth = projection[projection.length - 1]?.balance || 0;
      const shortfall = projection.find(p => p.shortfall !== 'none');

      if (query.includes('shortfall') || query.includes('risk') || query.includes('fail') || query.includes('warning')) {
        if (shortfall) {
          response = `I detect a potential shortfall at age ${shortfall.age}. Your balance drops below the threshold. I recommend increasing monthly savings or delaying the "${milestones.find(m => Math.floor(m.age) === shortfall.age)?.label}" goal.`;
          type = 'warning';
        } else {
          response = "Great news! Your current plan has no detected shortfalls.";
          type = 'success';
        }
      } else if (query.includes('terminal') || query.includes('80') || query.includes('end') || query.includes('wealth')) {
        response = `Estimated wealth at age 80: ${formatCurrency(terminalWealth)}.`;
      } else if (query.includes('save') || query.includes('savi') || query.includes('impact') || query.includes('help')) {
        response = "Increasing savings by 10% could significantly boost your terminal wealth and buffer against risks.";
      } else {
        response = "Try asking about 'shortfall risks' or 'terminal wealth'.";
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: response, type }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setInputValue('');
    generateAIResponse(userMsg);
  };

  return (
    <Card className={`flex flex-col h-[600px] shadow-xl border-border bg-card ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary">
              <Bot size={18} />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-bold tracking-tight uppercase">Horizon AI Advisor</CardTitle>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Live Strategy</CardDescription>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1.5 py-1 px-3">
          <Sparkles size={12} className="fill-current" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Premium</span>
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar className="h-8 w-8 shrink-0 border">
                <AvatarFallback className={msg.role === 'user' ? 'bg-muted' : 'bg-primary/10 text-primary'}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </AvatarFallback>
              </Avatar>
              <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-muted/50 border rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center gap-3">
            <Avatar className="h-8 w-8 shrink-0 border animate-pulse">
              <AvatarFallback className="bg-primary/10 text-primary"><Bot size={14} /></AvatarFallback>
            </Avatar>
            <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-none border flex gap-1">
              <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 h-1 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </CardContent>

      <CardFooter className="p-4 border-t bg-muted/20 flex-col gap-4">
        <div className="flex flex-wrap gap-2 w-full">
          {presets.map((preset) => (
            <Button 
              key={preset.label} 
              variant="outline" 
              size="sm" 
              onClick={() => generateAIResponse(preset.query)}
              className="h-8 text-[10px] font-bold uppercase tracking-widest rounded-full bg-background/50"
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <div className="flex w-full items-center gap-2">
          <Input 
            placeholder="Ask AI Advisor..." 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-background h-11 rounded-xl"
          />
          <Button size="icon" onClick={handleSend} className="h-11 w-11 rounded-xl shrink-0">
            <Send size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
