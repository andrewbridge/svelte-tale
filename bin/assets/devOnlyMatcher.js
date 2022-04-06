import { dev } from '$app/env';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return dev && param.startsWith('storybook');
}