import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypeMath from 'rehype-math'

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), vue()],
    markdown: {
        rehypePlugins: [rehypeMath, rehypeKatex]
    }
})
