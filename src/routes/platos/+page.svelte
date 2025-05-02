<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import { SearchX } from "@lucide/svelte";
	import food from "$lib/images/food.png";
	import dessert from "$lib/images/dessert.jpg";
	import despensa from "$lib/images/despensa.jpg";
	import chaqchao from "$lib/images/chaqchao.jpg";
	import salchipapa from "$lib/images/salchipapa.jpg";
	import cafe from "$lib/images/cafe.jpg";
	import capuccino from "$lib/images/capuccino.jpg";
	import hamburguesa from "$lib/images/hamburguesa.jpg";
	import pizza from "$lib/images/pizza.jpg";
	import aji from "$lib/images/aji.jpg";
	import snack from "$lib/images/snack.jpg";

	const categories: string[] = ["Cafeteria", "Comida Rapida", "Restaurante"];
	let currentCategory = 0;
	let searchTerm = '';

	type Point = {
		name: string;
		category: string;
		available: boolean;
		distance: string;
		status: string;
		img: string;
	};

	const pointsDestacados: Record<string, Point[]> = {
		Cafeteria: [
			{ name: "Chaqchao", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: chaqchao },
			{ name: "Café La Banca", category: "snack restaurant", available: false, distance: "500 M", status: "CERRADO", img: capuccino },
			{ name: "El Buen Café", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: cafe }
		],
		"Comida Rapida": [
			{ name: "La Casa de la Salchipapa", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: salchipapa },
			{ name: "Burger House", category: "snack restaurant", available: false, distance: "500 M", status: "CERRADO", img: hamburguesa },
			{ name: "Pizza King", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: pizza }
		],
		Restaurante: [
			{ name: "La Despensa", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: despensa },
			{ name: "Rincón del Chef", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: snack },
			{ name: "Gastronomía Peruana", category: "snack restaurant", available: false, distance: "500 M", status: "CERRADO", img: aji }
		]
	};

	let currentPoints = pointsDestacados[categories[currentCategory]];

	function handleChangeCategory(index: number) {
		currentCategory = index;
		currentPoints = pointsDestacados[categories[currentCategory]];
	}

	$: filteredPoints = currentPoints.filter((p) =>
		p.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<main class="max-w-5xl mx-auto gap-6 px-6 py-8 min-h-screen pb-24 bg-[#1e1e1e]">
	<!-- Buscador -->
	<div class="flex justify-between mb-6">
		<input
			type="text"
			placeholder="Buscar..."
			bind:value={searchTerm}
			class="px-4 py-2 rounded-lg w-full max-w-xs text-sm bg-[#3a3a3a] text-white placeholder:text-gray-400 border-none focus:outline-none"
		/>
		<span class="text-lg font-semibold text-white">S/ 0.00</span>
	</div>

	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-white">
		Categorías
	</h1>

	<!-- Categorías -->
	<div class="scrollable flex gap-2 whitespace-nowrap mb-6">
		{#each categories as cat, index}
			<button
				type="button"
				onclick={() => handleChangeCategory(index)}
				class="px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0"
				class:bg-black={currentCategory === index}
				class:text-white={currentCategory === index}
				class:bg-gray-400={currentCategory !== index}
				class:text-black={currentCategory !== index}
			>
				<div class="flex items-center justify-center gap-2">
					<img src={cat === "Cafeteria" ? food : cat === "Comida Rapida" ? dessert : chaqchao} class="w-12 h-12 rounded-lg object-cover" />
					<span>{cat}</span>
				</div>
			</button>
		{/each}
	</div>

	<!-- Puntos Destacados filtrados -->
	<div class="mb-6">
		<h2 class="text-2xl font-semibold mb-4 text-white">Points Destacados</h2>

		{#if filteredPoints.length > 0}
			{#each filteredPoints as point}
				<a href="/platos/new" class="flex items-center gap-4 mb-4 p-4 bg-[#2a2a2a] rounded-lg shadow-md">
					<img src={point.img} alt={point.name} class="w-20 h-20 rounded-lg object-cover" />
					<div class="flex flex-col text-white">
						<h3 class="font-semibold">{point.name}</h3>
						<p class="text-sm">{point.category}</p>
						<p class={point.available ? "text-lime-500 font-semibold" : "text-red-500 font-semibold"}>
							{point.status} · {point.distance}
						</p>
					</div>
					<button class="ml-auto p-2 bg-[#3a3a3a] rounded-full text-white">
						❤️
					</button>
				</a>
			{/each}
		{:else}
			<div class="text-center text-gray-400 flex flex-col items-center gap-2 py-6">
				<SearchX size={48} class="text-red-400" />
				<p>No se encontraron puntos destacados.</p>
			</div>
		{/if}
	</div>

	<!-- Recientemente Agregados -->
	<div>
		<h2 class="text-2xl font-semibold mb-4 text-white">Recientemente Agregados</h2>
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each [{ name: "Rincón el Gato", img: food }, { name: "La Casa del Sabor", img: chaqchao }] as item}
				<a href="/reseñas" class="rounded-lg overflow-hidden shadow-md">
					<img src={item.img} alt={item.name} class="w-full h-48 object-cover" />
				</a>
			{/each}
		</div>
	</div>
</main>

<Nav />
  
  <style>
	.scrollable {
	  overflow-x: auto;
	  scrollbar-width: none;
	  -ms-overflow-style: none;
	  padding-inline: 24px;
	}
  
	.scrollable::-webkit-scrollbar {
	  display: none;
	}
  </style>
  