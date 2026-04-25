import { Slider } from '@/components/ui/slider';
import type { FinancialSettings } from '../lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from '@/components/ui/card';
import { TrendingUp, Wallet, Percent, Heart, User, Banknote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScenarioPanelProps {
  settings: FinancialSettings;
  onChange: (settings: Partial<FinancialSettings>) => void;
}

export function ScenarioPanel({ settings, onChange }: ScenarioPanelProps) {
  const formatCurrency = (value: number) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="@container/card border-none bg-card/50 backdrop-blur-sm shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="size-4" />
          </div>
          <CardDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
            Financial Strategy
          </CardDescription>
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">Simulation Controls</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Monthly Savings */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
              <Wallet className="size-3.5" /> Monthly Savings
            </Label>
            <Badge variant="secondary" className="font-black text-sm px-2.5 py-0.5 bg-primary/5 text-primary border-primary/10">
              ₹{settings.monthlySavings.toLocaleString()}
            </Badge>
          </div>
          <div className="px-1">
            <Slider 
              value={[settings.monthlySavings]} 
              min={10000} 
              max={500000} 
              step={5000}
              onValueChange={([val]) => onChange({ monthlySavings: val })}
              className="py-2"
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest px-1">
            <span>{formatCurrency(10000)}</span>
            <span>{formatCurrency(500000)}</span>
          </div>
        </div>

        {/* Annual Return */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-muted-foreground flex items-center gap-2">
              <Percent className="size-3.5" /> Annual Return
            </Label>
            <Badge variant="secondary" className="font-black text-sm px-2.5 py-0.5 bg-emerald-500/5 text-emerald-600 border-emerald-500/10">
              {settings.annualInterestRate}%
            </Badge>
          </div>
          <div className="px-1">
            <Slider 
              value={[settings.annualInterestRate]} 
              min={4} 
              max={15} 
              step={0.5}
              onValueChange={([val]) => onChange({ annualInterestRate: val })}
              className="py-2"
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest px-1">
            <span>4%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Age Inputs */}
        <div className="grid grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest flex items-center gap-1.5">
              <User className="size-3 text-primary/60" /> Age
            </Label>
            <div className="relative">
              <Input 
                type="number" 
                value={settings.currentAge}
                onChange={(e) => onChange({ currentAge: parseInt(e.target.value) || 0 })}
                className="h-11 text-base font-black bg-muted/20 border-none ring-1 ring-border/50 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest flex items-center gap-1.5">
              <Heart className="size-3 text-rose-500/60" /> Lifespan
            </Label>
            <div className="relative">
              <Input 
                type="number" 
                value={settings.lifeExpectancy}
                onChange={(e) => onChange({ lifeExpectancy: parseInt(e.target.value) || 0 })}
                className="h-11 text-base font-black bg-muted/20 border-none ring-1 ring-border/50 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Net Worth Input */}
        <div className="space-y-3 pt-2">
          <Label className="text-[10px] font-black text-muted-foreground/70 uppercase tracking-widest flex items-center gap-1.5">
            <Banknote className="size-3 text-emerald-500/60" /> Current Net Worth
          </Label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 font-black group-focus-within:text-primary/70 transition-colors">₹</div>
            <Input 
              type="number" 
              value={settings.currentNetWorth}
              onChange={(e) => onChange({ currentNetWorth: parseInt(e.target.value) || 0 })}
              className="h-14 pl-8 text-lg font-black bg-muted/20 border-none ring-1 ring-border/50 focus-visible:ring-2 focus-visible:ring-primary/30 transition-all rounded-xl"
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-6 mt-2 border-t border-border/40">
          <p className="text-[10px] text-muted-foreground/50 font-medium italic leading-relaxed">
            Simulation uses monthly compounding and annual milestone drawdowns for projection accuracy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
