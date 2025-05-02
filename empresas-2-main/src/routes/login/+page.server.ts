import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('session');
	if (session === '8cf7JGVw4vl4923cqg47O8HDkx3k8awRMb6vr12c4g') {
		throw redirect(302, '/');
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		await new Promise(resolve => setTimeout(resolve, 1000));

		if (username !== "admin") {
			return fail(400, { username, error: "Usuario o contraseña incorrectos" });
		}

		if (username !== 'admin' || password !== 'admin') {
			return fail(400, { username, error: 'Usuario o contraseña incorrectos' });
		}

		// Guardar sesión simple
		cookies.set('session', '8cf7JGVw4vl4923cqg47O8HDkx3k8awRMb6vr12c4g', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true, // cambia a true en producción
			maxAge: 60 * 60 * 24
		});

		throw redirect(302, '/');
	}
} satisfies Actions;