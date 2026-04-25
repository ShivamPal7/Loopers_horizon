import { useState, useMemo, useCallback } from 'react';
import { 
  calculateForwardSimulation,
  getLifeStage,
  PEER_DATA
} from '@/lib/finance-utils';
import type { 
  Milestone,
  LifeEvent
} from '@/lib/finance-utils';

export const useFinancialSimulation = () => {
  const [currentAge] = useState(28); // Based on AGENT.md (Aditya)
  const [initialNetWorth, setInitialNetWorth] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(32000); // Updated to AGENT.md starting point
  const [annualInterestRate, setAnnualInterestRate] = useState(8); // Updated to 8%
  const [inflationRate, setInflationRate] = useState(0);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', label: 'Buy Apartment', age: 32, cost: 8000000, category: 'housing' },
    { id: '2', label: 'Start Studio', age: 35, cost: 1500000, category: 'business' },
  ]);
  const [lifeEvents] = useState<LifeEvent[]>([
    { id: 'e1', label: 'College Graduation', age: 20, icon: '🎓' },
    { id: 'e2', label: 'First Job Started', age: 25, icon: '💼' },
    { id: 'e3', label: 'Today', age: 28, icon: '📍' },
  ]);
  const [zoomLevel, setZoomLevel] = useState<'5y' | '10y' | 'full'>('full');

  const projection = useMemo(() => {
    return calculateForwardSimulation(
      initialNetWorth,
      monthlySavings,
      annualInterestRate,
      milestones,
      inflationRate
    );
  }, [initialNetWorth, monthlySavings, annualInterestRate, milestones, inflationRate]);

  const updateMilestone = useCallback((id: string, updates: Partial<Milestone>) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  }, []);

  const addMilestone = useCallback((data: Omit<Milestone, 'id'>) => {
    const newMilestone: Milestone = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
    };
    setMilestones(prev => [...prev, newMilestone]);
  }, []);

  // Stats & Badges
  const lifeStage = getLifeStage(currentAge);
  const peerAverage = PEER_DATA[currentAge] || 320000;
  const aheadOfPeers = initialNetWorth - peerAverage;
  
  const badges = useMemo(() => {
    const list = [];
    if (milestones.length >= 3) list.push({ id: 'goal-setter', label: 'Goal Setter', icon: '🏅' });
    if (currentAge < 30) list.push({ id: 'early-bird', label: 'Early Bird', icon: '🏅' });
    if (projection.every(p => p.shortfall === 'none')) list.push({ id: 'on-track', label: 'On Track', icon: '🏅' });
    return list;
  }, [milestones, currentAge, projection]);

  return {
    currentAge,
    initialNetWorth,
    setInitialNetWorth,
    monthlySavings,
    setMonthlySavings,
    annualInterestRate,
    setAnnualInterestRate,
    inflationRate,
    setInflationRate,
    milestones,
    updateMilestone,
    addMilestone,
    lifeEvents,
    projection,
    zoomLevel,
    setZoomLevel,
    stats: {
      lifeStage,
      peerAverage,
      aheadOfPeers,
      badges,
    }
  };
};
