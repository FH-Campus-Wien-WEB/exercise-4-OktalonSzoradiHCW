import { createHtmlElement } from '../util/dom.js'
import { createList } from './list.js'

export function createSection (title, items, listClass, itemClass) {
  const fragment = document.createDocumentFragment()

  const header = createHtmlElement(
    'h3',
    null,
    `${title}${items.length > 1 ? 's' : ''}`
  )

  fragment.append(header, createList(items, listClass, itemClass))

  return fragment
}
