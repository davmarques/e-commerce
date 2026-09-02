import type { ApiCategory, StoreBranding } from "@/app/services/api";

interface CategoriesProps {
  categories: ApiCategory[];
  branding?: StoreBranding | null;
}

export default function Categories({ categories, branding }: CategoriesProps) {
  const gridConfigs = [
    {
      gridClass: "md:col-span-2 md:row-span-2",
      bg: "bg-gradient-to-br from-brand-primary/25 via-brand-surface to-brand-background border border-brand-primary/30 hover:border-brand-primary/60 hover:shadow-brand-primary/10",
    },
    {
      gridClass: "md:col-span-1 md:row-span-1",
      bg: "bg-gradient-to-br from-brand-secondary/25 via-brand-surface to-brand-background border border-brand-secondary/30 hover:border-brand-secondary/60 hover:shadow-brand-secondary/10",
    },
    {
      gridClass: "md:col-span-1 md:row-span-2",
      bg: "bg-gradient-to-br from-brand-purple/30 via-brand-surface to-brand-background border border-brand-purple/30 hover:border-brand-purple/60 hover:shadow-brand-purple/10",
    },
    {
      gridClass: "md:col-span-1 md:row-span-1",
      bg: "bg-gradient-to-br from-brand-primary/20 via-brand-purple/20 to-brand-secondary/20 border border-white/15 hover:border-white/40",
    },
  ];

  const slotConfigs = [
    { id: branding?.category_1_id, image: branding?.category_1_image },
    { id: branding?.category_2_id, image: branding?.category_2_image },
    { id: branding?.category_3_id, image: branding?.category_3_image },
    { id: branding?.category_4_id, image: branding?.category_4_image },
  ];

  const defaultNames = ["Lançamentos", "Coleção Premium", "Acessórios", "Ofertas Especiais"];

  const displayCategories = slotConfigs.map((slot, index) => {
    const matched = slot.id ? categories.find((c) => c.id === slot.id) : null;
    const fallback = categories[index] || {
      id: `slot-${index}`,
      name: defaultNames[index] || `Categoria ${index + 1}`,
      slug: "destaque",
    };
    const cat = matched || fallback;
    const customImage = slot.image || cat.image || null;

    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug || cat.name,
      image: customImage,
    };
  });

  return (
    <section className="px-4 md:px-20 py-16">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold font-outfit text-white">
          Comprar por Categoria
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px] md:h-[700px]">
        {displayCategories.map((cat, index) => {
          const config = gridConfigs[index % gridConfigs.length];
          return (
            <a
              key={cat.id || index}
              href={`/collections?category=${encodeURIComponent(cat.name)}`}
              className={`group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.01] ${config.bg} ${config.gridClass}`}
            >
              {cat.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/75 transition-colors z-10" />
                </>
              ) : (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
              )}

              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-white text-2xl font-bold font-outfit drop-shadow-md">{cat.name}</h3>
                <span className="text-white/80 font-medium font-figtree border-b border-primary/30 group-hover:border-primary group-hover:text-white transition-all text-sm">
                  Explorar
                </span>
              </div>

              {!cat.image && (
                <div className="flex h-full w-full items-center justify-center text-white/5 text-4xl font-bold uppercase select-none">
                  {cat.name}
                </div>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}