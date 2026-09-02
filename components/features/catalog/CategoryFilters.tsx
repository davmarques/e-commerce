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
          className={`h-9 rounded-full px-4 text-sm transition-all cursor-pointer ${c === activeCategory
              ? "bg-brand-primary text-white font-semibold shadow-md shadow-brand-primary/20"
              : "border border-white/15 bg-brand-surface text-white/70 hover:text-white hover:border-white/30"
            }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}