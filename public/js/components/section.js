import { createHtmlElement } from '../util/dom.js'
import { createList } from './list.js'

/**
 * Creates a section consisting of a header (<h3>) and a list.
 *
 * @param {string} title - Base title for the section (e.g. "Director").
 * @param {string[]} items - Items to include in the list.
 * @param {string} listClass - CSS class for the <ul>.
 * @param {string} itemClass - CSS class for each <li>.
 * @returns {DocumentFragment} A fragment containing the header and list.
 */
export function createSection (title, items, listClass, itemClass) {
  const fragment = document.createDocumentFragment()

  const header = createHtmlElement(
    'h3',
    null,
    `${title}${items.length > 1 ? 's' : ''}`
  )

  const list = createList(items, listClass, itemClass)

  fragment.appendChild(header)
  fragment.appendChild(list)

  return fragment
}
