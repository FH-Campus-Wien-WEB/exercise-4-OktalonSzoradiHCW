import { createHtmlElement } from '../util/dom.js'

export function createList (items, listClass, itemClass) {
  const ul = document.createElement('ul')
  ul.className = listClass

  ul.append(...items.map(item => createHtmlElement('li', itemClass, item)))

  return ul
}
