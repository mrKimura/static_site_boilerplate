const bodyScrollLock = require('body-scroll-lock')

const getElement = name => {
  const existedElement = document.getElementById(name)

  if (existedElement) return existedElement

  const el = document.createElement('div')

  document.body.appendChild(el)
  el.id = name
  el.classList.add(name)

  return el
}

const getFixedElements = () => [...document.body.querySelectorAll('*[data-fullwidth]')]

const detectScrollBar = () => {
  const isScrollbar = getComputedStyle(document.documentElement).getPropertyValue('--has-scrollbar')

  if (isScrollbar) return true

  return window.innerWidth > document.documentElement.clientWidth
}

const { disableBodyScroll } = bodyScrollLock
const { enableBodyScroll } = bodyScrollLock

export const showModal = ({ popup, closeBtn, deleteOnClose, autoHide }) => {
  const hideModalHandler = () => hideModal({ popup, deleteOnClose })
  const voidScrollElement = getElement('void')
  const fade = getElement('fade')
  const fixedElements = getFixedElements()

  const hasScrollBar = detectScrollBar()

  document.documentElement.style.setProperty('--has-scrollbar', Number(hasScrollBar))

  fixedElements.forEach(el => {
    el.style.width = `${el.offsetWidth}px`
  })

  disableBodyScroll(voidScrollElement, { reserveScrollBarGap: hasScrollBar })
  popup.style.display = 'flex'
  fade.style.visibility = 'visible'

  setTimeout(() => {
    popup.style.visibility = 'visible'
  }, 100)

  fade.addEventListener('click', hideModalHandler)

  if (closeBtn) {
    closeBtn.addEventListener('click', hideModalHandler)
  }

  document.addEventListener(
    'keydown',
    ({ key }) => {
      if (key === 'Escape') hideModal({ popup, deleteOnClose })
    },
    false,
  )

  if (autoHide) {
    setTimeout(hideModalHandler, 3000)
  }
}

export const hideModal = ({ popup, deleteOnClose }) => {
  const voidScrollElement = getElement('void')
  const fade = getElement('fade')
  const fixedElements = getFixedElements()

  const hasScrollBar = detectScrollBar()

  popup.style.visibility = 'hidden'
  popup.style.display = 'none'
  if (deleteOnClose) popup.remove()

  fade.remove()
  enableBodyScroll(voidScrollElement, { reserveScrollBarGap: hasScrollBar })
  voidScrollElement.remove()

  window.addEventListener('resize', () => {
    fixedElements.forEach(el => {
      el.style.width = '100%'
    })
  })
}
