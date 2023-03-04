import React from 'react';

interface FontItem {
    fontDisplay: 'auto' | 'block' | 'fallback' | 'optional' | 'swap';
    fontStyle: 'italic' | 'normal' | 'oblique' | `oblique ${number}deg ${number}deg` | `oblique ${number}deg`;
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold' | 'normal';
    preload?: boolean;
    src: `/fonts/${string}.${string}`[] | `/fonts/${string}.${string}`;
}

export type FontDefinition = Record<string, FontItem[]>;

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
        default:
            throw new Error(`Unknown font type: ${ending!}`);
    }
};

/**
 * Preloads fonts.
 *
 * @param fontDefinitions The font definitions.
 * @returns An array of font links.
 */
export const preloadFonts = (fontDefinitions: FontDefinition) => Object
    .values(fontDefinitions)
    .filter(font => font.some(({preload}) => preload))
    .map(font => font.filter(({preload}) => preload))
    .flatMap(font => font.map(({src}) => (
        <link
            key={src as string}
            as="font"
            crossOrigin="anonymous"
            href={src as string}
            rel="preload"
            type={getFontType(src as string)}
        />
    )));