const smoothScroll = require('smoothscroll');

const scrollFnFabric = link => {
    const destLink = link.hash
    const dest = document.querySelector(destLink)

    link.addEventListener('click', e => {
        e.preventDefault()
        smoothScroll(dest)
    })
}

export const scroll = () => {
    const allLinks = document.querySelectorAll('[data-id="link"]')
    allLinks.forEach(link => scrollFnFabric(link))
}
