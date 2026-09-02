// components/ui/QuantitySelector.tsx
import { Minus, Plus } from "lucide-react";

export function QuantitySelector({ qty, onChange }: { qty: number, onChange: (val: number) => void }) {
  return (
    <div className="mt-8">
      <p className="text-sm font-medium">Quantidade</p>
      <div className="mt-3 inline-flex h-12 items-center rounded-md border border-border">
        <button
          onClick={() => onChange(Math.max(1, qty - 1))}
          className="flex h-full w-12 items-center justify-center hover:bg-secondary hover:rounded-md cursor-pointer"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-12 text-center text-sm font-medium">{qty}</span>
        <button
          onClick={() => onChange(qty + 1)}
          className="flex h-full w-12 items-center justify-center hover:bg-secondary hover:rounded-md cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}