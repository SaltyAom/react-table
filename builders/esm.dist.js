require('esbuild')
	.build({
		entryPoints: ['./src/index.tsx'],
		outdir: './build/dist/esm',
		format: 'esm',
		bundle: true,
		minify: true,
		sourcemap: 'external',
		external: ['react'],
		keepNames: false,
		target: ['es2019']
	})
	.catch(() => process.exit(1))
