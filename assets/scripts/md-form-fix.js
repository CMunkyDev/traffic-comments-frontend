let labels = document.querySelectorAll('form label')

Array.prototype.forEach.call(labels, label => {
  let input = document.querySelector(`#${label.htmlFor}`)
  if (input.type == 'text' || input.type == 'textarea') {
    input.addEventListener('focus', event => {
      label.classList.add('active')
    })
    input.addEventListener('focusout', event => {
      if (!event.target.value) {
        label.classList.remove('active')
      }
    })
  }
})
