import { cn } from "./../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "flat" | "emerald";
  as?: "div" | "section" | "article";
}

export function Card({
  children,
  className,
  variant = "default",
  as: Tag = "div",
}: CardProps) {
  const variants = {
    default:
      "bg-white ring-1 ring-stone-900/10 dark:bg-stone-900 dark:ring-white/10",
    flat: "bg-stone-50 ring-1 ring-stone-900/5 dark:bg-stone-900/50 dark:ring-white/5",
    emerald:
      "bg-emerald-50 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-100",
  };

  return (
    <Tag className={cn("rounded-[2rem] p-6 sm:p-8", variants[variant], className)}>
      {children}
    </Tag>
  );
}