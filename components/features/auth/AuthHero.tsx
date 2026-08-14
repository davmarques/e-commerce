export function AuthHero() {
  const benefits = [
    "Checkout mais rapido com dados salvos",
    "Historico completo de pedidos e entregas",
    "Acesso antecipado a novidades da colecao",
  ];

  return (
    <aside className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#F3F3F3] p-8 md:p-12">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-black/5 blur-2xl" />

      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/55">
          <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
          Area do cliente
        </p>

        <h1 className="mt-5 font-outfit text-4xl font-semibold leading-[1.05] tracking-tight text-black md:text-5xl">
          Sua conta,
          <br />
          do seu jeito.
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
          Entre para acompanhar pedidos, salvar favoritos e finalizar compras com menos etapas.
        </p>

        <ul className="mt-10 grid gap-3 text-sm text-black/75">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/70 px-4 py-3"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-black" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/65">
          Conta gratuita e ativacao imediata.
        </div>
      </div>
    </aside>
  );
}
