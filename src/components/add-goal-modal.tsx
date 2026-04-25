import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import * as React from "react"

export function AddGoalModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogDescription>
            Define a new financial milestone to add to your timeline.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-name" className="text-right">Goal Name</Label>
            <Input id="new-name" placeholder="e.g. New Car" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-cost" className="text-right">Target (₹)</Label>
            <Input id="new-cost" type="number" placeholder="800000" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-age" className="text-right">Target Age</Label>
            <Input id="new-age" type="number" placeholder="32" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-cat" className="text-right">Category</Label>
            <Select defaultValue="Housing">
              <SelectTrigger className="col-span-3" id="new-cat">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Housing">🏠 Housing</SelectItem>
                <SelectItem value="Education">🎓 Education</SelectItem>
                <SelectItem value="Retirement">🏖️ Retirement</SelectItem>
                <SelectItem value="Business">💼 Business</SelectItem>
                <SelectItem value="Family">💒 Family</SelectItem>
                <SelectItem value="Travel">✈️ Travel</SelectItem>
                <SelectItem value="Investment">📈 Investment</SelectItem>
                <SelectItem value="Savings">🐷 Savings</SelectItem>
                <SelectItem value="Lifestyle">🛍️ Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-pri" className="text-right">Priority</Label>
            <Select defaultValue="Medium">
              <SelectTrigger className="col-span-3" id="new-pri">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => toast.success("Goal added successfully")}>Add Milestone</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
