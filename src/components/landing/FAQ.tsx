import { useState } from "react"

const FAQS = [
  {
    q: "How much profit you can get in Month ?",
    a: "Our platform helps you maximize monthly returns by intelligently allocating assets based on your risk profile. Average users see 8-15% monthly growth depending on market conditions and portfolio strategy.",
  },
  {
    q: "Have questions about about our services? Please feel free to contact our 24/7 customer services we are always available to help you.",
    a: "You can reach our team anytime via live chat, email, or phone. Our certified financial advisors are on hand 24/7 to assist with any questions about your account, transactions, or investment strategies.",
  },
  {
    q: "How do I get started with Finance comapny?",
    a: "Getting started is simple — create your account, complete verification in under 2 minutes, then deposit funds and let our smart automation optimize your portfolio instantly.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-[780px] mx-auto px-6 pb-24" id="faq">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-[44px] font-bold text-[#1A1A2E] tracking-[-0.03em] leading-[1.15] m-0 mb-1">
          Frequently Asked
        </h2>
        {/* Italic "Questions" in serif */}
        <p className="text-[40px] font-semibold italic text-[#1A1A2E] leading-none m-0 mb-5"
           style={{ fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" }}>
          Questions
        </p>
        <p className="text-[13.5px] text-[#9999BB] leading-[1.65] max-w-[480px] mx-auto">
          Have questions about our finance service, we offer wide range of services form better to give best service In the town. you can compare it.
        </p>
      </div>

      {/* FAQ accordion */}
      <div className="flex flex-col">
        {FAQS.map((faq, i) => (
          <div key={i} className="border-b border-[rgba(65,105,225,0.1)]">
            <button
              className="flex items-center justify-between w-full bg-transparent border-none py-5 text-left cursor-pointer gap-4 group"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-[14px] font-medium text-[#1A1A2E] leading-[1.5] flex-1 group-hover:text-[#4169E1] transition-colors">
                {faq.q}
              </span>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: open === i ? "#FF5252" : "#F3F5FF",
                  color: open === i ? "white" : "#5C5C7A",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d={open === i ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </span>
            </button>
            {open === i && (
              <div className="pb-5 pr-10 animate-[faq-open_0.2s_ease-out]">
                <p className="text-[13.5px] text-[#5C5C7A] leading-[1.7] m-0">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
