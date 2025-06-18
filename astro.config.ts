import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

// Remove the loadEnv import and function call
// const { /* ... */ } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// Directly access process.env for each variable
const GISCUS_REPO = process.env.GISCUS_REPO;
const GISCUS_REPO_ID = process.env.GISCUS_REPO_ID;
const GISCUS_CATEGORY = process.env.GISCUS_CATEGORY;
const GISCUS_CATEGORY_ID = process.env.GISCUS_CATEGORY_ID;
const GISCUS_MAPPING = process.env.GISCUS_MAPPING;
const GISCUS_STRICT = process.env.GISCUS_STRICT;
const GISCUS_REACTIONS_ENABLED = process.env.GISCUS_REACTIONS_ENABLED;
const GISCUS_EMIT_METADATA = process.env.GISCUS_EMIT_METADATA;
const GISCUS_LANG = process.env.GISCUS_LANG;
const GISCUS_POSITION = process.env.GISCUS_POSITION;
const GISCUS_THEME = process.env.GISCUS_THEME;
const GISCUS_LAZY = process.env.GISCUS_LAZY;

// https://astro.build/config
const config = defineConfig({
  site: 'https://vallev.me',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'Vaughn Valle',
      openGraph: {
        home: {
          title: 'Vaughn Valle',
          description: 'Vaughn\'s personal website'
        },
        blog: {
          title: 'Blog',
          description: 'Let\'s talk about fun things!'
        },
        projects: {
          title: 'Projects'
        }
      },
      
      giscus: {
        // These are correctly using the variables now
        repository: GISCUS_REPO,
        repositoryId: GISCUS_REPO_ID,
        category: GISCUS_CATEGORY,
        categoryId: GISCUS_CATEGORY_ID,
        mapping: GISCUS_MAPPING as any, // Keep type assertion if needed
        strict: GISCUS_STRICT === "true",
        reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true",
        emitMetadata: GISCUS_EMIT_METADATA === "true",
        lang: GISCUS_LANG,
        commentsInput: GISCUS_POSITION,
        theme: GISCUS_THEME,
        loading: GISCUS_LAZY === "true",
      }
      
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});

export default config;
