// const bodyScrollLock = require('body-scroll-lock')

const getVoidScrollElement = () => document.getElementById('void')
const getFadeElement = () => document.getElementById('fade')
const getHeader = () => document.getElementById('header')

const bodyScrollOptions = {
    reserveScrollBarGap: true,
}

const headerFix = () => {
    const header = getHeader()
    header.style.width = `${header.offsetWidth}px`
}

const headerUnFix =() => {
    const header = getHeader()
    
    window.addEventListener("resize", () => {
        header.style.width = '100%'
    });
}

const disableBodyScroll = bodyScrollLock.disableBodyScroll
const enableBodyScroll = bodyScrollLock.enableBodyScroll

export const showModal = (popup, closeBtn) => {
    const voidScrollElement = getVoidScrollElement()
    const fade = getFadeElement()
    
    // headerFix()
    
    disableBodyScroll(voidScrollElement, bodyScrollOptions)
    popup.style.display = 'flex'
    fade.style.visibility = 'visible'
    
    setTimeout(() => {
        popup.style.visibility = 'visible'
    }, 100)

    fade.addEventListener('click', () => {
        hideModal(popup)
    })

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideModal(popup)
        })
    }
}

export const hideModal = (popup, fadeIsOn) => {
    const voidScrollElement = getVoidScrollElement()
    const fade = getFadeElement()
    const header = getHeader()
    
    popup.style.display = 'none'
    
    setTimeout(() => {
        popup.style.visibility = 'hidden'
    }, 100)
    
    if (!fadeIsOn) {
        fade.style.visibility = 'hidden'
        enableBodyScroll(voidScrollElement, bodyScrollOptions)
    }
    
    // headerUnFix()
}
