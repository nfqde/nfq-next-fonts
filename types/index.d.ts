import React from 'react';
export interface FontItem {
    fontDisplay: 'auto' | 'block' | 'fallback' | 'optional' | 'swap';
    fontStyle: 'italic' | 'normal' | 'oblique' | `oblique ${number}deg ${number}deg` | `oblique ${number}deg`;
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold' | 'normal';
    preload?: boolean;
    src: `/fonts/${string}.${string}`[] | `/fonts/${string}.${string}`;
}
export type FontDefinition<Type extends Record<string, FontItem[]>> = {
    [Property in keyof Type]: FontItem[];
};
export type FontList<Type> = {
    [Property in keyof Type]: `'${string}', Arial, sans-serif`;
};
/**
 * Configuration Helper for fonts.
 *
 * @param config The font configuration.
 * @returns The font configuration.
 */
export declare const configureFonts: <T extends FontDefinition<T>>(config: T) => T;
/**
 * Gets the font theme.
 *
 * @param config The font configuration.
 * @returns The font theme.
 */
export declare const getFontThemeList: <T extends FontDefinition<T>>(config: T) => FontList<T>;
interface Options {
    prefix?: string;
}
/**
 * Preloads fonts.
 *
 * @param fontDefinitions The font definitions.
 * @param options         The options.
 * @param options.prefix  An optional font prefix for the url.
 *
 * @returns An array of font links.
 */
export declare const preloadFonts: (fontDefinitions: FontDefinition<Record<string, FontItem[]>>, { prefix }?: Options) => React.JSX.Element[];
export {};
