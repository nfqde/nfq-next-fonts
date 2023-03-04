import fs from 'fs';

import * as ts from 'typescript';

import type {FontDefinition} from 'src';

/**
 * The font css generator.
 */
export class FontCSSGenerator {
    /**
     * Get the url string.
     *
     * @param src The source.
     * @returns The url string.
     */
    getUrlString(src: string) {
        const ending = src.split('.').pop();

        switch (ending) {
            case 'otc':
            case 'ttc':
                return `url('${src}') format('collection')`;
            case 'svg':
            case 'svgz':
                return `url('${src}') format('svg')`;
            case 'eot':
                return `url('${src}') format('embedded-opentype')`;
            case 'woff2':
                return `url('${src}') format('woff2')`;
            case 'woff':
                return `url('${src}') format('woff')`;
            case 'ttf':
                return `url('${src}') format('truetype')`;
            case 'otf':
                return `url('${src}') format('opentype')`;
            default:
                return '';
        }
    }

    /**
     * Create a single line string.
     *
     * @param strings The strings.
     * @param values  The values.
     * @returns The single line string.
     */
    singleLineString(strings: TemplateStringsArray, ...values: string[]) {
        let output = '';

        for (let i = 0; i < values.length; i++) {
            output += strings[Number(i)] + values[Number(i)];
        }
        output += strings[values.length];

        const lines = output.split(/(?:\r\n|\n|\r)/u);

        // Rip out the leading whitespace.
        return lines.map(line => line.replace(/^\s+/gmu, '')).join(' ').trim();
    }

    /**
     * Generate the font css.
     */
    generate() {
        // eslint-disable-next-line node/no-sync
        const source = fs.readFileSync('./src/utils/globalStyles.ts', 'utf8');

        // eslint-disable-next-line security/detect-eval-with-expression, no-eval
        eval(
            ts.transpileModule(
                source,
                {compilerOptions: {moduleResolution: ts.ModuleResolutionKind.NodeNext}}
            ).outputText
        );

        let css = '';

        for (const [fontName, fontInfo] of Object
            // eslint-disable-next-line node/exports-style
            .entries((exports as {fontDefinitions: FontDefinition}).fontDefinitions)
        ) {
            for (const font of fontInfo) {
                let fonts = [];

                if (Array.isArray(font.src)) {
                    fonts = font.src.map(src => this.getUrlString(src));
                } else {
                    fonts = [this.getUrlString(font.src)];
                }

                css += this.singleLineString`@font-face {
                    font-display: ${font.fontDisplay};
                    font-family: '${fontName}';
                    src: ${fonts.join(', ')};
                    font-weight: ${font.fontWeight};
                    font-style: ${font.fontStyle};
                }`;
            }
        }

        // eslint-disable-next-line node/no-sync
        fs.writeFileSync('./src/assets/fonts/fonts.css', css);
    }
}