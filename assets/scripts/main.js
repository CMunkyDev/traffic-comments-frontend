let postArea = document.querySelector('.post-area')

let homeButton = document.querySelector('#home-button')
let thankButton = document.querySelector('#thank-button')
let apologizeButton = document.querySelector('#apologize-button')
let alertButton = document.querySelector('#alert-button')
let yellButton = document.querySelector('#yell-button')
let editDeleteButton = document.querySelector('#edit-delete-button')

let idInput = document.querySelector('#input-id')

let idEdit = document.querySelector('#id-form-edit')
let idDelete = document.querySelector('#id-form-delete')
let idClose = document.querySelector('#id-form-close')

let idDisplay = document.querySelector('#id-display-accept')

//const postTypeCss = ['sorry', 'thank', 'fuck', 'alert']
let createButtonOrder = [apologizeButton, thankButton, yellButton, alertButton]

function goHome () {
  window.location.hash = ''
  setTimeout(() => {
    window.location.reload();
  }, 0)
}


idEdit.addEventListener('click', event => {
  axios.get(`${BASE_URL}/posts/${idInput.value}`)
    .then(response => {
      let post = response.data.post
      window.location.hash= ''
      hideBars()
      switchToEdit(post.post_type_index, 'Edit', post)
    })
})


idDelete.addEventListener('click', event => {
  axios.delete(`${BASE_URL}/posts/${idInput.value}`)
  .then(response => {
    let post = response.data.post
    goHome()
    window.alert(`Post with id of '${post.id}' titled '${post.title}' has been successfully deleted!`)
  })
  .catch(response => {
    alert('Deletion unsuccessful.')
  })
})



function formatID (id) {
  let idPara = document.querySelector('.id-paragraph')
  idPara.textContent = `Your post id is ${id}. Please save this if you would like to edit or delete your post later.`
}

idDisplay.addEventListener('click', event => {
  goHome()
})

function displayId (id) {
  formatID(id)
  window.location.hash = `#display-id`
}

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
