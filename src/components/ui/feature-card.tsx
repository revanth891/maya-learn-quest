import * as React from "react"
import { cn } from "../../lib/utils"
import { GlassCard } from "./glass-card"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  variant?: 'default' | 'vibrant' | 'subtle'
  className?: string
  onClick?: () => void
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ title, description, icon, variant = 'default', className, onClick }, ref) => {
    const variants = {
      default: "glass hover:shadow-lg",
      vibrant: "glass bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:shadow-xl",
      subtle: "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
    }

    return (
      <GlassCard
        ref={ref}
        className={cn(
          "p-8 cursor-pointer transition-all duration-300 hover:scale-105 group",
          variants[variant],
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-start space-x-4">
          {icon && (
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <div className="text-primary-foreground">
                {icon}
              </div>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </GlassCard>
    )
  }
)
FeatureCard.displayName = "FeatureCard"

export { FeatureCard }