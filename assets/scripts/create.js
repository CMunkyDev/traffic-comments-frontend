let editArea = document.querySelector('.edit-area')

let edit = 'Edit';

editArea.innerHTML = formatPostCreation(edit)

let saveEl = document.querySelector('#save-button')
let timeInput = document.querySelector('#input-time')
let selfMakeSelector = document.querySelector('#self-make')
let selfYearSelector = document.querySelector('#self-year')
let otherMakeSelector = document.querySelector('#other-make')
let selfTransportSelector = document.querySelector('#self-transport')
let otherTransportSelector = document.querySelector('#other-transport')
let selfModel = document.querySelector('#self-model')
let otherModel = document.querySelector('#other-model')
let selfColor = document.querySelector('#self-color')
let otherColor = document.querySelector('#other-color')


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
  resultObj.post_type_index = 1 ||  postTypeCss.indexOf(formElement.classList.item(formElement.classList.length - 1))
  console.log(resultObj)
  return resultObj
}

function createUTC (date, time) {
  return moment.parseZone(moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').add(-(moment().utcOffset()), 'm')).utc().format()
}

// timeInput.addEventListener('change')
saveEl.addEventListener('click', event => {
  event.preventDefault()
  let body = acquireForm(event.target.form)
  axios.post(`${BASE_URL}/posts`, body)
})


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
