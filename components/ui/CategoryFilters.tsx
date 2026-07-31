interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryFilters({ categories, activeCategory, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onSelect(c)}
          className={`h-9 rounded-full border border-black/10 px-4 text-sm transition-colors cursor-pointer ${c === activeCategory
              ? "border-primary border-black/50 bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}