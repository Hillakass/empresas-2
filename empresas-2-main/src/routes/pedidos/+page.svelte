<script>
	import Nav from "$lib/components/Nav.svelte";
    import { Eye } from "@lucide/svelte";
</script>

<main class="max-w-5xl mx-auto px-6 py-8 space-y-4">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		Historial de Pedidos
	</h1>
	<section class="flex flex-col gap-4">
		<h1 class="text-xl font-semibold">
			Por confirmar
		</h1>
		<div class="flex">
			<div class="flex flex-col gap-1 grow leading-none">
				<p class="font-semibold">Plan mensual</p>
				<p>María la del Barrio</p>
			</div>
			<a href="/" class="aspect-square">
				<Eye/>
			</a>
		</div>
	</section>
</main>
<Nav/>