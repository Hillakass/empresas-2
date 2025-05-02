<script lang="ts">
	import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
	import { CircleX, LoaderCircle } from '@lucide/svelte';

	let { form } = $props();

	let loading = $state(false);
</script>

<svelte:head>
	<title>Protein House - Login</title>
</svelte:head>

<main class="max-w-md mx-auto p-6 flex flex-col gap-8 min-h-dvh justify-center">
	<div class="flex flex-col gap-4">
		<h1 class="scroll-m-20 text-3xl font-semibold tracking-tight text-center">
			Iniciar Sesión
		</h1>
		<h2 class="scroll-m-10 text-2xl font-medium tracking-tight text-center">
			Protein House
		</h2>
	</div>
	<form
		id="login"
		class="flex flex-col gap-4"
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ result, update }) => {
				loading = false;
				update();
			}
		}}
	>
		<div class="flex flex-col gap-2">
			<Label for="username">
				Nombre de Usuario
			</Label>
			<Input
				type="text"
				id="username"
				name="username"
				value={form?.username}
				required
			/>
		</div>
		<div class="flex flex-col gap-2">
			<Label for="password">
				Contraseña
			</Label>
			<Input
				type="password"
				id="password"
				name="password"
				required
			/>
		</div>
	</form>
	<div class="flex flex-col gap-4">
		<Button form="login" type="submit" disabled={loading}>
			{#if loading}
				<LoaderCircle class="animate-spin" />
				Cargando
			{:else}
				Ingresar
			{/if}
		</Button>
		{#if form?.error}
			<p class="text-destructive bg-destructive/25 py-2 px-3 rounded-md text-sm flex items-center gap-2">
				<CircleX size={16}/>
				{form.error}
			</p>
		{/if}
	</div>
</main>