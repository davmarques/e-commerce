"use client";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function Newsletter() {
  return (
    <section className="container-tight py-16 lg:py-24">
      <div className="mx-auto max-w-xl text-center">
        <Mail className="mx-auto h-6 w-6 text-muted-foreground" />
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          Stay in the loop
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          New drops, studio notes, and early access to limited releases.
        </p>
        <form className="mt-6 px-4 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <Input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            required 
          />
          <Button
            type="submit"
            size="lg"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;