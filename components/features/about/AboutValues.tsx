// components/layout/AboutValues.tsx
const VALUES = [
  {
    title: "Mínimo por intenção",
    description: "Removemos o desnecessário para que cada objeto possa cumprir sua função excepcionalmente bem."
  },
  {
    title: "Materiais duráveis",
    description: "Materiais naturais e resistentes escolhidos para ganhar personalidade com o tempo, em vez de se desgastarem."
  },
  {
    title: "Produção responsável",
    description: "Produção ética, embalagens reduzidas e parceiros que se preocupam com as pessoas e o meio ambiente."
  }
];

export function AboutValues() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="container-tight py-16 lg:py-24 px-4 md:px-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Nossos valores
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title}>
              <h3 className="font-display text-lg font-medium">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}