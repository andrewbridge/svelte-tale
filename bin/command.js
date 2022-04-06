#!/usr/bin/env node

import path from 'path';
import fs from 'fs';

fs.readdirSync(path.resolve(process.argv[1] + '/../../svelte-tale/bin')).forEach(file => {
  console.log(file);
});

// TODO: check we're in a sveltekit project (need to version match?)
// TODO: check if there are files already in place
// TODO: copy route into place
// TODO: copy param matcher into place
// TODO: Option to change root path?
// TODO: Option to change regex?
// TODO: Option file?