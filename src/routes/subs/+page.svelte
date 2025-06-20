<script lang="ts">
  import { SearchX, Heart, Share2 } from "@lucide/svelte"; // Importa Share2 de lucide
  import {toast, Toaster} from "sonner";  // Asegúrate de instalar la librería sonner para las notificaciones
  import food from "$lib/images/food.png";
  import Nav from "$lib/components/Nav.svelte";
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
  let showConfirmModal = false;  // Controlar el estado del modal
  let restaurantToRemove: Point | null = null; // Restaurante que se quiere eliminar

  type Point = {
    name: string;
    category: string;
    available: boolean;
    distance: string;
    status: string;
    img: string;
    isFavorite: boolean; // Propiedad para verificar si es favorito
  };

  const pointsDestacados: Record<string, Point[]> = {
    Cafeteria: [
      { name: "Chaqchao", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: chaqchao, isFavorite: true },
      { name: "Café La Banca", category: "snack restaurant", available: false, distance: "500 M", status: "CERRADO", img: capuccino, isFavorite: true },
      { name: "El Buen Café", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: cafe, isFavorite: true }
    ],
    "Comida Rapida": [
      { name: "La Casa de la Salchipapa", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: salchipapa, isFavorite: true },
      { name: "Burger House", category: "snack restaurant", available: false, distance: "500 M", status: "CERRADO", img: hamburguesa, isFavorite: true },
      { name: "Pizza King", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: pizza, isFavorite: true }
    ],
    Restaurante: [
      { name: "La Despensa", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: despensa, isFavorite: true },
      { name: "Rincón del Chef", category: "snack restaurant", available: true, distance: "500 M", status: "ABIERTO AHORA", img: snack, isFavorite: true },
      { name: "Gastronomía Peruana", category: "snack restaurant", available: false, distance: "500 M", status: "CERRADO", img: aji, isFavorite: true }
    ]
  };

  let currentPoints = pointsDestacados[categories[currentCategory]];
let showShareConfirmModal = false; // Controlar el estado del modal de confirmación para compartir
let restaurantToShare: Point | null = null; // Restaurante que se quiere compartir
  function handleChangeCategory(index: number) {
    currentCategory = index;
    currentPoints = pointsDestacados[categories[currentCategory]];
  }

  // Función para manejar el cambio de estado del favorito y eliminar el restaurante de la lista
  function toggleFavorite(point: Point, event: Event) {
    event.preventDefault();  // Prevenir la navegación o cualquier acción predeterminada
    if (point.isFavorite) {
      restaurantToRemove = point;  // Guardar el restaurante a eliminar
      showConfirmModal = true; // Mostrar el modal de confirmación
    }
  }

function confirmRemove() {
  currentPoints = currentPoints.filter(p => p.name !== restaurantToRemove!.name);
  toast.success(`"${restaurantToRemove!.name}" ha sido eliminado de favoritos.`);
  
  showConfirmModal = false;
  restaurantToRemove = null;
}
function toggleShare(point: Point, event: Event) {
  event.preventDefault();  // Prevenir la navegación o cualquier acción predeterminada
  restaurantToShare = point;  // Guardar el restaurante a compartir
  showShareConfirmModal = true; // Mostrar el modal de confirmación
}

// Confirmar compartir
function confirmShare() {
  if (restaurantToShare) {
    console.log("Confirmando el compartir para: ", restaurantToShare.name);  // Verifica si esta línea aparece en la consola

    // Mostrar las notificaciones de éxito
    toast.success(`¡Comparte con tus amigos y llévate un café gratis en ${restaurantToShare.name}!`);
    toast.success("¡Felicidades! Por compartir por primera vez en Con Yapa, te regalamos un café gratis.");
  }

  // Cerrar el modal y resetear
  showShareConfirmModal = false;
  restaurantToShare = null;
}

// Cancelar compartir
function cancelShare() {
  showShareConfirmModal = false;
  restaurantToShare = null;
}

  function cancelRemove() {
    showConfirmModal = false;
    restaurantToRemove = null;
  }

  $: filteredPoints = currentPoints.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<main class="max-w-5xl mx-auto gap-6 px-6 py-8 min-h-screen pb-24 bg-[#1e1e1e]">
  <!-- Puntos Destacados -->
  <div class="mb-6">
    <h2 class="text-2xl font-semibold mb-4 text-white">Points Destacados</h2>

    {#if currentPoints.length > 0}
      {#each currentPoints as point}
        <a href={`/platos/new ${point.name}`} class="flex items-center gap-4 mb-4 p-4 bg-[#2a2a2a] rounded-lg shadow-md">
          <img src={point.img} alt={point.name} class="w-20 h-20 rounded-lg object-cover" />
          <div class="flex flex-col text-white flex-grow">
            <h3 class="font-semibold">{point.name}</h3>
            <p class="text-sm">{point.category}</p>
            <p class={point.available ? "text-lime-500 font-semibold" : "text-red-500 font-semibold"}>
              {point.status} · {point.distance}
            </p>
          </div>

          <div class="flex gap-2">
            <button
              class="p-2 bg-[#3a3a3a] rounded-full text-white"
              on:click={(event) => toggleFavorite(point, event)}
            >
              <Heart
                size={24}
                class={point.isFavorite ? "text-red-500" : "text-red-500"}
              />
            </button>


<button
  class="p-2 bg-[#3a3a3a] rounded-full text-white"
  on:click={(event) => toggleShare(point, event)} 
>
  <Share2 size={24} class="text-white" />
</button>


          </div>
        </a>
      {/each}
    {:else}
      <div class="text-center text-gray-400 flex flex-col items-center gap-2 py-6">
        <SearchX size={48} class="text-red-400" />
        <p>No se encontraron puntos destacados.</p>
      </div>
  {/if}
</div>

  <!-- Modal de Confirmación -->
  {#if showConfirmModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Eliminar de Favoritos</h2>
        <p class="text-gray-600">¿Seguro que quieres eliminar "{restaurantToRemove?.name}" de tus favoritos?</p>
        <div class="mt-4 flex justify-between">
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg"
            on:click={confirmRemove}
          >
            Confirmar
          </button>
          <button
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            on:click={cancelRemove}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  {/if}
  <!-- Modal de Confirmación para Compartir -->
{#if showShareConfirmModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">¡Gracias por ayudar a otros a comer mejor!</h2>
      <div class="mt-4 flex justify-center">
        <button
          class="px-4 py-2 bg-green-500 text-white rounded-lg"
          on:click={confirmShare} 
        >
          ¡Genial!
        </button>
      </div>
    </div>
  </div>
{/if}



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
  button {
    cursor: pointer;  /* Añadido para que el cursor sea un puntero */
  }
</style>