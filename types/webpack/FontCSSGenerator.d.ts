/**
 * The font css generator.
 */
export declare class FontCSSGenerator {
    readonly globalStylesPath: string;
    readonly outputPath: string;
    /**
     * Constructor.
     *
     * @param globalStylesPath The global styles path.
     * @param outputPath       The css file output path.
     */
    constructor(globalStylesPath?: string, outputPath?: string);
    /**
     * Get the url string.
     *
     * @param src The source.
     * @returns The url string.
     */
    getUrlString(src: string): string;
    /**
     * Create a single line string.
     *
     * @param strings The strings.
     * @param values  The values.
     * @returns The single line string.
     */
    singleLineString(strings: TemplateStringsArray, ...values: string[]): string;
    /**
     * Generate the font css.
     */
    generate(): void;
}
