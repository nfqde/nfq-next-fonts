import type { Compiler } from 'webpack';
/**
 * @file
 */
export declare class WatchFontsConfigPlugin {
    readonly options: {
        globalStylesPath?: string;
    };
    /**
     * Constructor.
     *
     * @param options                  The options.
     * @param options.globalStylesPath The global styles path.
     */
    constructor(options: {
        globalStylesPath?: string;
    });
    /**
     * Constructor.
     *
     * @param compiler The compiler.
     */
    apply(compiler: Compiler): void;
}
