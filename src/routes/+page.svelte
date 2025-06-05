<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import { LogOut, PlusCircle, SearchX } from "@lucide/svelte";
	import usuario from "$lib/images/usuario.jpg";
	import chinaWokImg from "$lib/images/china.jpg";
	import lasTiasImg from "$lib/images/tia.jpg";
	import toroLocoImg from "$lib/images/toro.jpg";

	let searchTerm = '';

	const favoritos = [
		{ name: 'China Wok', img: chinaWokImg },
		{ name: 'Las Tías', img: lasTiasImg },
		{ name: 'Toro Loco', img: toroLocoImg }
	];

	const reseñas = [
		{ name: 'China Wok', img: chinaWokImg },
		{ name: 'Las Tías', img: lasTiasImg },
		{ name: 'Toro Loco', img: toroLocoImg }
	];

	$: favoritosFiltrados = favoritos.filter((l) =>
		l.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	$: reseñasFiltradas = reseñas.filter((r) =>
		r.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<main class="max-w-5xl mx-auto px-6 py-8 space-y-6 bg-[#1e1e1e]">
	<!-- Usuario -->
	<div class="bg-white rounded-lg shadow-md p-6 text-center">
		<img src={usuario} alt="User Profile" class="w-24 h-24 rounded-full mx-auto mb-4" />
		<h2 class="text-2xl font-semibold text-gray-800">Srta. Grecia</h2>
		<p class="text-sm text-gray-600">Grecia Benavente</p>
		<p class="text-sm text-gray-600">Influencer y creadora de contenido</p>
		<p class="text-sm text-gray-600">Apasionada por inspirar y conectar con mi audiencia</p>
	</div>

	<!-- Buscador -->
	<input
		bind:value={searchTerm}
		placeholder="Buscar locales..."
		class="w-full p-3 text-black rounded-lg bg-white shadow-md mb-6"
	/>

	<!-- Locales Favoritos -->
	<section class="bg-white p-4 rounded-lg shadow-md">
		<h2 class="text-2xl font-semibold mb-4 text-gray-800">Locales Favoritos</h2>
		{#if favoritosFiltrados.length > 0}
			<div class="grid grid-cols-3 gap-4">
				{#each favoritosFiltrados as local}
					<div class="relative flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden p-4">
						<img src={local.img} alt={local.name} class="w-full h-32 object-cover" />
						<div class="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full text-center">
							<h3 class="font-semibold">{local.name}</h3>
						</div>
						<button class="absolute top-4 right-4 bg-black text-white p-2 rounded-full">
							<PlusCircle size={20} />
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center text-gray-600 flex flex-col items-center justify-center gap-2 py-6">
				<SearchX size={48} class="text-red-400" />
				<p>No se encontraron locales favoritos.</p>
			</div>
		{/if}
	</section>

	<!-- Reseñas -->
	<section class="bg-white p-4 rounded-lg shadow-md">
		<h2 class="text-2xl font-semibold mb-4 text-gray-800">Reseñas</h2>
		{#if reseñasFiltradas.length > 0}
			<div class="grid grid-cols-3 gap-4">
				{#each reseñasFiltradas as review}
					<div class="relative flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden p-4">
						<img src={review.img} alt={review.name} class="w-full h-32 object-cover" />
						<div class="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full text-center">
							<h3 class="font-semibold">{review.name}</h3>
						</div>
						<button class="absolute top-4 right-4 bg-black text-white p-2 rounded-full">
							<PlusCircle size={20} />
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center text-gray-600 flex flex-col items-center justify-center gap-2 py-6">
				<SearchX size={48} class="text-red-400" />
				<p>No se encontraron reseñas.</p>
			</div>
		{/if}
	</section>

	<!-- Cerrar sesión -->
	<div class="flex justify-center mt-8">
		<a
			href="/logout"
			class="min-h-32 bg-black text-white p-4 w-full rounded-xl flex items-center justify-center gap-2 leading-none"
		>
			<LogOut size={28} />
			Cerrar Sesión
		</a>
	</div>
</main>

<Nav />

  
  <style>
	/* Estilos personalizados */
	.bg-black {
	  background-color: #1e1e1e;
	}
  
	.bg-white {
	  background-color: #ffffff;
	}
  
	.text-gray-600 {
	  color: #718096;
	}
  
	.text-gray-800 {
	  color: #2d3748;
	}
  
	.bg-opacity-50 {
	  background-color: rgba(0, 0, 0, 0.5);
	}
  
	.text-white {
	  color: #ffffff;
	}
  
	/* Estilo de la imagen para las reseñas y favoritos */
	.w-full {
	  width: 100%;
	}
  
	.h-32 {
	  height: 8rem;
	}
  
	.object-cover {
	  object-fit: cover;
	}
  
	.rounded-lg {
	  border-radius: 0.5rem;
	}
  
	/* Ajuste de la imagen y los botones */
	.absolute {
	  position: absolute;
	}
  
	.top-4 {
	  top: 1rem;
	}
  
	.right-4 {
	  right: 1rem;
	}
  
	.bottom-0 {
	  bottom: 0;
	}
  
	.left-0 {
	  left: 0;
	}
  
	.p-2 {
	  padding: 0.5rem;
	}
  
	.font-semibold {
	  font-weight: 600;
	}
  </style>
  