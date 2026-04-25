import { useState, useEffect, useMemo } from 'react';
import type { Milestone, FinancialSettings, HorizonState } from './types';

const STORAGE_KEY = 'horizon_data';

const DEFAULT_SETTINGS: FinancialSettings = {
  currentAge: 28,
  currentNetWorth: 500000,
  monthlySavings: 32000,
  annualInterestRate: 8,
  inflationRate: 4,
  isInflationEnabled: false,
  lifeExpectancy: 80,
};

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: '1',
    label: 'Buy apartment in Pune',
    targetAge: 32,
    cost: 8000000,
    category: 'housing',
    priority: 'high',
  },
];

export function useHorizonStore() {
  const [state, setState] = useState<HorizonState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return {
      settings: DEFAULT_SETTINGS,
      milestones: INITIAL_MILESTONES,
      lifeEvents: [],
      scenarios: [],
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateSettings = (settings: Partial<FinancialSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  };

  const addMilestone = (milestone: Omit<Milestone, 'id'>) => {
    const newMilestone = { ...milestone, id: crypto.randomUUID() };
    setState((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone],
    }));
  };

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  };

  const deleteMilestone = (id: string) => {
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
  };

  const projectionData = useMemo(() => {
    const { currentAge, currentNetWorth, monthlySavings, annualInterestRate, lifeExpectancy } = state.settings;
    const data = [];
    let balance = currentNetWorth;
    const monthlyRate = annualInterestRate / 100 / 12;

    for (let age = currentAge; age <= lifeExpectancy; age++) {
      for (let month = 0; month < 12; month++) {
        balance += monthlySavings;
        balance *= (1 + monthlyRate);

        // Check for milestones at this age and month (assuming end of year for simplicity in this first pass)
        if (month === 11) {
          const milestonesAtAge = state.milestones.filter(m => Math.floor(m.targetAge) === age);
          milestonesAtAge.forEach(m => {
            balance -= m.cost;
          });
        }
      }
      data.push({ age, balance });
    }
    return data;
  }, [state.settings, state.milestones]);

  return {
    ...state,
    updateSettings,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    projectionData,
  };
}
