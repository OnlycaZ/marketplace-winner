"use client";

// A segmented switch built on native radios, so arrow keys and screen readers work for free.
// The pill slides with a CSS transition, which can change direction halfway.
type Props<T extends string> = {
  label: string;
  name: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
};

export function Segmented<T extends string>({ label, name, options, value, onChange, className = "" }: Props<T>) {
  const index = options.findIndex((o) => o.id === value);
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`relative grid w-full rounded-pill bg-bg p-1 shadow-card ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-pill bg-primary transition-transform duration-(--t-dur-ui) ease-out"
        style={{ width: `calc((100% - 8px) / ${options.length})`, transform: `translateX(${index * 100}%)` }}
      />
      {options.map((o) => (
        <label key={o.id} className="relative cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o.id}
            checked={o.id === value}
            onChange={() => onChange(o.id)}
            className="peer sr-only"
          />
          <span className="flex min-h-11 items-center justify-center rounded-pill px-3 text-small font-semibold text-ink-2 transition-colors duration-(--t-dur-hover) peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}
