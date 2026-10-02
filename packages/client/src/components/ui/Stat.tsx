interface StatProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  iconClassName?: string;
}

export function Stat({ icon, value, label, iconClassName }: StatProps) {
  return (
    <div className="p-4">
      <span className={iconClassName}>{icon}</span>
      <p className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-50">
        {value}
      </p>
      <p className="text-xs text-stone-500 dark:text-stone-400">{label}</p>
    </div>
  );
}