interface FontItem {
    fontDisplay: 'auto' | 'block' | 'fallback' | 'optional' | 'swap';
    fontStyle: 'italic' | 'normal' | 'oblique' | `oblique ${number}deg ${number}deg` | `oblique ${number}deg`;
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold' | 'normal';
    preload?: boolean;
    src: `/fonts/${string}.${string}`[] | `/fonts/${string}.${string}`;
}
export type FontDefinition = Record<string, FontItem[]>;
/**
 * Preloads fonts.
 *
 * @param fontDefinitions The font definitions.
 * @returns An array of font links.
 */
export declare const preloadFonts: (fontDefinitions: FontDefinition) => JSX.Element[];
export {};
