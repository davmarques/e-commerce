"use client";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useBranding } from "@/providers/BrandingProvider";

function Newsletter() {
  const branding = useBranding();
  return (
    <section className="container-tight py-16 lg:py-24">
      <div className="mx-auto max-w-xl text-center">
        <Mail className="mx-auto h-7 w-7 text-brand-primary" />
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {branding?.newsletter_title || "Fique por dentro das novidades"}
        </h2>
        <p className="mt-2 text-sm text-white/60">
          {branding?.newsletter_subtitle || "Lançamentos exclusivos, descontos e novidades diretamente no seu e-mail."}
        </p>
        <form className="mt-6 px-4 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <Input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            required 
            className="bg-brand-surface text-white border-white/20 placeholder:text-white/40 focus-visible:border-brand-primary h-12 rounded-xl"
          />
          <Button
            type="submit"
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/40 rounded-xl font-medium px-8 h-12 shrink-0 hover:scale-[1.03] transition-all duration-200 ease-in-out"
          >
            {branding?.newsletter_cta_text || "Inscrever-se"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;