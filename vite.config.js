// Vite dependency
import { defineConfig } from 'vite';
import { resolve } from 'path';
// Vue
import vue from '@vitejs/plugin-vue';
// Configurations
export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			input: {
				apply: resolve(__dirname, 'apply.html'),
				space: resolve(__dirname, 'space.html')
			}
		}
	},
})
