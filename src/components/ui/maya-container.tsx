import * as React from "react"
import { cn } from "../../lib/utils"
import { GlassCard } from "./glass-card"
import Maya3D from "../Maya3D"

interface MayaContainerProps {
  message?: string
  showMessage?: boolean
  height?: string
  avatarPath?: string
  className?: string
  variant?: 'default' | 'hero' | 'floating'
}

const MayaContainer = React.forwardRef<HTMLDivElement, MayaContainerProps>(
  ({ message, showMessage = false, height = "400px", avatarPath, className, variant = 'default' }, ref) => {
    const variants = {
      default: "glass p-8",
      hero: "glass p-8 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-hero before:rounded-lg before:-z-10",
      floating: "glass p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
    }

    return (
      <div ref={ref} className={cn("relative", className)}>
        <GlassCard 
          variant="vibrant"
          className={cn(variants[variant], "flex items-center justify-center")}
        >
          <Maya3D
            height={height}
            avatarPath={avatarPath}
            showMessage={showMessage}
            message={message}
            className="animate-float"
          />
        </GlassCard>
        
        {variant === 'hero' && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="glass rounded-full px-4 py-2 border border-white/20 animate-bounce-in">
              <span className="text-sm font-medium text-foreground">
                Maya - Your AI Learning Companion
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
)
MayaContainer.displayName = "MayaContainer"

export { MayaContainer }