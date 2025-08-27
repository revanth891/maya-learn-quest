import * as React from "react"
import { cn } from "../../lib/utils"

interface StatCardProps {
  number: string
  label: string
  className?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ number, label, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-center p-4 rounded-lg glass backdrop-blur-sm hover:scale-105 transition-all duration-300",
          className
        )}
      >
        <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
          {number}
        </div>
        <div className="text-sm text-muted-foreground">
          {label}
        </div>
      </div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }