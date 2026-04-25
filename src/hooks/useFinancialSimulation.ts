import { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  calculateForwardSimulation,
  getLifeStage,
  PEER_DATA
} from '@/lib/finance-utils';
import type { 
  Milestone,
  LifeEvent
} from '@/lib/finance-utils';

const STORAGE_KEY = 'horizon_profile_v1';

export const useFinancialSimulation = () => {
  // Load initial state from localStorage
  const [initialNetWorth, setInitialNetWorth] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_networth`);
    return saved ? Number(saved) : 500000;
  });
  
  const [monthlySavings, setMonthlySavings] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_savings`);
    return saved ? Number(saved) : 32000;
  });

  const [annualInterestRate, setAnnualInterestRate] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_rate`);
    return saved ? Number(saved) : 8;
  });

  const [inflationRate, setInflationRate] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_inflation`);
    return saved ? Number(saved) : 0;
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_milestones`);
    return saved ? JSON.parse(saved) : [
      { id: '1', label: 'Buy Apartment', age: 32, cost: 8000000, category: 'housing' },
      { id: '2', label: 'Start Studio', age: 35, cost: 1500000, category: 'business' },
    ];
  });

  const [currentAge] = useState(28); 
  const [lifeEvents] = useState<LifeEvent[]>([
    { id: 'e1', label: 'College Graduation', age: 20, icon: '🎓' },
    { id: 'e2', label: 'First Job Started', age: 25, icon: '💼' },
    { id: 'e3', label: 'Today', age: 28, icon: '📍' },
  ]);
  const [zoomLevel, setZoomLevel] = useState<'5y' | '10y' | 'full'>('full');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_networth`, initialNetWorth.toString());
  }, [initialNetWorth]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_savings`, monthlySavings.toString());
  }, [monthlySavings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_rate`, annualInterestRate.toString());
  }, [annualInterestRate]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_inflation`, inflationRate.toString());
  }, [inflationRate]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_milestones`, JSON.stringify(milestones));
  }, [milestones]);

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
    if (monthlySavings > 25000) list.push({ id: 'steady-saver', label: 'Steady Saver', icon: '🏅' });
    if (projection.every(p => p.shortfall === 'none')) list.push({ id: 'on-track', label: 'On Track', icon: '🏅' });
    return list;
  }, [milestones, currentAge, projection, monthlySavings]);

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
