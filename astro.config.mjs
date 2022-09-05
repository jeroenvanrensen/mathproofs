import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypeMath from 'rehype-math'

export default defineConfig({
    integrations: [tailwind()],
    markdown: {
        rehypePlugins: [rehypeMath, rehypeKatex]
    }
})
