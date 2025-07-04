import React from 'react';

type FontWeights = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type FontItem<T extends boolean = false> = T extends false ? {
    fontDisplay: 'auto' | 'block' | 'fallback' | 'optional' | 'swap';
    fontStyle: 'italic' | 'normal' | 'oblique' | `oblique ${number}deg ${number}deg` | `oblique ${number}deg`;
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold' | 'normal';
    preload?: boolean;
    src: `/fonts/${string}.${string}`[] | `/fonts/${string}.${string}`;
    variable: T;
} : {
    fontDisplay: 'auto' | 'block' | 'fallback' | 'optional' | 'swap';
    fontStyle: 'italic' | 'normal' | 'oblique' | `oblique ${number}deg ${number}deg` | `oblique ${number}deg`;
    fontWeight: `${FontWeights} ${FontWeights}`;
    preload?: boolean;
    src: `/fonts/${string}.${string}`[] | `/fonts/${string}.${string}`;
    variable: T;
};

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
export const configureFonts = <T extends FontDefinition<T>>(config: T): T => config;

/**
 * Gets the font theme.
 *
 * @param config The font configuration.
 * @returns The font theme.
 */
export const getFontThemeList = <T extends FontDefinition<T>>(config: T): FontList<T> => Object.fromEntries(
    Object.entries(config).map(([key]) => [key, `'${key}', Arial, sans-serif`])
) as FontList<T>;

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
export const preloadFonts = (
    fontDefinitions: FontDefinition<Record<string, FontItem[]>>,
    {prefix = ''}: Options = {}
) => Object
    .values(fontDefinitions)
    .filter(font => font.some(({preload}) => preload))
    .map(font => font.filter(({preload}) => preload))
    .flatMap(font => font.map(({src}) => (
        <link
            key={src as string}
            as="font"
            crossOrigin="anonymous"
            href={`${prefix}${src as string}`}
            rel="preload"
            type={getFontType(src as string)}
        />
    )));

/**
 * Gets the font type.
 *
 * @param  font The font.
 * @returns The font type.
 * @throws {Error} If the font type is unknown.
 */
const getFontType = (font: string): string => {
    const ending = font.split('.').pop();

    switch (ending) {
        case 'otc':
        case 'ttc':
            return 'font/collection';
        case 'svg':
        case 'svgz':
            return 'font/sfnt';
        case 'woff2':
            return 'font/woff2';
        case 'woff':
            return 'font/woff';
        case 'ttf':
            return 'font/ttf';
        case 'otf':
            return 'font/otf';
        case undefined:
        default:
            throw new Error(`Unknown font type: ${ending!}`);
    }
};