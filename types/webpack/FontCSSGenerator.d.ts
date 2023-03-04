/**
 * The font css generator.
 */
export declare class FontCSSGenerator {
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