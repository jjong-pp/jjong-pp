import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'
import path from 'path'

// NOTE: @mdx-js/rollup 플러그인은 제거했다. src/content/articles/*.mdx 는
// content-collections 가 직접 파싱해 원문 문자열로 넘겨주고(=> src/data/notes.ts),
// .mdx 를 컴포넌트로 import 하는 곳이 한 군데도 없어서 MDX 컴파일이 통째로
// 낭비였다(빌드 로그에도 PLUGIN_TIMINGS 경고가 떴다).

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    contentCollections(),
  ],
  resolve: {
    alias: {
      'content-collections': path.resolve(__dirname, './.content-collections/generated')
    }
  }
})
