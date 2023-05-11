import {FontCSSGenerator} from './FontCSSGenerator';

import type {Compiler} from 'webpack';

/**
 * @file
 */
export class WatchFontsConfigPlugin {
    /**
     * Constructor.
     *
     * @param options                  The options.
     * @param options.globalStylesPath The global styles path.
     * @param options.outputPath       The css file output path.
     */
    constructor(readonly options: {globalStylesPath?: string; outputPath?: string}) {}

    /**
     * Constructor.
     *
     * @param compiler The compiler.
     */
    apply(compiler: Compiler) {
        compiler.hooks.afterPlugins.tap('WatchFontsConfigPlugin', () => {
            const generator = new FontCSSGenerator(this.options.globalStylesPath, this.options.outputPath);

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
                const generator = new FontCSSGenerator(this.options.globalStylesPath, this.options.outputPath);

                generator.generate();
            }
        });
    }
}