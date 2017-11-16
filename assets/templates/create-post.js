

const minuteToNearestFifteen = minute => {
  return `${Math.floor(parseInt(minute)/15) * 15}`
}

const createMakeSelector = (selectorElement, person = 'Your', defaultValue = "") => {
  selectorElement.innerHTML = `<option value=0>${person} Car's Make</option>`
  axios.get(`${BASE_URL}/makes`)
  .then(response => {
    response.data.makes.forEach(make => {
      if (make.show || make.name == defaultValue) {
        selectorElement.innerHTML += `<option value=${make.id} ${make.name == defaultValue ? "selected" : ""}>${make.name}</option>`
      }
    })
  })
}

const createYearSelector = (selectorElement, defaultValue = "", startYear = 1900, endYear = (new Date().getFullYear() + 1)) => {
  let innerHTML = `<option value=0>Your Car's Year</option>`
  for (let y = endYear; y >= startYear; y--) {
    innerHTML += `<option value=${y} ${y == defaultValue ? "selected" : ""}>${y}</option>`
  }
  selectorElement.innerHTML = innerHTML;
}

const createTransportSelector = (selectorElement, yourTheir = 'Your', defaultValue = "", transportTypeArray = transportTypeArr) => {
  let innerHTML = `<option value=null>${yourTheir} Mode of Transport</option>`
  transportTypeArray.forEach((mode, index) => {
    innerHTML += `<option value="${index}" ${index == defaultValue ? "selected" : ""}>${mode}</option>`
  })
  selectorElement.innerHTML = innerHTML
}

const formatPostCreation = (postTypeIndex, editType, post = {}) => {
  return `<div class="post-creator new-${postTypeCss[postTypeIndex] || 'post'}">
      <h1 id="post-form-head" class="display-4">${editType} Post</h1>
      <form id="post-form" data-parsley-validate>
        <div class="md-form form-lg">
          <input type="text" id="input-title" class="form-control" value="${post.title || ""}">
          <label for="input-title" class="">Post Title</label>
        </div>
        <div class="md-form">
            <textarea id="input-content" class="md-textarea">${post.content || ""}</textarea>
            <label for="input-content" class="">Get it off your chest</label>
        </div>
        <div class="md-form form-lg">
          <input type="text" id="input-location" class="form-control" value="${post.location || ""}">
          <label for="input-location" class="">location</label>
        </div>
        <div class="form-group">
          <label for="input-date" class="col-2 col-form-label">Date</label>
          <div class="col-10">
            <input class="form-control" type="date" value="${moment(post.time).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD')}" id="input-date">
          </div>
          <label for="input-time" class="col-2 col-form-label">Time</label>
          <div class="col-10">
            <input class="form-control" type="time" value="${moment(`${moment().format('HH')}:${minuteToNearestFifteen(moment().format('mm'))}`, 'HH:mm').format('HH:mm')}" id="input-time" step="900">
          </div>
        </div>
        <div id="self-data">
          <h4>You</h4>
          <select id="self-transport"></select>
          <select id="self-year"></select>
          <select id="self-make"></select>
          <input id="self-model" type="text" placeholder="Your car's model" value="${post.self_model || ""}">
          <input id="self-color" type="text" placeholder="Your car's color" value="${post.self_color || ""}">
        </div>
        <div id="other-data">
          <h4>Them</h4>
          <select id="other-transport"></select>
          <select id="other-make"></select>
          <input id="other-model" type="text" placeholder="Their car's model" value="${post.other_model || ""}">
          <input id="other-color" type="text" placeholder="Their car's color" value="${post.other_color || ""}">
        </div>
      </form>
      <button id="save-button" type="submit" form="post-form" class="btn ${formColorCss[post.post_type || window.location.hash] || 'primary-color-dark'}">SAVE</button>
    </div>`
}
