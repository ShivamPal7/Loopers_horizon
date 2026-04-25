export interface Milestone {
  id: string;
  label: string;
  age: number;
  cost: number;
  category: 'housing' | 'business' | 'education' | 'lifestyle' | 'family' | 'travel' | 'retirement' | 'health' | 'other';
}

export interface LifeEvent {
  id: string;
  label: string;
  age: number;
  icon: string;
}

export interface SimulationResult {
  age: number;
  balance: number;
  shortfall: 'none' | 'minor' | 'moderate' | 'critical';
  milestoneId?: string;
}

export const PEER_DATA: Record<number, number> = {
  20: 50000,
  25: 250000,
  28: 320000,
  30: 500000,
  35: 1200000,
  40: 2500000,
  50: 6000000,
  60: 12000000,
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateForwardSimulation = (
  initialNetWorth: number,
  monthlySavings: number,
  annualInterestRate: number,
  milestones: Milestone[],
  inflationRate: number = 0,
  startAge: number = 20,
  endAge: number = 80
): SimulationResult[] => {
  const results: SimulationResult[] = [];
  let currentBalance = initialNetWorth;
  
  // Real interest rate = (1 + nominal) / (1 + inflation) - 1
  const realRate = (1 + annualInterestRate / 100) / (1 + inflationRate / 100) - 1;

  const milestoneMap = milestones.reduce((acc, m) => {
    const ageKey = Math.floor(m.age);
    if (!acc[ageKey]) acc[ageKey] = [];
    acc[ageKey].push(m);
    return acc;
  }, {} as Record<number, Milestone[]>);

  for (let age = startAge; age <= endAge; age++) {
    if (age > startAge) {
      currentBalance *= (1 + realRate);
    }

    currentBalance += monthlySavings * 12;

    const ageMilestones = milestoneMap[age] || [];
    let shortfallType: SimulationResult['shortfall'] = 'none';
    
    for (const m of ageMilestones) {
      if (currentBalance < m.cost) {
        const gapRatio = (m.cost - currentBalance) / m.cost;
        if (gapRatio > 0.5) shortfallType = 'critical';
        else if (gapRatio > 0.3) shortfallType = 'moderate';
        else shortfallType = 'minor';
      }
      currentBalance -= m.cost;
    }

    results.push({
      age,
      balance: currentBalance,
      shortfall: shortfallType,
    });
  }

  return results;
};

export const ageToX = (age: number, startAge: number, endAge: number, width: number) => {
  return ((age - startAge) / (endAge - startAge)) * width;
};

export const xToAge = (x: number, startAge: number, endAge: number, width: number) => {
  const age = (x / width) * (endAge - startAge) + startAge;
  return Math.max(startAge, Math.min(endAge, age));
};

export const getLifeStage = (age: number) => {
  if (age < 22) return 'CHILDHOOD';
  if (age < 30) return 'EARLY_CAREER';
  if (age < 40) return 'ESTABLISHMENT';
  if (age < 55) return 'PEAK_EARNING';
  if (age < 65) return 'PRE_RETIREMENT';
  return 'RETIREMENT';
};

export const getAIRecommendations = (
  currentAge: number,
  _monthlySavings: number,
  milestones: Milestone[],
  projection: SimulationResult[]
) => {
  const firstShortfall = milestones
    .map(m => ({ milestone: m, p: projection.find(p => p.age === m.age) }))
    .find(item => item.p && item.p.shortfall !== 'none');

  if (!firstShortfall) {
    return [
      "Your current trajectory is solid. All planned milestones are fully funded.",
      "Consider increasing your goal targets or adding a 'Legacy' milestone for retirement surplus."
    ];
  }

  const { milestone, p } = firstShortfall;
  const gap = milestone.cost - (p?.balance || 0);
  const monthsLeft = (milestone.age - currentAge) * 12;
  const suggestedIncrease = gap / Math.max(1, monthsLeft);

  return [
    `Critical insight: Your '${milestone.label}' at age ${milestone.age} has a ${formatCurrency(gap)} shortfall.`,
    `Strategy: Increase monthly savings by ${formatCurrency(suggestedIncrease)} to achieve this goal on time.`,
    `Alternative: Delay this milestone to age ${milestone.age + 2} to allow more time for compounding.`
  ];
};
