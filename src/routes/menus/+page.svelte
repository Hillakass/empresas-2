<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import { SearchX } from "@lucide/svelte";
	import food from "$lib/images/food.png";
	import hamburguesa from "$lib/images/hamburguesa.jpg";
	import cafe from "$lib/images/cafe.jpg";
	import dessert from "$lib/images/dessert.jpg";
	import jugo from "$lib/images/jugo.jpg";
	import ceviche from "$lib/images/ceviche.jpg";
	import aji from "$lib/images/aji.jpg";
	import margarita from "$lib/images/margarita.jpg";
	import americana from "$lib/images/americana.jpg";
	import lomo from "$lib/images/lomo.jpg";
	import salchipapa from "$lib/images/salchipapa.jpg";
	import chaqchao from "$lib/images/chaqchao.jpg";
	import cheesecake from "$lib/images/cheesecake.jpg";

	const categories: string[] = ["Cafeteria", "Comida Rapida", "Restaurante"];
	let currentCategory = 0;
	let searchTerm = '';

	type Dish = {
		name: string;
		description: string;
		price: string;
		img: string;
		category: string;
	};

	const allDishes: Dish[] = [
		{ name: "Cheesecake de Frutos Rojos", description: "Pastel con base crocante, relleno de queso crema y cobertura de frutos del bosque.", price: "S/ 10.00", img: cheesecake, category: "Cafeteria" },
		{ name: "Café Americano", description: "Café negro tradicional servido caliente.", price: "S/ 6.00", img: cafe, category: "Cafeteria" },
		{ name: "Jugo de Fresa", description: "Jugo natural de fresa recién exprimido, sin azúcar añadida.", price: "S/ 7.00", img: jugo, category: "Cafeteria" },
		{ name: "Salchipapa", description: "Papas fritas con trozos de salchicha y salsa huancaína casera.", price: "S/ 12.00", img: salchipapa, category: "Comida Rapida" },
		{ name: "Hamburguesa Clásica", description: "Pan artesanal, carne 100% res, queso cheddar, tomate y lechuga.", price: "S/ 18.00", img: hamburguesa, category: "Comida Rapida" },
		{ name: "Pizza Margarita", description: "Masa artesanal con salsa napolitana, queso mozzarella y albahaca fresca.", price: "S/ 20.00", img: margarita, category: "Comida Rapida" },
		{ name: "Pizza Americana", description: "Masa artesanal con queso, salsa, pepperoni y champiñones.", price: "S/ 22.00", img: americana, category: "Comida Rapida" },
		{ name: "Lomo Saltado", description: "Carne salteada con cebolla, tomate y papas fritas, acompañado de arroz.", price: "S/ 25.00", img: lomo, category: "Restaurante" },
		{ name: "Ají de Gallina", description: "Pollo desmenuzado en crema de ají amarillo con arroz blanco.", price: "S/ 22.00", img: aji, category: "Restaurante" },
		{ name: "Ceviche Mixto", description: "Pescado, calamar y mariscos en jugo de limón con ají limo y cebolla.", price: "S/ 30.00", img: ceviche, category: "Restaurante" }
	];

	$: filteredDishes = searchTerm.length > 0
		? allDishes.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
		: allDishes.filter(d => d.category === categories[currentCategory]);

	function handleChangeCategory(index: number) {
		currentCategory = index;
	}
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
		Menú
	</h1>

	<!-- Categorías -->
	<div class="scrollable flex gap-2 whitespace-nowrap mb-6">
		{#each categories as cat, index}
			<button
				type="button"
				on:click={() => handleChangeCategory(index)}
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

	<!-- Resultados -->
	<div class="mb-6">
		{#if filteredDishes.length > 0}
			{#each filteredDishes as dish}
				<div class="flex items-center gap-4 mb-4 p-4 bg-[#2a2a2a] rounded-lg shadow-md text-white">
					<img src={dish.img} alt={dish.name} class="w-20 h-20 rounded-lg object-cover" />
					<div class="flex flex-col">
						<h3 class="font-semibold">{dish.name}</h3>
						<p class="text-sm text-gray-300">{dish.description}</p>
						<p class="text-lime-400 font-semibold">{dish.price}</p>
					</div>
				</div>
			{/each}
		{:else}
			<div class="text-center text-gray-400 flex flex-col items-center gap-2 py-6">
				<SearchX size={48} class="text-red-400" />
				<p>No se encontraron platos.</p>
			</div>
		{/if}
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
