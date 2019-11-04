import { showModal, hideModal } from './modals'

export const formWorks = () => {
    const contactBtns = document.querySelectorAll('.feedback_btn')
    const form = document.getElementById('form')
    const btnClose = document.getElementById('form_close_btn')
    const message = document.getElementById('message')
    const formButton = document.getElementById('form_button')

    const inputName = document.getElementById('input_name')
    const inputMail = document.getElementById('input_mail')
    const inputPhone = document.getElementById('input_phone')
    const inputMessage = document.getElementById('input_message')

    const resetForm = () => {
        inputName.value = ''
        inputMail.value = ''
        inputPhone.value = ''
        inputMessage.value = ''
    }

    const handleResponse = response => {
        hideModal(form, true)
        setTimeout(() => {
            showModal(message)
        }, 50)

        const timeout = setTimeout(() => {
            hideModal(message)
        }, 3000)

        resetForm()
    }

    const serialize = function(obj) {
        const str = []
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
            }
        return str.join('&')
    }

    const handleError = error => {
        hideModal(form)
        console.error('Ошибка:', error)
    }

    const contactButtons = [...contactBtns]

    contactButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault()
            showModal(form, btnClose)
        })
    })

    formButton.addEventListener('click', e => {
        e.preventDefault()
        const name = inputName.value.trim()
        const mail = inputMail.value.trim()
        const phone = inputPhone.value.trim()
        const message = inputMessage.value.trim()
        
        const senderContactsIsOk = Boolean(name) || Boolean(mail) || Boolean(phone)
        
        if (!senderContactsIsOk) return

        const formDataObj = {
            name,
            mail,
            phone,
            message,
        }

        const formData = serialize(formDataObj)
        const url = `/form.php?${formData}`

        fetch(url)
            .then(response => handleResponse(response))
            .catch(error => handleError(error))
    })
}
