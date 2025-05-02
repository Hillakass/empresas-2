import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {

	const session = cookies.get('session');
	// if (session !== '8cf7JGVw4vl4923cqg47O8HDkx3k8awRMb6vr12c4g') {
	// 	throw redirect(302, '/login');
	// }

}