// components/layout/AboutHero.tsx
export function AboutHero() {
  return (
    <section className="border-b border-border">
      <div className="container-tight py-16 lg:py-24 px-4 md:px-20">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Nossa história
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Feito para a forma como vivemos hoje
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          A Forma começou com uma crença simples: os objetos que usamos todos os dias devem ser discretos, 
          bonitos e feitos para durar. Projetamos e selecionamos itens essenciais que reduzem a desordem 
          e adicionam significado aos rituais diários.
        </p>
      </div>
    </section>
  );
}