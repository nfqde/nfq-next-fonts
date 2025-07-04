import fs from 'fs';

import * as ts from 'typescript';

import type {FontDefinition, FontItem} from 'src';

/**
 * The font css generator.
 */
export class FontCSSGenerator {
    /**
     * Constructor.
     *
     * @param globalStylesPath The global styles path.
     * @param outputPath       The css file output path.
     * @param prefix           The font loading prefix path.
     */
    constructor(
        readonly globalStylesPath = './src/utils/globalStyles.ts',
        readonly outputPath = './src/assets/fonts/fonts.css',
        readonly prefix = ''
    ) {}

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
                return `url('${this.prefix}${src}') format('collection')`;
            case 'svg':
            case 'svgz':
                return `url('${this.prefix}${src}') format('svg')`;
            case 'eot':
                return `url('${this.prefix}${src}') format('embedded-opentype')`;
            case 'woff2':
                return `url('${this.prefix}${src}') format('woff2')`;
            case 'woff':
                return `url('${this.prefix}${src}') format('woff')`;
            case 'ttf':
                return `url('${this.prefix}${src}') format('truetype')`;
            case 'otf':
                return `url('${this.prefix}${src}') format('opentype')`;
            case undefined:
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
        const program = ts.createProgram(
            [this.globalStylesPath],
            {compilerOptions: {moduleResolution: ['node']}}
        );
        const source = program.getSourceFile(this.globalStylesPath);
        const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed});
        let transpiledFonts = '{}';

        ts.forEachChild(source!, node => {
            if (ts.isVariableStatement(node)) {
                if (
                    node.modifiers?.[0]?.kind === ts.SyntaxKind.ExportKeyword
                    && (node.declarationList.declarations[0].name as ts.Identifier).escapedText === 'fontDefinitions'
                ) {
                    const functionSource = printer.printNode(ts.EmitHint.Unspecified, node, source!)
                        .replace('export const fontDefinitions = configureFonts(', 'const fontDefinitions = ')
                        .replace('});', '};');

                    transpiledFonts = ts.transpileModule(functionSource, {}).outputText
                        .replace('var fontDefinitions = ', '');
                }
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func, @typescript-eslint/no-unsafe-call
        const fontDefinitions: FontDefinition<Record<string, FontItem[]>> = new Function(`return ${transpiledFonts}`)();

        let css = '';

        for (const [fontName, fontInfo] of Object.entries(fontDefinitions)) {
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

        // eslint-disable-next-line node/no-sync, security/detect-non-literal-fs-filename
        fs.writeFileSync(this.outputPath, css);
    }
}