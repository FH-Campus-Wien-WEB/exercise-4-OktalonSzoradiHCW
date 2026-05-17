import { createHtmlElement } from '../util/dom.js'

/**
 * Creates a <ul> element populated with <li> items.
 *
 * @param {string[]} items - List of text items to render.
 * @param {string} listClass - CSS class for the <ul>.
 * @param {string} itemClass - CSS class for each <li>.
 * @returns {HTMLUListElement} The generated unordered list.
 */
export function createList (items, listClass, itemClass) {
  const ul = document.createElement('ul')
  ul.className = listClass

  // for (const item of items) {
  //   const li = createHtmlElement('li', itemClass, item)
  //   ul.appendChild(li)
  // }

  ul.append(...items.map(item => createHtmlElement('li', itemClass, item)))

  return ul
}
