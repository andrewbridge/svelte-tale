# Svelte Tale

[Storybook](https://storybook.js.org) is a powerful tool for component driven UI development and testing, but it requires a mountain of dependencies and its Svelte integration is still a second class citizen.

Svelte Tale reimplements the core features of Storybook for any [SvelteKit](https://kit.svelte.dev/) based project to provide the conveniences of Storybook's component driven workflow and SvelteKit's speed and lightweight developer environment.

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
