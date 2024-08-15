import type { Compiler } from 'webpack';
/**
 * @file
 */
export declare class WatchFontsConfigPlugin {
    readonly options: {
        globalStylesPath?: string;
        outputPath?: string;
        prefix?: string;
    };
    /**
     * Constructor.
     *
     * @param options                  The options.
     * @param options.globalStylesPath The global styles path.
     * @param options.outputPath       The css file output path.
     * @param options.prefix           The font path prefix.
     */
    constructor(options: {
        globalStylesPath?: string;
        outputPath?: string;
        prefix?: string;
    });
    /**
     * Constructor.
     *
     * @param compiler The compiler.
     */
    apply(compiler: Compiler): void;
}
