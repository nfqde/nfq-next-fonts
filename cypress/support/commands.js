require('@cypress/code-coverage/support');

Cypress.Commands.add('getCy', {prevSubject: 'optional'}, (subject, options) => {
    cy.get(`[data-cy="${options}"]`);
});

Cypress.Commands.add('stubPrototype', {prevSubject: false}, (obj, prop, alias) => {
    // eslint-disable-next-line no-param-reassign
    obj.prototype[String(prop)] = cy.stub().as(alias);
});

Cypress.Commands.add('spyPrototype', {prevSubject: false}, (obj, prop, alias) => {
    const spyObj = {[prop]: obj.prototype[String(prop)]};

    cy.spy(spyObj, prop).as(alias);
    // eslint-disable-next-line no-param-reassign
    obj.prototype[String(prop)] = spyObj[String(prop)];
});

/**
 * Tests if an element is of an specific type.
 *
 * @param {Object} chai The chai object.
 */
const isHtmlElement = chai => {
    /**
     * Asserts for an specific html tagName.
     *
     * @param {String} tagName Options given to the command.
     */
    function assertHtmlElement(tagName) {
        // eslint-disable-next-line no-invalid-this
        this.assert(
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj[0].tagName.toLowerCase() === tagName.toLowerCase(),
            `expected #{this} to be HtmlElement ${tagName.toLowerCase()}`,
            `expected #{this} to not be HtmlElement ${tagName.toLowerCase()}`,
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('htmlElement', assertHtmlElement);
};

chai.use(isHtmlElement);