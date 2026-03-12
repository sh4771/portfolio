"use client"

import { ArrowDown, ArrowRight, Repeat, User, DollarSign } from "lucide-react"

export default function CircularPricingModel() {
  return (
    <div className="space-y-20">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight">
          How the Circular Pricing Model Works
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-pretty">
          A pricing system designed to keep garments circulating longer by lowering 
          resale prices over time, rewarding previous owners, and balancing platform sustainability.
        </p>
      </div>

      {/* Block 1: Progressive Price Drop */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Progressive Price Drop</h3>
          <p className="text-muted-foreground text-sm max-w-xl">
            The resale price decreases with each handoff, making garments more accessible 
            as they continue circulating through the system.
          </p>
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 md:p-10">
          {/* F-shape layout: Left labels, horizontal bars shrinking right */}
          <div className="space-y-3">
            {[
              { hand: "1st", price: "$200", drop: null, width: 100, isOriginal: true },
              { hand: "2nd", price: "$170", drop: "-15%", width: 85 },
              { hand: "3rd", price: "$145", drop: "-15%", width: 72 },
              { hand: "4th", price: "$116", drop: "-20%", width: 58 },
              { hand: "5th", price: "$104", drop: "-10%", width: 52 },
              { hand: "6th", price: "$94", drop: "-10%", width: 47 },
              { hand: "7th", price: "$85", drop: "-10%", width: 42 },
              { hand: "8th", price: "$68", drop: "-20%", width: 34 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                {/* Left anchor: Hand number */}
                <div className="w-12 text-right shrink-0">
                  <span className="text-sm font-medium text-muted-foreground">{item.hand}</span>
                </div>
                
                {/* Horizontal bar - shrinks with each handoff */}
                <div className="flex-1 flex items-center gap-3">
                  <div 
                    className={`h-10 rounded-r-lg flex items-center justify-end px-4 transition-all ${
                      item.isOriginal ? "bg-foreground" : "bg-foreground/70"
                    }`}
                    style={{ width: `${item.width}%` }}
                  >
                    <span className="text-background font-medium text-sm">{item.price}</span>
                  </div>
                  
                  {/* Drop badge - right of bar */}
                  {item.drop && (
                    <span className="text-xs text-accent font-medium shrink-0">
                      {item.drop}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {/* Continuation row */}
            <div className="flex items-center gap-4">
              <div className="w-12 text-right shrink-0">
                <span className="text-sm text-muted-foreground">...</span>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div 
                  className="h-10 rounded-r-lg flex items-center justify-end px-4 bg-foreground/30"
                  style={{ width: '15%' }}
                >
                  <span className="text-background/80 font-medium text-sm">$3</span>
                </div>
                <span className="text-xs text-muted-foreground">minimum price</span>
              </div>
            </div>
          </div>

          {/* Key insight - bottom of F */}
          <div className="mt-8 pt-6 border-t border-border flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Repeat className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Lower prices invite new buyers.</span>{" "}
              Each handoff makes the garment accessible to someone who could not afford it before, 
              keeping it in circulation instead of going to landfill.
            </p>
          </div>
        </div>
      </div>

      {/* Block 2: Wear-Based Cost */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Wear-Based Cost</h3>
          <p className="text-muted-foreground text-sm max-w-xl">
            Users are not simply buying clothing outright — they pay for the time 
            they wear it, then recover part of the value when they resell.
          </p>
        </div>

        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <p className="text-3xl font-light">$80</p>
              <p className="text-xs text-muted-foreground mt-1">Purchase Price</p>
            </div>
            
            <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
            <ArrowDown className="w-6 h-6 text-muted-foreground md:hidden" />
            
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <p className="text-lg font-light text-muted-foreground">6 months</p>
              <p className="text-xs text-muted-foreground mt-1">Wear Period</p>
            </div>
            
            <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
            <ArrowDown className="w-6 h-6 text-muted-foreground md:hidden" />
            
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <p className="text-3xl font-light">$68</p>
              <p className="text-xs text-muted-foreground mt-1">Resale Price</p>
            </div>
            
            <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
            <ArrowDown className="w-6 h-6 text-muted-foreground md:hidden" />
            
            <div className="text-center p-6 bg-foreground text-background rounded-xl">
              <p className="text-3xl font-light">$12</p>
              <p className="text-xs mt-1 opacity-80">Net Cost to Wear</p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 max-w-md mx-auto">
            The true cost of ownership becomes the difference between purchase and resale, 
            not the full retail price.
          </p>
        </div>
      </div>

      {/* Block 3: Partial Profit Rewards */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Partial Profit Rewards</h3>
          <p className="text-muted-foreground text-sm max-w-xl">
            When a garment is resold again, previous owners receive a small partial 
            reward from future resale transactions — creating a chain-of-custody value flow.
          </p>
        </div>

        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="flex flex-col gap-6">
            {/* Chain visualization */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {[
                { label: "1st Owner", reward: null },
                { label: "2nd Owner", reward: null },
                { label: "3rd Owner", reward: "$14" },
                { label: "4th Owner", reward: "$12" },
              ].map((owner, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      owner.reward ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    }`}>
                      <User className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium mt-2">{owner.label}</span>
                    {owner.reward && (
                      <span className="text-xs text-foreground font-medium mt-1">+{owner.reward}</span>
                    )}
                  </div>
                  {i < 3 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                  )}
                </div>
              ))}
            </div>

            {/* Example callouts */}
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">3rd-hand sale at $145</p>
                    <p className="text-xs text-muted-foreground">Previous seller receives ~$14</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-background rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">4th-hand sale at $123</p>
                    <p className="text-xs text-muted-foreground">Previous seller receives ~$12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Block 4: Membership vs Non-Membership */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Membership vs Non-Membership</h3>
          <p className="text-muted-foreground text-sm max-w-xl">
            A hybrid platform revenue model that supports both accessibility for 
            casual users and recurring revenue for sustainable operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted/30 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
                <User className="w-6 h-6 text-background" />
              </div>
              <div>
                <h4 className="font-medium">Member</h4>
                <p className="text-2xl font-light">$6.99<span className="text-sm text-muted-foreground">/mo</span></p>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                No transaction fees
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                Priority listing visibility
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                Enhanced profit rewards
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                Early access to features
              </li>
            </ul>
          </div>

          <div className="bg-background border border-border rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium">Non-Member</h4>
                <p className="text-2xl font-light">10%<span className="text-sm text-muted-foreground"> per sale</span></p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                Pay per transaction
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                Standard listing visibility
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                Standard profit rewards
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                Full platform access
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="bg-foreground text-background rounded-2xl p-8 md:p-12">
        <div className="flex items-start gap-4">
          <Repeat className="w-8 h-8 shrink-0 mt-1" />
          <div className="space-y-3">
            <h4 className="text-lg font-medium">Key Takeaway</h4>
            <p className="text-background/80 text-pretty leading-relaxed">
              This system is not only designed to make secondhand clothing cheaper. 
              It is designed to increase garment circulation, lower the barrier for 
              the next user, reward participation, and extend the lifecycle of 
              fast-fashion items.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
