import { forwardRef, type ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "./../../lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500/40",
  secondary:
    "border border-stone-200 bg-white text-stone-700 hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400",
  ghost:
    "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100",
  danger:
    "bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-500/40",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500/40",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-9 px-3 py-2 text-xs rounded-lg gap-1.5",
  md: "min-h-11 px-4 py-3 text-sm rounded-xl gap-2",
  lg: "min-h-12 px-6 py-3.5 text-base rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  ),
);
Button.displayName = "Button";