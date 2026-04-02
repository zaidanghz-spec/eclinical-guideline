import * as React from "react"
import { cn } from "../../lib/utils"

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, placeholder, type, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="relative">
        <input
          type={type}
          id={inputId}
          className={cn(
            "peer h-12 w-full rounded-md border border-input bg-background px-4 pt-4 pb-1 text-sm ring-offset-background transition-all",
            "placeholder:text-transparent",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={placeholder || label}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all",
              "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base",
              "peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary",
              "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs",
              "pointer-events-none"
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
FloatingInput.displayName = "FloatingInput"

export { FloatingInput }
