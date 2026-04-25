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
import { useHorizonStore } from "@/lib/useHorizonStore"
import type { Category, Priority } from "@/lib/types"

export function AddGoalModal({ children }: { children: React.ReactNode }) {
  const { addMilestone } = useHorizonStore()
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [cost, setCost] = React.useState("")
  const [age, setAge] = React.useState("")
  const [category, setCategory] = React.useState<Category>("housing")
  const [priority, setPriority] = React.useState<Priority>("medium")

  const handleSubmit = () => {
    if (!name || !cost || !age) {
      toast.error("Please fill all fields")
      return
    }

    addMilestone({
      label: name,
      cost: Number(cost),
      targetAge: Number(age),
      category: category as Category,
      priority: priority as Priority,
    })

    toast.success("Goal added successfully")
    setOpen(false)
    // Reset form
    setName("")
    setCost("")
    setAge("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Label htmlFor="new-name" className="text-right text-xs font-bold uppercase tracking-wider text-slate-500">Name</Label>
            <Input 
              id="new-name" 
              placeholder="e.g. Buy Home" 
              className="col-span-3 h-10 font-bold" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-cost" className="text-right text-xs font-bold uppercase tracking-wider text-slate-500">Cost (₹)</Label>
            <Input 
              id="new-cost" 
              type="number" 
              placeholder="8000000" 
              className="col-span-3 h-10 font-bold" 
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-age" className="text-right text-xs font-bold uppercase tracking-wider text-slate-500">Age</Label>
            <Input 
              id="new-age" 
              type="number" 
              placeholder="32" 
              className="col-span-3 h-10 font-bold" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-cat" className="text-right text-xs font-bold uppercase tracking-wider text-slate-500">Category</Label>
            <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
              <SelectTrigger className="col-span-3 h-10 font-bold" id="new-cat">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="housing">🏠 Housing</SelectItem>
                <SelectItem value="education">🎓 Education</SelectItem>
                <SelectItem value="retirement">🏖️ Retirement</SelectItem>
                <SelectItem value="business">💼 Business</SelectItem>
                <SelectItem value="family">💒 Family</SelectItem>
                <SelectItem value="travel">✈️ Travel</SelectItem>
                <SelectItem value="health">🏥 Health</SelectItem>
                <SelectItem value="relationships">❤️ Relationships</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-pri" className="text-right text-xs font-bold uppercase tracking-wider text-slate-500">Priority</Label>
            <Select value={priority} onValueChange={(val) => setPriority(val as Priority)}>
              <SelectTrigger className="col-span-3 h-10 font-bold" id="new-pri">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white font-bold h-11 rounded-xl hover:bg-slate-800"
          >
            Add to Timeline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
