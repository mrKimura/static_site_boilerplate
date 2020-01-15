import { showModal } from '../../modal'

export const responseMessage = result => {
  const messageWindow = document.createElement('div')

  const classAdd = result ? 'response-ok' : 'response-error'
  const content = result ? 'Данные успешно отправлены' : 'Данные не отправлены.<br> Пожалуйста, попробуйте снова.'

  messageWindow.classList.add('response')
  messageWindow.classList.add(classAdd)
  messageWindow.innerHTML = content
  document.body.appendChild(messageWindow)

  showModal({
    popup: messageWindow,
    closeBtn: false,
    deleteOnClose: true,
    autoHide: true
  })
}
