
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform hover:scale-105 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-kano-primary to-kano-secondary text-white hover:from-kano-primary/90 hover:to-kano-secondary/90 shadow-md hover:shadow-xl",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-xl",
        outline: "border-2 border-kano-primary bg-transparent text-kano-primary hover:bg-kano-primary hover:text-white shadow-sm hover:shadow-md",
        secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-kano-dark hover:from-gray-200 hover:to-gray-300 shadow-sm hover:shadow-md",
        ghost: "text-kano-primary hover:bg-kano-primary/10 hover:text-kano-primary",
        link: "text-kano-primary underline-offset-4 hover:underline hover:text-kano-secondary",
        accent: "bg-gradient-to-r from-kano-accent to-yellow-500 text-kano-dark hover:from-kano-accent/90 hover:to-yellow-500/90 shadow-md hover:shadow-xl font-bold",
        white: "bg-white text-kano-primary border-2 border-white hover:bg-kano-primary hover:text-white shadow-md hover:shadow-xl",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 py-2 text-sm",
        lg: "h-14 rounded-xl px-8 py-4 text-lg font-bold",
        icon: "h-12 w-12 rounded-xl",
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
