"use client";

import { useBranding } from "@/providers/BrandingProvider";

export function AboutStory() {
  const branding = useBranding();

  return (
    <>
      <section className="container-tight px-4 py-10 md:px-20 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {branding?.about_story_title || "Uma abordagem mais lenta para as coisas"}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {branding?.about_story_text || "Em vez de perseguir tendências, focamos na forma, material e função. Cada peça na coleção é escolhida por sua habilidade de envelhecer com graça e se ajustar perfeitamente a uma casa calma e considerada."}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {branding?.about_mission_title || "Feito para ser vivido"}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {branding?.about_mission_text || "Fazemos parcerias com artesãos que compartilham nosso respeito pelo ofício. De peças de cerâmica moldadas à mão a têxteis tecidos em pequenos lotes, nossos produtos são feitos para serem usados e amados por anos."}
            </p>
          </div>
        </div>
      </section>
      <section className="container-tight px-4 py-16 md:px-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            “{branding?.about_quote || "O bom design é o mínimo de design possível."}”
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground">
            — {branding?.about_quote_author || "Dieter Rams"}
          </p>
        </div>
      </section>
    </>
  );
}