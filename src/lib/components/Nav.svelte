<script>
	import { page } from "$app/state";
	import { House, Package, Salad, SquarePen, Truck, UsersRound } from "@lucide/svelte";

	const routes = [
		{
			name: "Perfil",
			icon: House,
			href: "/",
		},
		{
			name: "Inicio",
			icon: Salad,
			href: "/platos",
		},
		{
			name: "Mis Favoritos",
			icon: UsersRound,
			href: "/subs",
		},
		{
			name: "Nuevos",
			icon: Package,
			href: "/menus",
		},
	];
</script>

<div class="fixed bottom-0 left-0 right-0 border-t-2 bg-white">
	<nav class="px-6 py-2 max-w-5xl mx-auto flex items-center justify-between text-xs font-medium ">
		{#each routes as route}
			<a
				href={route.href}
				class="flex flex-col items-center opacity-50"
				aria-current={page.url.pathname === route.href}
			>
				<svelte:component this={route.icon} />
				{route.name}
			</a>
		{/each}
	</nav>
</div>

<style>
	a[aria-current="true"] {
		opacity: 1;
	}
	a:hover {
		opacity: 0.75;
	}
</style>