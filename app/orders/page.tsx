export default function OrdersPage() {
	return (
		<section className="min-h-[calc(100vh-80px)] bg-background px-4 py-10 md:px-20 md:py-14">
			<div className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
				<p className="text-xs uppercase tracking-[0.3em] text-black/40">Historico</p>
				<h1 className="mt-3 font-outfit text-3xl text-black md:text-5xl">Meus Pedidos</h1>
				<p className="mt-4 max-w-2xl text-sm leading-7 text-black/65 md:text-base">
					Aqui voce pode acompanhar compras anteriores, status de entrega e detalhes dos seus pedidos.
				</p>
			</div>
		</section>
	);
}