let postArea = document.querySelector('.post-area')

axios.get('http://localhost:8080/posts').then(result => {
  result.data.posts.forEach(post => postArea.innerHTML += formatPost(post))
})
