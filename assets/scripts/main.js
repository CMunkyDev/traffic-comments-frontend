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

let area = document.querySelector('.content-area')
//const postTypeCss = ['sorry', 'thank', 'fuck', 'alert']
let createButtonOrder = [apologizeButton, thankButton, yellButton, alertButton]

//fix this later  vvv
let fakeButtonLolThank = document.querySelector('#fake-button-thank')
let fakeButtonLolSorry = document.querySelector('#fake-button-sorry')
let fakeButtonLolAlert = document.querySelector('#fake-button-alert')
let fakeButtonLolYell = document.querySelector('#fake-button-yell')

let sortButtonOrder = [fakeButtonLolSorry, fakeButtonLolThank, fakeButtonLolYell, fakeButtonLolAlert]

sortButtonOrder.forEach((button, index) => {
  button.addEventListener('click', () => {
    axios.get(`${BASE_URL}/posts`).then(result => {
      let postFill = ''
      //let theRest = ''
      let filteredPosts = result.data.posts.filter(el => {
        return el.post_type == index;
      })
      filteredPosts.forEach(post => {
        // if (post.content.length > 280) {
        //   theRest = post.content.slice(251)
        //   post.content = post.content.slice(0, 251)
        // }
        postFill += formatPost(post)
      })
      postArea.innerHTML = postFill
    })
  })
})

function goHome () {
  window.location.hash = ''
  setTimeout(() => {
    window.location.reload();
  }, 0)
}

function colorBack (typeIndex) {
  area.style = `background-color:${postTypeColor[typeIndex]}`
}

idEdit.addEventListener('click', event => {
  axios.get(`${BASE_URL}/posts/${idInput.value}`)
    .then(response => {
      let post = response.data.post
      window.location.hash= ''
      hideBars()
      console.log(post)
      switchToEdit(post.post_type, 'Edit', post)
      colorBack(post.post_type)
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
    colorBack(index)
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
