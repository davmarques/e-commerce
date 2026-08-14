import type { ApiCategory } from "@/app/services/api";

interface CategoriesProps {
  categories: ApiCategory[];
}

export default function Categories({ categories }: CategoriesProps) {
  // Cores e tamanhos estáticos para o grid, mapeados por index se necessário
  const gridConfigs = [
    { gridClass: "md:col-span-2 md:row-span-2", bg: "bg-neutral-100" },
    { gridClass: "md:col-span-1 md:row-span-1", bg: "bg-neutral-200" },
    { gridClass: "md:col-span-1 md:row-span-2", bg: "bg-neutral-300" },
    { gridClass: "md:col-span-1 md:row-span-1", bg: "bg-neutral-100" },
  ];

  return (
    <section className="px-4 md:px-20 py-16 bg-[#fafafa]">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold font-outfit text-black">
          Comprar por Categoria
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px] md:h-[700px]">
        {categories.slice(0, 4).map((cat, index) => {
          const config = gridConfigs[index % gridConfigs.length];
          return (
            <a
              key={cat.id}
              href={`/collections?category=${cat.name}`}
              className={`group relative overflow-hidden rounded-3xl ${config.bg} ${config.gridClass}`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10" />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-white text-2xl font-bold font-outfit">{cat.name}</h3>
                <span className="text-white/80 font-medium font-figtree border-b border-white/40 group-hover:border-white transition-all">
                  Explorar
                </span>
              </div>
              <div className="flex h-full w-full items-center justify-center text-black/5 text-4xl font-bold uppercase">
                {cat.name}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}