import React from 'react';

import {preloadFonts} from '../../src/index';
import {fileType, fontsDefault, fullError, noPreload} from '../fixtures/fontDefinitions';

describe('Preload Tag Generation', () => {
    before(() => {
        expect(preloadFonts, 'preloadFonts').to.be.a('function');
    });

    it('Generates nothing if no preload option set.', () => {
        cy.mount(<head>{preloadFonts(noPreload)}</head>);
        cy.get('head').find('link').should('not.exist');
    });

    it('Should preload only one file.', () => {
        cy.mount(<head>{preloadFonts(fontsDefault)}</head>);
        cy.get('head').find('link').should('have.length', 1);
    });

    it('Should set right properties.', () => {
        cy.mount(<head>{preloadFonts(fontsDefault)}</head>);
        cy.get('head').find('link').should('have.attr', 'as', 'font');
        cy.get('head').find('link').should('have.attr', 'crossorigin', 'anonymous');
        cy.get('head').find('link').should('have.attr', 'href', '/fonts/lato-bold.woff2');
        cy.get('head').find('link').should('have.attr', 'rel', 'preload');
        cy.get('head').find('link').should('have.attr', 'type', 'font/woff2');
    });

    it('Should get right font types.', () => {
        cy.mount(<head>{preloadFonts(fileType)}</head>);
        cy.get('head').find('link').eq(0).should('have.attr', 'type', 'font/collection');
        cy.get('head').find('link').eq(1).should('have.attr', 'type', 'font/collection');
        cy.get('head').find('link').eq(2).should('have.attr', 'type', 'font/sfnt');
        cy.get('head').find('link').eq(3).should('have.attr', 'type', 'font/sfnt');
        cy.get('head').find('link').eq(4).should('have.attr', 'type', 'font/woff2');
        cy.get('head').find('link').eq(5).should('have.attr', 'type', 'font/woff');
        cy.get('head').find('link').eq(6).should('have.attr', 'type', 'font/ttf');
        cy.get('head').find('link').eq(7).should('have.attr', 'type', 'font/otf');
    });

    it('Should throw if fonts cant get parsed', () => {
        let spy;

        try {
            spy = cy.spy(preloadFonts).as('preloadFonts');

            spy(fullError);
        } catch (e) {
            expect(e).to.be.an('error');
        }

        expect(spy).to.have.thrown();
    });
});