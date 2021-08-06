require('esbuild')
	.build({
		entryPoints: ['./src/index.tsx'],
		outdir: './build',
		format: 'cjs',
		bundle: true,
		minify: false,
		sourcemap: 'external',
        external: ['react'],
        keepNames: false,
		target: ['es2019']
	})
	.catch(() => process.exit(1))
