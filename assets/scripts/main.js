let postArea = document.querySelector('.post-area')

let homeButton = document.querySelector('#home-button')
let thankButton = document.querySelector('#thank-button')
let apologizeButton = document.querySelector('#apologize-button')
let alertButton = document.querySelector('#alert-button')
let yellButton = document.querySelector('#yell-button')
let editDeleteButton = document.querySelector('#edit-delete-button')

let idEdit = document.querySelector('#id-form-edit')
let idDelete = document.querySelector('#id-form-delete')
let idClose = document.querySelector('#id-form-close')


//const postTypeCss = ['sorry', 'thank', 'fuck', 'alert']
let createButtonOrder = [apologizeButton, thankButton, yellButton, alertButton]

createButtonOrder.forEach((button, index) => {
  //console.log('well i tried')
  button.addEventListener('click', event => {
    window.postTypeIndex = index
    hideBars()
    switchToEdit(index, 'Create')
  })
})

homeButton.addEventListener('click', event => {
  location.reload()
})

idClose.addEventListener('click', event => {
  window.location.hash = ''
})

editDeleteButton.addEventListener('click', event => {
  if(window.location.hash == '#id-query') {
    window.location.hash = ''
  } else {
    window.location.hash = '#id-query'
  }
})


axios.get(`${BASE_URL}/posts`).then(result => {
  let postFill = ''
  let theRest = ''
  result.data.posts.forEach(post => {
    // if (post.content.length > 280) {
    //   theRest = post.content.slice(251)
    //   post.content = post.content.slice(0, 251)
    // }
    postFill += formatPost(post)
  })
  postArea.innerHTML = postFill
})

fixForm();
