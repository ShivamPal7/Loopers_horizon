import React, { useState, useEffect } from 'react';
import { Tag, DollarSign, Calendar, Layout, Save } from 'lucide-react';
import type { Milestone } from '@/lib/finance-utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from '@/components/ui/select';

interface MilestoneFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (milestone: Omit<Milestone, 'id'>) => void;
  initialAge?: number;
}

export const MilestoneForm: React.FC<MilestoneFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAge = 30,
}) => {
  const [label, setLabel] = useState('');
  const [age, setAge] = useState(initialAge);
  const [cost, setCost] = useState(1000000);
  const [category, setCategory] = useState<Milestone['category']>('other');

  // Update internal age state when initialAge prop changes (e.g., when modal opens)
  useEffect(() => {
    setAge(initialAge);
  }, [initialAge, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label) return;
    onSave({ label, age, cost, category });
    onClose();
    // Reset
    setLabel('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Milestone</DialogTitle>
          <DialogDescription>
            Add a life goal to your financial trajectory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-4">
          {/* Label */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="milestone-label" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <Tag className="size-3" strokeWidth={3} />
              Milestone Name
            </Label>
            <Input
              id="milestone-label"
              autoFocus
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Buy Apartment"
              required
              className="font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="milestone-age" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Calendar className="size-3" strokeWidth={3} />
                Target Age
              </Label>
              <Input
                id="milestone-age"
                type="number"
                min="18"
                max="80"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="font-medium"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="milestone-category" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Layout className="size-3" strokeWidth={3} />
                Category
              </Label>
              <Select value={category} onValueChange={(val) => setCategory(val as Milestone['category'])}>
                <SelectTrigger id="milestone-category" className="w-full font-medium">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cost */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="milestone-cost" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <DollarSign className="size-3" strokeWidth={3} />
              Target Cost (INR)
            </Label>
            <Input
              id="milestone-cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="font-medium"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold uppercase tracking-widest"
          >
            <Save data-icon="inline-start" />
            Save Milestone
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
