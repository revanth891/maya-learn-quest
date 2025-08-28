import * as React from "react"
import { cn } from "../../lib/utils"
import { Progress } from "./progress"
import { GlassCard } from "./glass-card"

interface ProgressCardProps {
  title: string
  value: number
  maxValue?: number
  description?: string
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'primary'
  className?: string
}

const ProgressCard = React.forwardRef<HTMLDivElement, ProgressCardProps>(
  ({ title, value, maxValue = 100, description, icon, variant = 'default', className }, ref) => {
    const percentage = Math.min((value / maxValue) * 100, 100)
    
    const variants = {
      default: {
        iconBg: "bg-primary/20",
        iconColor: "text-primary",
        progressBg: "bg-primary"
      },
      success: {
        iconBg: "bg-success/20", 
        iconColor: "text-success",
        progressBg: "bg-success"
      },
      warning: {
        iconBg: "bg-warning/20",
        iconColor: "text-warning", 
        progressBg: "bg-warning"
      },
      primary: {
        iconBg: "bg-gradient-primary",
        iconColor: "text-primary-foreground",
        progressBg: "bg-gradient-primary"
      }
    }

    const variantStyles = variants[variant]

    return (
      <GlassCard 
        ref={ref}
        variant="elevated"
        className={cn("p-6 hover:scale-105 transition-all duration-300", className)}
      >
        <div className="flex items-center space-x-3 mb-3">
          {icon && (
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              variantStyles.iconBg
            )}>
              <div className={variantStyles.iconColor}>
                {icon}
              </div>
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{value}/{maxValue}</span>
          </div>
          <Progress 
            value={percentage} 
            className={cn("h-2", variant === 'primary' && "bg-primary/20")}
          />
        </div>
      </GlassCard>
    )
  }
)
ProgressCard.displayName = "ProgressCard"

export { ProgressCard }