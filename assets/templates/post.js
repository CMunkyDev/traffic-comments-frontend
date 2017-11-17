const formatPost = postObj => {
  return `<div class="card post post-${postTypeCss[postObj.post_type]}">
    <div class="card-body"
        <h4 class="card-title">${postObj.title}</h4>
        <div class="location-span">location: ${postObj.location}</div>
        <p class="card-text">${postObj.content}</p>
        <span class="post-created float-left mb-3">occured ${moment(postObj.date).format("MM-DD-YYYY hh:mm a")}</span>
         <span class="post-created float-left">posted ${moment(postObj.created_at).format("MM-DD-YYYY hh:mm a")}</span>
        <div class="button-area float-right">
          <button class="btn btn-sm ${buttonColorCss[postObj.post_type]}" >Expand</button>
        </div>
    </div>
  </div>`
}
