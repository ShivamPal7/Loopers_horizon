import { Calendar, ArrowDownCircle, ArrowUpCircle, Info } from 'lucide-react';
import type { FinancialSettings, Milestone } from '../lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface MonthlyBreakdownProps {
  settings: FinancialSettings;
  milestones: Milestone[];
  age: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MonthlyBreakdown({ settings, milestones, age, open, onOpenChange }: MonthlyBreakdownProps) {
  const currentYear = new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const calculateYearlyDetails = () => {
    const { monthlySavings, annualInterestRate, currentAge, currentNetWorth } = settings;
    const monthlyRate = annualInterestRate / 100 / 12;
    
    // Estimate balance at start of year 'age'
    let balance = currentNetWorth;
    for (let a = currentAge; a < age; a++) {
      for (let m = 0; m < 12; m++) {
        balance += monthlySavings;
        balance *= (1 + monthlyRate);
        if (m === 11) {
          const milestonesAtAge = milestones.filter(mil => Math.floor(mil.targetAge) === a);
          milestonesAtAge.forEach(mil => balance -= mil.cost);
        }
      }
    }

    const yearMilestones = milestones.filter(m => Math.floor(m.targetAge) === age);
    
    let currentBalance = balance;
    return months.map((month, m) => {
      const startBalance = currentBalance;
      const interest = currentBalance * monthlyRate;
      currentBalance += monthlySavings + interest;
      
      let withdrawal = 0;
      const milestonesThisMonth = yearMilestones.filter(mil => {
        // Simple mock: spread milestones across months
        const monthIdx = parseInt(mil.id.slice(-1), 16) % 12;
        return monthIdx === m;
      });
      milestonesThisMonth.forEach(mil => withdrawal += mil.cost);
      currentBalance -= withdrawal;

      return {
        month,
        start: startBalance,
        savings: monthlySavings,
        interest,
        expenses: withdrawal,
        net: monthlySavings - withdrawal,
        end: currentBalance,
        milestones: milestonesThisMonth
      };
    });
  };

  const monthlyData = calculateYearlyDetails();
  const formatCurrency = (val: number) => `₹${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 overflow-hidden flex flex-col border-none shadow-2xl">
        <DialogHeader className="p-8 border-b bg-card">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Calendar className="size-6 text-primary" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold tracking-tight">Cash Flow Breakdown</DialogTitle>
              <DialogDescription className="font-medium text-muted-foreground">
                Detailed monthly budget projection for Age {age}.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[120px] font-bold">Month</TableHead>
                  <TableHead className="font-bold">Planned Savings</TableHead>
                  <TableHead className="font-bold">Goal Expenses</TableHead>
                  <TableHead className="text-right font-bold">Net Cashflow</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((row) => (
                  <TableRow key={row.month} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-black text-slate-900">{row.month}</TableCell>
                    <TableCell className="font-medium text-emerald-600">+{formatCurrency(row.savings)}</TableCell>
                    <TableCell>
                      {row.expenses > 0 ? (
                        <div className="space-y-1">
                          <span className="font-medium text-rose-600">-{formatCurrency(row.expenses)}</span>
                          <div className="flex flex-wrap gap-1">
                            {row.milestones.map(m => (
                              <Badge key={m.id} variant="outline" className="text-[9px] px-1.5 py-0 leading-none h-4 bg-muted/50">
                                {m.label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-black">
                      <div className="flex items-center justify-end gap-2">
                        <span className={row.net >= 0 ? "text-emerald-600" : "text-rose-600"}>
                          {formatCurrency(row.net)}
                        </span>
                        {row.net >= 0 ? (
                          <ArrowUpCircle className="size-4 text-emerald-500/50" />
                        ) : (
                          <ArrowDownCircle className="size-4 text-rose-500/50" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="p-6 border-t bg-card/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Info className="size-3.5 text-primary" />
            Compounding interest and withdrawals are applied monthly.
          </div>
          <Badge variant="secondary" className="font-bold px-3 py-1">
            Simulation Mode
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
}
