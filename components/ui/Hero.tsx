import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button"; // Supondo que você tenha esse componente em components/ui

export default function Hero() {
    return (
        <section className="relative w-full px-4 md:px-20 py-10 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Conteúdo de Texto */}
                <div className="flex flex-col space-y-6">
                    <h1 className="text-xl md:text-2xl font-outfit leading-tight text-black/40">
                        Nova Coleção <br />
                        <span className="text-black italic font-bold text-5xl md:text-7xl">Verão 2024</span>
                    </h1>
                    <p className="text-lg text-black/60 font-figtree max-w-md">
                        Descubra peças exclusivas que combinam conforto e sofisticação para os dias mais quentes do ano.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="/shop">
                            <Button >
                                Comprar Agora <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/collections">
                            <Button variant="outline">
                                Ver Coleções
                            </Button>
                        </Link>
                    </div>


                </div>

                {/* Imagem de Destaque */}
                <div className="relative aspect-[4/5] md:aspect-square bg-[#F3F3F3] rounded-3xl overflow-hidden">

                    <div className="absolute inset-0 flex items-center justify-center text-black/10 text-xl font-bold">
                        <Image
                            src="/hero.jpg"
                            alt="Nova Coleção"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}