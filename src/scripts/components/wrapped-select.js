import morphdom from 'morphdom';

import WrappedElement from './wrapped-element';
import templates from './../templates';

export default class WrappedSelect extends WrappedElement {
  constructor({ element, classNames }) {
    super({ element, classNames });
  }

  get placeholderOption() {
    return this.element.querySelector('option[placeholder]');
  }

  get optionGroups() {
    return Array.from(this.element.getElementsByTagName('OPTGROUP'));
  }

  get options() {
    return Array.from(this.element.options);
  }

  set options(options) {
    const newDOMStructure = document.createElement('div');
    const addOptionToDOM = data => {
      // Create a standard select option
      const template = templates.option(data);
      // Append it to fragment
      newDOMStructure.appendChild(template);
    };

    // Add each list item to list
    options.forEach(optionData => addOptionToDOM(optionData));

    this.render(newDOMStructure);
  }

  render(newDOMStructure) {
    const currentDOMStructure = this.element;

    morphdom(currentDOMStructure, newDOMStructure, {
      childrenOnly: true,
    });
  }
}
