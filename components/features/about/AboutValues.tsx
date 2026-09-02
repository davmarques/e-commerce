// components/layout/AboutValues.tsx
"use client";

import { useBranding } from "@/providers/BrandingProvider";

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
  const branding = useBranding();
  const values = [
    { title: branding?.about_value_1_title || VALUES[0].title, description: branding?.about_value_1_text || VALUES[0].description },
    { title: branding?.about_value_2_title || VALUES[1].title, description: branding?.about_value_2_text || VALUES[1].description },
    { title: branding?.about_value_3_title || VALUES[2].title, description: branding?.about_value_3_text || VALUES[2].description },
  ];

  return (
    <section className="border-y border-border bg-background">
      <div className="container-tight py-16 lg:py-24 px-4 md:px-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {branding?.about_values_title || "Nossos valores"}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
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