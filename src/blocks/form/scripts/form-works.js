import { showModal, hideModal } from '../../modal'
import { sendForm } from './send-form'
import { responseMessage } from './response'

const inputValuesReset = fieldsToReset => {
  for (let field of Object.values(fieldsToReset)) {
    field.value = ''
  }
}

const handleResponse = (response, fieldsToReset, formName) => {
  const form = document.getElementById(formName)

  inputValuesReset(fieldsToReset)

  console.info(response)
  hideModal({
    popup: form,
    deleteOnClose: false,
  })
  responseMessage(true)
}

const handleError = (error, formName) => {
  const form = document.getElementById(formName)

  hideModal({
    popup: form,
    deleteOnClose: false,
  })
  console.error('Ошибка:', error)

  responseMessage(false)
}

const submitHandler = dataFields => {
  const { inputName, inputMail, inputPhone, inputMessage } = dataFields

  const name = inputName.value
  const phone = inputPhone.value
  const mail = inputMail.value
  const message = inputMessage.value

  const formObj = { name, phone, mail, message }

  sendForm('form', formObj, handleResponse, handleError, dataFields)
}

export const formWorks = () => {
  const contactBtns = document.querySelectorAll('[data-id="form"]')
  const contactButtons = [...contactBtns]
  const form = document.getElementById('form')
  const closeBtn = document.getElementById('form_close_btn')
  const formSubmitButton = document.querySelectorAll('.formBtn')[0]

  const inputName = document.getElementById('input_name')
  const inputMail = document.getElementById('input_mail')
  const inputPhone = document.getElementById('input_phone')
  const inputMessage = document.getElementById('input_message')

  contactButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      showModal({
        popup: form,
        closeBtn,
        deleteOnClose: false,
      })
    })
  })

  formSubmitButton.addEventListener('click', e => {
    e.preventDefault()

    submitHandler({ inputName, inputMail, inputPhone, inputMessage })
  })
}
