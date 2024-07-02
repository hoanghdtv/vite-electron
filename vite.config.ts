import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const resolver = require('./thing-editor/electron-main/resolver/resolver.js');

const IS_CI_RUN = process.env.IS_CI_RUN === 'true';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	base: './',
	server: {
		hmr: false,
		watch: IS_CI_RUN ? {
			ignored: [
				'**/**'

			]
		} : {
			ignored: [
				'**/node_modules/**',
				'games/**/.tmp/**',
				'games/**/debug/**',
				'games/**/release/**'
			]
		}
	},
	plugins: [
		resolver,react()
	],
	esbuild: {
		keepNames: true
	},
	resolve: {
		dedupe: [
			'thing-editor/**'
		],
		preserveSymlinks: true,
		alias: {
			'fs': __dirname + '/thing-editor/electron-main/empty-module.js',
			'path': __dirname + '/thing-editor/electron-main/empty-module.js',
			'os': __dirname + '/thing-editor/electron-main/empty-module.js',
			'libs': __dirname + '/libs',
			'games': __dirname + '/games',
			'thing-editor': __dirname + '/thing-editor',
			'pixi.js': __dirname + '/node_modules/pixi.js/dist/pixi.mjs'
		}
	},
	build: {
		outDir: "dist",
		minify: false
	}
});