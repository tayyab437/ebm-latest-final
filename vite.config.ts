import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import viteCompression from 'vite-plugin-compression';

function nonBlockingCssPlugin(): Plugin {
  return {
    name: 'non-blocking-css-plugin',
    transformIndexHtml: {
      order: 'post',
      handler(html: string) {
        return html.replace(
          /<link\b([^>]*?)rel=["']stylesheet["']([^>]*?)href=["']([^"']+\.css)["']([^>]*?)>/gi,
          '<link rel="preload" as="style" href="$3" crossorigin /><link rel="stylesheet" href="$3" media="print" onload="this.media=\'all\'" crossorigin /><noscript><link rel="stylesheet" href="$3" crossorigin /></noscript>'
        ).replace(
          /<link\b([^>]*?)href=["']([^"']+\.css)["']([^>]*?)rel=["']stylesheet["']([^>]*?)>/gi,
          '<link rel="preload" as="style" href="$2" crossorigin /><link rel="stylesheet" href="$2" media="print" onload="this.media=\'all\'" crossorigin /><noscript><link rel="stylesheet" href="$2" crossorigin /></noscript>'
        );
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      nonBlockingCssPlugin(),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      modulePreload: false,
      cssCodeSplit: true,
      sourcemap: true,
      minify: 'esbuild' as const,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
