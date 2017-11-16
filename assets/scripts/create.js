function hideBars () {
  let bardiv = document.querySelector('#bar-div')
  bardiv.style.display = 'none'
}

function showBars () {
  let bardiv = document.querySelector('#bar-div')
  bardiv.style.display = 'block'
}

function acquireForm (formElement) {
  let labels = document.querySelectorAll('form label')
  let inputs = Array.prototype.map.call(labels, label => {
    return document.querySelector(`#${label.htmlFor}`)
  })
  let formData = {}
  let resultObj = {}
  Array.prototype.forEach.call(inputs, input => {
    formData[input.id] = input.value
  })
  resultObj.title = formData['input-title']
  resultObj.content = formData['input-content']
  //resultObj.location = formData['input-location']
  //resultObj.date = createUTC(formData["input-date"], formData["input-time"])
  resultObj.self_transportation_index = parseInt(selfTransportSelector.value)
  resultObj.self_car_make_id = parseInt(selfMakeSelector.value) || null
  resultObj.self_car_model = selfModel.value || null
  resultObj.self_car_year = selfYearSelector.value.length > 3 ? selfYearSelector.value : null
  resultObj.self_car_color = selfColor.value || null
  resultObj.other_transportation_index = parseInt(otherTransportSelector.value)
  resultObj.other_car_make_id = parseInt(otherMakeSelector.value) || null
  resultObj.other_car_model = otherModel.value || null
  resultObj.other_car_color = otherColor.value || null
  resultObj.post_type_index = window.postTypeIndex
  console.log(resultObj)
  return resultObj
}

function createUTC (date, time) {
  return moment.parseZone(moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').add(-(moment().utcOffset()), 'm')).utc().format()
}

function toggleVisibility (...elements) {
  elements.forEach(element => {
    if (element.style.visibility == 'visible' || !element.style.visibility) {
      element.style.visibility = 'hidden'
    } else {
      element.style.visibility = 'visible'
    }
  })
}

function visibilityHidden (...elements) {
  elements.forEach(element => {
    element.style.visibility = 'hidden'
  })
}

function toggleDisplay (...elements) {
  elements.forEach(element => {
    if (element.style.display != 'none') {
      element.dataset.originaldisplay = element.style.display
      element.style.display = 'none'
    } else {
      element.style.display = element.dataset.originaldisplay || 'block'
    }
  })
}

function displayNone (...elements) {
  elements.forEach(element => {
    element.style.display = 'none'
  })
}


function switchToEdit(postTypeIndex, editType, post = {}) {

  let editArea = document.querySelector('.post-area')

  editArea.innerHTML = formatPostCreation(postTypeIndex, editType, post)
  fixForm()

  window.saveEl = document.querySelector('#save-button')
  window.timeInput = document.querySelector('#input-time')
  window.selfMakeSelector = document.querySelector('#self-make')
  window.selfYearSelector = document.querySelector('#self-year')
  window.otherMakeSelector = document.querySelector('#other-make')
  window.selfTransportSelector = document.querySelector('#self-transport')
  window.otherTransportSelector = document.querySelector('#other-transport')
  window.selfModel = document.querySelector('#self-model')
  window.otherModel = document.querySelector('#other-model')
  window.selfColor = document.querySelector('#self-color')
  window.otherColor = document.querySelector('#other-color')


  // timeInput.addEventListener('change')
  saveEl.addEventListener('click', event => {
    event.preventDefault()
    let body = acquireForm(event.target.form)
    axios.post(`${BASE_URL}/posts`, body)
  })

  createMakeSelector(selfMakeSelector, 'Your')
  createYearSelector(selfYearSelector)
  createMakeSelector(otherMakeSelector, 'Their')
  createTransportSelector(selfTransportSelector, 'Your')
  createTransportSelector(otherTransportSelector, 'Their')

  toggleVisibility(selfMakeSelector, selfYearSelector, otherMakeSelector)

  toggleDisplay(selfModel, otherModel, selfColor, otherColor)

  selfTransportSelector.addEventListener('change', event => {
    if (event.target.value == transportTypeArr.indexOf('Car')) {
      toggleVisibility(selfMakeSelector, selfYearSelector)
      toggleDisplay(selfModel, selfColor)
    } else {
      visibilityHidden(selfMakeSelector, selfYearSelector)
      displayNone(selfModel, selfColor)
    }
  })

  otherTransportSelector.addEventListener('change', event => {
    if (event.target.value == transportTypeArr.indexOf('Car')) {
      toggleVisibility(otherMakeSelector)
      toggleDisplay(otherModel, otherColor)
    } else {
      visibilityHidden(otherMakeSelector)
      displayNone(otherModel, otherColor)
    }
  })
}
