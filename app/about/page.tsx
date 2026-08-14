// frontend/app/about/page.tsx
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import { AboutHero } from "@/components/features/about/AboutHero";
import { AboutValues } from "@/components/features/about/AboutValues";

export const metadata: Metadata = {
  title: "Sobre — Forma",
  description: "A Forma é uma marca de itens essenciais minimalistas. Conheça nossa história, valores e compromisso com o design atemporal.",
  openGraph: {
    title: "Sobre — Forma",
    description: "A Forma é uma marca de itens essenciais minimalistas. Conheça nossa história, valores e compromisso com o design atemporal.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <AboutHero />

        {/* Imagem de Destaque */}
        <section className="container-tight py-10 lg:py-14 px-4 md:px-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-secondary lg:aspect-[21/9]">
            <img
              src="/images/about.jpg"
              alt="Estúdio de design Forma com objetos minimalistas curados"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Grid de Texto */}
        <section className="container-tight py-10 lg:py-14 px-4 md:px-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Uma abordagem mais lenta para as coisas
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Em vez de perseguir tendências, focamos na forma, material e função. Cada peça 
                na coleção é escolhida por sua habilidade de envelhecer com graça e se ajustar 
                perfeitamente a uma casa calma e considerada.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Feito para ser vivido
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Fazemos parcerias com artesãos que compartilham nosso respeito pelo ofício. De 
                peças de cerâmica moldadas à mão a têxteis tecidos em pequenos lotes, nossos 
                produtos são feitos para serem usados — e amados — por anos.
              </p>
            </div>
          </div>
        </section>

        <AboutValues />

        {/* Quote Final */}
        <section className="container-tight py-16 lg:py-24 px-4 md:px-20">
          <div className="mx-auto max-w-2xl text-center">
            <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              “O bom design é o mínimo de design possível.”
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">— Dieter Rams</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}