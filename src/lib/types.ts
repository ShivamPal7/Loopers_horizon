export type Category = 'housing' | 'business' | 'education' | 'family' | 'travel' | 'retirement' | 'health' | 'relationships';

export type Milestone = {
  id: string;
  label: string;
  targetAge: number;
  cost: number;
  category: Category;
  priority: 'high' | 'medium' | 'low';
  status?: 'on-track' | 'at-risk' | 'critical';
};

export type LifeEvent = {
  id: string;
  age: number;
  label: string;
  icon?: string;
  isFinancial: boolean;
};

export type FinancialSettings = {
  currentAge: number;
  currentNetWorth: number;
  monthlySavings: number;
  annualInterestRate: number;
  inflationRate: number;
  isInflationEnabled: boolean;
  lifeExpectancy: number;
};

export type Scenario = {
  id: string;
  name: string;
  settings: FinancialSettings;
};

export type HorizonState = {
  settings: FinancialSettings;
  milestones: Milestone[];
  lifeEvents: LifeEvent[];
  scenarios: Scenario[];
};
