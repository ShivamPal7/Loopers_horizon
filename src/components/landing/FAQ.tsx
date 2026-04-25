import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const FAQS = [
  {
    q: "How much profit can I get in a month?",
    a: "Our platform helps you maximize monthly returns by intelligently allocating assets based on your risk profile. Average users see 8-15% annual growth depending on market conditions and portfolio strategy.",
  },
  {
    q: "Have questions about our services?",
    a: "You can reach our team anytime via live chat, email, or phone. Our certified financial advisors are on hand 24/7 to assist with any questions about your account, transactions, or investment strategies.",
  },
  {
    q: "How do I get started with Horizon?",
    a: "Getting started is simple — create your account, set your current age and net worth, add your first milestone, and let our smart simulation show you exactly how to get there.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-[720px] mx-auto py-16 pb-24" id="faq">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-4xl font-bold text-foreground tracking-tight">Frequently Asked</h2>
        <p className="text-3xl font-semibold text-muted-foreground italic" style={{ fontFamily: "Georgia, serif" }}>
          Questions
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Have questions about our finance service? We offer a wide range of tools to help you plan better and achieve your goals.
        </p>
      </div>

      <div className="flex flex-col">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <Separator />
            <button
              className="flex items-center justify-between w-full bg-transparent border-none py-5 text-left cursor-pointer gap-4 group"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-medium text-foreground leading-relaxed flex-1 group-hover:text-muted-foreground transition-colors">
                {faq.q}
              </span>
              <Button variant="ghost" size="icon" className="w-7 h-7 shrink-0 rounded-full" asChild>
                <span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
                </span>
              </Button>
            </button>
            {open === i && (
              <div className="pb-5 pr-10">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
        <Separator />
      </div>

      <div className="text-center mt-16 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
          © {new Date().getFullYear()} Project Horizon. All rights reserved.
        </p>
      </div>
    </section>
  )
}
