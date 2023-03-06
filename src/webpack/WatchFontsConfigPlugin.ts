import {FontCSSGenerator} from './FontCSSGenerator';

import type {Compiler} from 'webpack';

/**
 * @file
 */
export class WatchFontsConfigPlugin {
    /**
     * Constructor.
     *
     * @param compiler The compiler.
     */
    apply(compiler: Compiler) {
        compiler.hooks.afterPlugins.tap('WatchFontsConfigPlugin', () => {
            const generator = new FontCSSGenerator();

            generator.generate();
        });
        compiler.hooks.watchRun.tap('WatchFontsConfigPlugin', compilation => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!compilation.modifiedFiles) {
                return;
            }

            const [changedFile] = Array.from(compilation.modifiedFiles);

            if (!changedFile) {
                return;
            }

            if (changedFile.includes('globalStyles')) {
                const generator = new FontCSSGenerator();

                generator.generate();
            }
        });
    }
}