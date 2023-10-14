import {
  expect, describe, it, vi,
} from 'vitest';
import { o } from '../o';

describe('Ojs Core', () => {
  it('should create Ojs instance with HTML element of given type inside', () => {
    // when
    const oElement = o('div');

    // then
    expect(oElement).toBeInstanceOf(o);
    expect(oElement.element).toBeInstanceOf(HTMLElement);
    expect(oElement.element.tagName).toBe('DIV');
  });

  it('should return null when element argument is not passed', () => {
    // when
    const oElement = o();

    // then
    expect(oElement).toBeNull();
  });

  it('should return HTML on init method call', () => {
    // when
    const result = o('p').init();

    // then
    expect(result).toStrictEqual(document.createElement('p'));
  });

  it('should have set _isoelement property to true value', () => {
    // when
    const oElement = o('div');

    // then
    expect(oElement._isoelement).toBe(true);
  });

  it('should not be possible to edit _isoelement property', () => {
    // given
    const oElement = o('div');

    // when
    const editIsOElementProperty = () => {
      oElement._isoelement = false;
    };

    // then
    expect(editIsOElementProperty).toThrowError(/Cannot assign to read only property/);
  });

  describe('Helper methods - Events', () => {
    it('should add event to element', () => {
      // given
      const callbackFunction = vi.fn();
      const divElement = o('div').event({
        name: 'click',
        fn: callbackFunction,
      }).init();

      // when
      divElement.click();

      // then
      expect(callbackFunction).toHaveBeenCalled();
    });

    it('should add multiple events when array is passed', () => {
      // given
      const callbackFunctionOne = vi.fn();
      const callbackFunctionTwo = vi.fn();
      const eventsArray = [
        {
          name: 'click',
          fn: callbackFunctionOne,
        },
        {
          name: 'click',
          fn: callbackFunctionTwo,
        },
      ];

      const divElement = o('div').event(eventsArray).init();

      // when
      divElement.click();

      // then
      expect(callbackFunctionOne).toHaveBeenCalled();
      expect(callbackFunctionTwo).toHaveBeenCalled();
    });

    it('should add click event to element - click method', () => {
      // given
      const callbackFunction = vi.fn();
      const divElement = o('div').click(callbackFunction).init();

      // when
      divElement.click();

      // then
      expect(callbackFunction).toHaveBeenCalled();
    });
  });

  describe('Helper methods - attributes', () => {
    it('should add attribute - .setAttribute()', () => {
      // when
      const anchorElement = o('a')
        .setAttribute('href', 'https://google.com')
        .init();

      // then
      expect(anchorElement.getAttribute('href')).toBe('https://google.com');
    });

    it('should add multiple attributes - .setAttributes()', () => {
      // when
      const anchorElement = o('a')
        .setAttributes({
          href: 'https://google.com',
          target: '_blank',
        })
        .init();

      // then
      expect(anchorElement.getAttribute('href')).toBe('https://google.com');
      expect(anchorElement.getAttribute('target')).toBe('_blank');
    });

    it('should add class atribute passed as a string - .class()', () => {
      // when
      const divElement = o('div')
        .class('red bold')
        .init();

      // then
      expect(divElement.className).toBe('red bold');
    });

    it('should add class atribute passed as an array - .class()', () => {
      // when
      const divElement = o('div')
        .class(['red', 'bold'])
        .init();

      // then
      expect(divElement.className).toBe('red bold');
    });

    it('should add id attribute - .id()', () => {
      // when
      const divElement = o('div').id('div-element').init();

      // then
      expect(divElement.id).toBe('div-element');
    });

    it('should add for attribute when element is type of label', () => {
      // when
      const labelElement = o('label').for('interactive-element').init();

      // then
      expect(labelElement.getAttribute('for')).toBe('interactive-element');
    });

    it('should not add for attribute when element is not type of label', () => {
      // when
      const notLabelElement = o('div').for('interactive-element').init();

      // then
      expect(notLabelElement.getAttribute('for')).not.toBe('interactive-element');
    });

    it('should add style attribute value - .style()', () => {
      // when
      const divElement = o('div').style('color:red;').init();

      // then
      expect(divElement.getAttribute('style')).toBe('color:red;');
    });
  });

  describe('Nesting childrens - .add() method', () => {
    it('should nest elements', () => {
      // when
      const result = o('p').add(
        o('span').text('Span element inside p element').init(),
      ).init();

      // then
      expect(result.outerHTML).toBe(`<p><span>Span element inside p element</span></p>`);
    });

    it.todo('Moore test with elements other than ojs-core instances (oRef, oFragment, elements without init etc.)');
  });

  describe('Helper methods - getters', () => {
    it('should return attribute value - .get()', () => {
      // given
      const anchorElement = o('a').setAttribute('href', 'https://google.com/');

      // when
      const result = anchorElement.get('href');

      // then
      expect(result).toBe('https://google.com/');
    });

    it('should return text of element - .getText()', () => {
      // given
      const paragraphElement = o('p').text('Lorem ipsum...');

      // when
      const result = paragraphElement.getText();

      // then
      expect(result).toBe('Lorem ipsum...');
    });

    it('should return value of id attribute of the element - .getId()', () => {
      // given
      const paragraphElement = o('p').id('paragraph-element');

      // when
      const result = paragraphElement.getId();

      // then
      expect(result).toBe('paragraph-element');
    });

    it('should return parent node of the element as Ojs instance - .parent()', () => {
      // given
      const childElement = o('span');
      const parentElement = o('div').id('parent-element').add(childElement);

      // when
      const result = childElement.parent();

      // then
      expect(result).toBeInstanceOf(o);
      expect(result).toStrictEqual(parentElement);
    });
  });

  describe('Adding content', () => {
    it('should add text to the element', () => {
      // when
      const paragraphElement = o('p').text('Lorem ipsum..').init();

      // then
      expect(paragraphElement.innerText).toBe('Lorem ipsum..');
    });

    [
      [undefined, 'undefined'],
      [null, 'null'],
      [[], 'Array'],
      [{}, 'Object'],
    ].forEach(([input, inputDescription]) => {
      it(`should not add any text when ${inputDescription} given`, () => {
        // when
        const paragraphElement = o('p').text(input).init();

        // then
        expect(paragraphElement.innerText).toBe('');
      });
    });

    it('should add html content - .html()', () => {
      // given
      const inputHtml = '<p>Lorem ipsum...</p>';
      const divElement = o('div');

      // when
      divElement.html(inputHtml);

      // then
      expect(divElement.element.innerHTML).toBe('<p>Lorem ipsum...</p>');
    });

    it('should sanitize string with <script> element when adding html content - .html()', () => {
      // given
      const inputHtml = '<script>alert("1")</script><p>Lorem ipsum...</p>';
      const divElement = o('div');

      // when
      divElement.html(inputHtml);

      // then
      expect(divElement.element.innerHTML).toBe('<p>Lorem ipsum...</p>');
    });

    it('should add html content passed as HTMLElement - .html()', () => {
      // given
      const inputHtmlElement = document.createElement('p');
      const divElement = o('div');

      // when
      divElement.html(inputHtmlElement);

      // then
      expect(divElement.element.innerHTML).toBe('<p></p>');
    });
  });

  describe.todo('Helper methods - input');
  describe.todo('Helper methods - ref');
});
