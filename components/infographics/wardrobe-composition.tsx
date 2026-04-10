"use client"

import { Shirt, ShoppingBag } from "lucide-react"

export default function WardrobeComposition() {
  const totalItems = 20
  const fastFashionItems = 15 // 75%
  const otherItems = 5 // 25%

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          01 · Wardrobe Composition
        </span>
        <h2 className="text-2xl md:text-3xl font-light">
          What fills the modern closet?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Closet Visual */}
        <div className="relative">
          <div className="border-2 border-foreground rounded-lg p-6 bg-card">
            {/* Closet Rod */}
            <div className="h-1 bg-foreground rounded-full mb-6" />

            {/* Clothing Items Grid */}
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: totalItems }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-md flex items-center justify-center transition-all ${
                    i < fastFashionItems
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Shirt className="w-5 h-5" />
                </div>
              ))}
            </div>

            {/* Shelf */}
            <div className="h-1 bg-foreground/20 rounded-full mt-6" />
            <div className="flex justify-center gap-4 mt-4">
              <ShoppingBag className="w-6 h-6 text-muted-foreground" />
              <ShoppingBag className="w-6 h-6 text-muted-foreground" />
              <ShoppingBag className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-light text-foreground">
                75%
              </span>
            </div>
            <p className="text-lg text-muted-foreground">
              of young consumers&apos; wardrobes consist of fast fashion items
            </p>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-foreground" />
              <span className="text-sm text-muted-foreground">
                Fast Fashion
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted" />
              <span className="text-sm text-muted-foreground">
                Other Brands
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            The dominance of fast fashion in modern wardrobes reflects
            accessibility, affordability, and the rapid trend cycles that drive
            consumer purchasing behavior.
          </p>
        </div>
      </div>
    </div>
  )
}
