import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const SORTS = [
  { id: "featured", label: "Destaques" },
  { id: "price-asc", label: "Preço: Menor para Maior" },
  { id: "price-desc", label: "Preço: Maior para Menor" },
  { id: "name", label: "Nome: A–Z" },
] as const;

export type SortId = (typeof SORTS)[number]["id"];

interface SortSelectProps {
  value: SortId;
  onChange: (value: SortId) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Ordenar</span>
      <Select value={value} onValueChange={(val) => onChange(val as SortId)}>
        <SelectTrigger className=" cursor-pointer">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {SORTS.map((s) => (
            <SelectItem key={s.id} value={s.id} className="cursor-pointer">
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}