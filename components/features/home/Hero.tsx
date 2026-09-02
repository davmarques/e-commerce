"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/Button";
import { useBranding } from "@/providers/BrandingProvider";

export default function Hero() {
    const branding = useBranding();
    return (
        <section className="relative w-full px-4 md:px-20 py-10 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Conteúdo de Texto */}
                <div className="flex flex-col space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold font-outfit leading-tight text-white tracking-tight">
                        {branding?.hero_title || "Inovação & Estilo para seu dia a dia"}
                    </h1>
                    <p className="text-lg text-white/70 font-figtree max-w-md">
                        {branding?.hero_subtitle || "Descubra peças e soluções exclusivas desenvolvidas com máxima qualidade e precisão."}
                    </p>
                    <div className="flex space-x-4">
                        <Link href="/collections">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/40 px-6 hover:scale-[1.03]">
                                {branding?.hero_cta_text || "Comprar Agora"} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/collections">
                            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-6">
                                Ver Coleções
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Imagem de Destaque */}
                <div className="relative aspect-[4/5] md:aspect-square bg-brand-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-secondary/40">
                    <picture className="absolute inset-0 block">
                        {branding?.banner_home_mobile_url && (
                            <source media="(max-width: 767px)" srcSet={branding.banner_home_mobile_url} />
                        )}
                        <Image
                            src={branding?.banner_home_url || "/hero.jpg"}
                            alt={branding?.hero_title || "Nova Coleção"}
                            fill
                            sizes="(max-width: 767px) 100vw, 50vw"
                            unoptimized
                            className="object-cover"
                            style={{
                                objectPosition: branding?.banner_home_position || "center",
                            }}
                            priority
                        />
                    </picture>
                </div>
            </div>
        </section>
    );
}