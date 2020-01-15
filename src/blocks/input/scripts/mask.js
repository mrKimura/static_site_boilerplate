import maskInput from 'vanilla-text-mask'

export function inputPhoneMaskHandler() {
  const phoneMask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  const allPhoneInputs = document.querySelectorAll('[data-mask="phone"]')

  allPhoneInputs.forEach(input => {
    maskInput({
      inputElement: input,
      mask: phoneMask,
    })
  })
}
