import { Clock3 } from "lucide-react";
import { Card } from "../../../components/ui/Card";

interface InstructionsPanelProps {
  steps: string[];
  title: string;
  stepLabel: string;
}

export function InstructionsPanel({
  steps,
  title,
  stepLabel,
}: InstructionsPanelProps) {
  return (
    <Card as="section" variant="flat">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Clock3 size={21} />
        </span>
        <div>
          <h2 className="font-serif text-2xl font-semibold">{title}</h2>
          <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
            {steps.length}{" "}
            {steps.length === 1 ? stepLabel : `${stepLabel}s`}
          </p>
        </div>
      </div>

      <ol className="mt-8 space-y-7">
        {steps.map((step, index) => (
          <li key={`${index}-${step.slice(0, 20)}`} className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-200 text-sm font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="pt-1 text-sm leading-7 text-stone-600 dark:text-stone-400">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </Card>
  );
}