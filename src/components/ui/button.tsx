import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow hover:shadow-lg hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline: "border border-glass-border bg-glass/20 backdrop-blur-sm text-glass-foreground hover:bg-glass/40 hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-glow shadow-lg hover:shadow-xl hover:scale-105",
        ghost: "hover:bg-glass/20 hover:text-glass-foreground backdrop-blur-sm hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        glass: "bg-glass/30 backdrop-blur-md border border-glass-border text-glass-foreground hover:bg-glass/50 shadow-glass hover:shadow-hover hover:scale-105",
        hero: "bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-xl hover:scale-110 border-0 animate-glow-pulse",
        success: "bg-success text-success-foreground hover:bg-success-glow shadow-success hover:shadow-xl hover:scale-105",
        gaming: "bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-lg hover:shadow-glow hover:scale-110 animate-bounce-in",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-14 rounded-xl px-10 text-base",
        xl: "h-16 rounded-xl px-12 text-lg font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
