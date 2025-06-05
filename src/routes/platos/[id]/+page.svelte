<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import { Star } from "@lucide/svelte"; // Usamos los iconos de Lucide
	import salchipapa from "$lib/images/salchipapa.jpg"; // Imagen del restaurante
	import usuarioAvatar from "$lib/images/usuario.jpg"; // Avatar de usuario
	
	// Definimos las categorías con un tipo específico
	type ReviewCategory = "Atencion" | "Comida" | "Ambiente" | "Limpieza";
  
	// Definimos el tipo para las reseñas de cada categoría
	type Review = {
	  reviewer: string;
	  rating: number;
	  comment: string;
	  avatar: string; // Foto de perfil del usuario
	};
  
	// Datos del restaurante con categorías de reseñas
	let restaurant = {
	  name: "La Casa de la Salchipapa",  // Nombre actualizado del restaurante
	  img: salchipapa, // Usamos la imagen importada del restaurante
	  category: "Snack Restaurante",  // Categoría actualizada
	  status: "ABIERTO AHORA",
	  distance: "500 M",
	  price: 12,
	  reviews: {
		Atencion: [
		  { reviewer: "Camila", rating: 5, comment: "Muy atentos, excelente comida!", avatar: usuarioAvatar },
		  { reviewer: "Roberto", rating: 4, comment: "Buen trato y rapidez.", avatar: usuarioAvatar }
		],
		Comida: [
		  { reviewer: "Umay", rating: 5, comment: "Buena carne y porciones grandes.", avatar: usuarioAvatar },
		  { reviewer: "Juan", rating: 4, comment: "El sabor es excelente, aunque un poco caro.", avatar: usuarioAvatar }
		],
		Ambiente: [
		  { reviewer: "Pedro", rating: 5, comment: "Muy agradable y cómodo, la música excelente.", avatar: usuarioAvatar },
		  { reviewer: "Sofia", rating: 4, comment: "El ambiente es muy bueno, pero un poco ruidoso.", avatar: usuarioAvatar }
		],
		Limpieza: [
		  { reviewer: "Lucas", rating: 5, comment: "Muy limpio y ordenado.", avatar: usuarioAvatar },
		  { reviewer: "Maria", rating: 4, comment: "Buena limpieza, aunque faltan más baños.", avatar: usuarioAvatar }
		]
	  }
	};
  
	// Variables para la categoría seleccionada
	let currentCategory: ReviewCategory = "Comida"; // Comida será la categoría inicial
  
	// Datos para la nueva reseña
	let newReview = {
	  reviewer: "Srta. Grecia", // Nombre del usuario (estático)
	  rating: 1,
	  comment: "",
	  category: currentCategory as ReviewCategory,
	  avatar: usuarioAvatar // Foto del perfil del usuario
	};
  
	// Función para manejar la reseña nueva
	function submitReview() {
	  if (newReview.reviewer && newReview.comment) {
		// Simulación de agregar la nueva reseña a la categoría seleccionada
		restaurant.reviews[newReview.category].push({
		  reviewer: newReview.reviewer,
		  rating: newReview.rating,
		  comment: newReview.comment,
		  avatar: newReview.avatar // Agregamos la foto del usuario
		});
  
		// Limpiar el formulario después de agregar la reseña
		newReview = { reviewer: "Srta. Grecia", rating: 1, comment: "", category: currentCategory, avatar: usuarioAvatar };
	  } else {
		alert("Por favor complete todos los campos.");
	  }
	}
  </script>
  
  <main class="max-w-5xl mx-auto gap-6 px-6 py-8 min-h-screen pb-24 bg-[#1e1e1e]">
	<!-- Foto y nombre del restaurante -->
	<div class="mb-6 text-center">
	  <img src={restaurant.img} alt={restaurant.name} class="w-full h-48 object-cover rounded-lg shadow-md" />
	  <h1 class="text-4xl font-extrabold text-white mb-2">{restaurant.name}</h1>
	  <p class="text-xl text-white">{restaurant.category} - {restaurant.status} · {restaurant.distance} · S/ {restaurant.price}</p>
	</div>
  
	<!-- Categorías con scroll horizontal -->
	<h2 class="text-2xl font-semibold mb-4 text-white">Reseñas por Categoría</h2>
	<div class="scrollable flex gap-4 mb-6">
	  {#each Object.keys(restaurant.reviews) as category}
		<button
		  type="button"
		  on:click={() => currentCategory = category as ReviewCategory}
		  class="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
		  class:bg-black={currentCategory === category}
		  class:text-white={currentCategory === category}
		  class:bg-gray-400={currentCategory !== category}
		  class:text-black={currentCategory !== category}
		>
		  {category}
		</button>
	  {/each}
	</div>
  
	<!-- Reseñas para la categoría seleccionada -->
	<div class="bg-[#2a2a2a] p-4 rounded-lg mb-6">
	  {#each restaurant.reviews[currentCategory] as review}
		<div class="mb-4 text-white">
		  <div class="flex items-center gap-2 mb-2">
			<img src={review.avatar} alt={review.reviewer} class="w-8 h-8 rounded-full" /> <!-- Usamos la foto de perfil en cada reseña -->
			<p class="font-semibold">{review.reviewer} ({review.rating} estrellas)</p>
		  </div>
		  <p>{review.comment}</p>
		</div>
	  {/each}
	</div>
  
	<!-- Formulario para agregar una nueva reseña -->
	<h2 class="text-2xl font-semibold mb-4 text-white">Agregar una nueva reseña</h2>
	<div class="bg-[#2a2a2a] p-4 rounded-lg">
	  <!-- Nombre del usuario como subtítulo -->
	  <div class="mb-4 text-white">
		<p class="text-sm font-semibold">Usuario: {newReview.reviewer}</p>
	  </div>
  
	  <!-- Selector de categoría -->
	  <div class="mb-4 text-white">
		<label for="category" class="block text-sm mb-2">Selecciona la categoría</label>
		<select 
		  id="category"
		  bind:value={newReview.category}
		  class="w-full px-4 py-2 text-sm bg-[#3a3a3a] text-white placeholder:text-gray-400 border-none rounded-lg focus:outline-none"
		>
		  {#each Object.keys(restaurant.reviews) as category}
			<option value={category}>{category}</option>
		  {/each}
		</select>
	  </div>
  
	  <!-- Estrellas de la puntuación -->
	  <div class="mb-4 text-white">
		<label for="rating" class="block text-sm mb-2">Tu puntuación</label>
		<div class="flex items-center gap-1">
		  {#each [1, 2, 3, 4, 5] as star}
			<button
			  type="button"
			  on:click={() => newReview.rating = star}
			  class={star <= newReview.rating ? "text-yellow-400" : "text-gray-400"}
			>
			  <Star class="w-5 h-5" />
			</button>
		  {/each}
		</div>
	  </div>
  
	  <!-- Comentario -->
	  <div class="mb-4 text-white">
		<label for="comment" class="block text-sm mb-2">Tu comentario</label>
		<textarea 
		  id="comment"
		  bind:value={newReview.comment}
		  class="w-full px-4 py-2 text-sm bg-[#3a3a3a] text-white placeholder:text-gray-400 border-none rounded-lg focus:outline-none"
		  placeholder="Escribe tu comentario"
		  rows="4"
		></textarea>
	  </div>
  
	  <button 
		on:click={submitReview}
		class="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all"
	  >
		Enviar reseña
	  </button>
	</div>
  </main>
  
  <Nav/>
  
  <style>
	/* Estilos personalizados */
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
  