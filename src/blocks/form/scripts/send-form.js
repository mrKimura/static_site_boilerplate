export const sendForm = (formName, formDataObj, handleResponse, handleError, fieldsToReset) => {
  const formData = serialize(formDataObj)
  const url = `/mail/${formName}.php?${formData}`

  fakeResponse()
  // fetch(url)
    .then(response => handleResponse(response, fieldsToReset, formName))
    .catch(error => handleError(error, formName))
}

function serialize(obj) {
  const str = []

  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }

  return str.join('&')
}

function fakeResponse() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('result')
      // reject('bad')
    }, 1000)
  })
}
