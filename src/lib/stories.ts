import type { StoryConfiguration } from "src/app";
import { getContext, setContext } from "svelte";

const getDefaultArgs = ({ argTypes }: StoryConfiguration) => {
    const defaultArgs = {};
    if (typeof argTypes !== 'object' || argTypes === null) return defaultArgs;
    Object.entries(argTypes).forEach(([name, config]) => {
        if ('default' in config) {
            defaultArgs[name] = config.default;
        }
    })
    return defaultArgs;
}

export const toPath = (title) => title.split('/').map(str => (str.toLowerCase().match(/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g) || []).join('-')).join('/');

const storyContextKey = Symbol();
export const createStory = (options) => {
    const context = {
        title: 'Story',
        argTypes: {},
        ...options,
        defaultArgs: getDefaultArgs(options),
    };
    setContext(storyContextKey, context);
}

export const getStoryContext = () => getContext<StoryConfiguration>(storyContextKey);
