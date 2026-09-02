// frontend/app/about/page.tsx
import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import { AboutHero } from "@/components/features/about/AboutHero";
import { AboutValues } from "@/components/features/about/AboutValues";
import { AboutStory } from "@/components/features/about/AboutStory";
import { fetchStoreBranding } from "@/app/services/api";

export const metadata: Metadata = {
  title: "Sobre — STORMS development",
  description: "Conheça a STORMS development, nossa história, tecnologia, valores e compromisso com a excelência.",
  openGraph: {
    title: "Sobre — STORMS development",
    description: "Conheça a STORMS development, nossa história, tecnologia, valores e compromisso com a excelência.",
    type: "website",
  },
};

export default function AboutPage() {
  const brandingPromise = fetchStoreBranding();

  return <AboutPageContent brandingPromise={brandingPromise} />;
}

async function AboutPageContent({ brandingPromise }: { brandingPromise: ReturnType<typeof fetchStoreBranding> }) {
  const branding = await brandingPromise;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <AboutHero />

        {/* Imagem de Destaque */}
        <section className="container-tight py-10 lg:py-14 px-4 md:px-20">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-secondary lg:aspect-[21/9]">
            <img
              src={branding?.about_image_url || "/images/about.jpg"}
              alt={branding?.about_title || "Estúdio de design Forma com objetos minimalistas curados"}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <AboutStory />

        <AboutValues />

      </main>

      <Footer />
    </div>
  );
}