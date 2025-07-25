/* eslint-disable array-func/prefer-array-from */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';

// eslint-disable-next-line import/extensions
import pkg from './package.json' with { type: 'json' };

const globals = {};

export default [
    {
        external: [...Object.keys({...pkg.peerDependencies} || {})],
        input: 'src/index.tsx',
        output: [
            {
                exports: 'named',
                file: pkg.exports['.'].require,
                format: 'cjs',
                globals,
                interop: 'auto',
                name: pkg.name,
                sourcemap: true
            },
            {
                dir: './dist/esm/',
                exports: 'named',
                format: 'es',
                globals,
                name: pkg.name,
                preserveModules: true,
                sourcemap: true
            }
        ],
        plugins: [
            cleaner({targets: ['./dist/']}),
            resolve({extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']}),
            commonjs({include: ['node_modules/**']}),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
                targets: {browsers: pkg.browserslist}
            })
        ]
    },
    {
        external: [...Object.keys({
            ...pkg.peerDependencies,
            ...pkg.externals
        } || {})],
        input: 'src/webpack/index.ts',
        output: [
            {
                exports: 'named',
                file: pkg.exports['./webpack'].require,
                format: 'cjs',
                globals,
                name: pkg.name,
                sourcemap: true
            },
            {
                dir: './dist/esm/webpack/',
                exports: 'named',
                format: 'es',
                globals,
                name: pkg.name,
                preserveModules: true,
                sourcemap: true
            }
        ],
        plugins: [
            resolve({extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']}),
            commonjs({include: ['node_modules/**']}),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
                targets: {node: 'current'}
            })
        ]
    }
];