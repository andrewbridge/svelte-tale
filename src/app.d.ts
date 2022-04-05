/// <reference types="@sveltejs/kit" />

import type { SvelteComponent } from "svelte";

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

type ArgType = {
	// The type of input to use for interactive control of this argument
	control: 'text' | 'number';
	// The default value for this argument within stories
	default?: unknown;
	// A human readable description of the argument
	description?: string;
	// A human readable name for the argument
	name?: string;
}
type ArgTypes = { [typeName: string]: ArgType };

interface StoryConfiguration {
	// The name used in navigation and headings for story documents
	title: string;
	// The group used to nest documents in storybook navigation. Default "Components"
	group?: string;
	// The core component used by this story. Allows stories without markup. Optional
	component?: Partial<SvelteComponent>;
	// The arguments used by the core component. Provides the interactive component controls.
	argTypes?: ArgTypes;
	// Defines the given story as the default view to be shown in the interactive interface.
	// The first story found to define this as `true` will be used
	isStorybookDefault?: boolean;
}

interface ParsedStoryConfiguration extends StoryConfiguration {
	defaultArgs: { [typeName: string ]: ArgType['default'] }
}