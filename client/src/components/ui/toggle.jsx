"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "tailwindShadcn.config.jsinline-flex tailwindShadcn.config.jsitems-center tailwindShadcn.config.jsjustify-center tailwindShadcn.config.jsrounded-md tailwindShadcn.config.jstext-sm tailwindShadcn.config.jsfont-medium tailwindShadcn.config.jsring-offset-background tailwindShadcn.config.jstransition-colors hover:tailwindShadcn.config.jsbg-muted hover:tailwindShadcn.config.jstext-muted-foreground focus-visible:tailwindShadcn.config.jsoutline-none focus-visible:tailwindShadcn.config.jsring-2 focus-visible:tailwindShadcn.config.jsring-ring focus-visible:tailwindShadcn.config.jsring-offset-2 disabled:tailwindShadcn.config.jspointer-events-none disabled:tailwindShadcn.config.jsopacity-50 data-[state=on]:tailwindShadcn.config.jsbg-accent data-[state=on]:tailwindShadcn.config.jstext-accent-foreground",
  {
    variants: {
      variant: {
        default: "tailwindShadcn.config.jsbg-transparent",
        outline:
          "tailwindShadcn.config.jsborder tailwindShadcn.config.jsborder-input tailwindShadcn.config.jsbg-transparent hover:tailwindShadcn.config.jsbg-accent hover:tailwindShadcn.config.jstext-accent-foreground",
      },
      size: {
        default: "tailwindShadcn.config.jsh-10 tailwindShadcn.config.jspx-3",
        sm: "tailwindShadcn.config.jsh-9 tailwindShadcn.config.jspx-2.5",
        lg: "tailwindShadcn.config.jsh-11 tailwindShadcn.config.jspx-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
