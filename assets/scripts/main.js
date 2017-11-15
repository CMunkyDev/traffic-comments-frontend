let postArea = document.querySelector('.post-area')

axios.get(`${BASE_URL}/posts`).then(result => {
  let postFill = ''
  result.data.posts.forEach(post => postFill += formatPost(post))
  postArea.innerHTML = postFill;
})
