// const smoothScroll = require('smoothscroll');

const scrollFnFabric = link => {
    const destLink = link.hash
    const dest = document.querySelector(destLink)

    link.addEventListener('click', e => {
        e.preventDefault()
        smoothScroll(dest)
    })
}

export const scroll = () => {
    const link = document.querySelectorAll('[data-id="link"]')[0]
    const top = document.getElementById('body')
    link.addEventListener('click', e => {
        e.preventDefault()
        smoothScroll(top)
    })
}
