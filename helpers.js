exports.getUrlWithParams = (url, params) => {
  if(url.indexOf('?') < 0) url += '?'
  url += Object.keys(params).map((key) => key+'='+params[key]).join('&')
  return url
}

exports.stringifyValues = (message) => {  
  // stringify dialog state values
  let newMessage = deepCopy(message)
  if(newMessage.state && typeof newMessage.state !== 'string') newMessage.state = JSON.stringify(newMessage.state)
  
  // if there are no blocks, we are done here
  if(!newMessage.blocks) return newMessage
  
  newMessage.blocks = newMessage.blocks.map(block => {
    if(block.type === 'actions') {
      block.elements = block.elements.map(action => {
        if(action.value && typeof action.value !== 'string') action.value = JSON.stringify(action.value) 
        return action
      })
    }
    if(block.type === 'section' && block.accessory && typeof block.accessory.value !== 'string') {
      block.accessory.value = JSON.stringify(block.accessory.value)  
    }
    return block
  })
  return newMessage
}

// currently only supported for dialogs
// also because of the 75 characters block kit value limit
exports.fillOptions = (message, payload) => {
  let newMessage = deepCopy(message)
  
  // fill optional dialog state values
  if(newMessage.state && newMessage.fill_options) {
    let options = newMessage.fill_options.map(fill => {
      let path = fill.split('.')
      try {
        return createObject({}, path, 0, payload)
      } catch (e) { console.log(e)}
    })
    options.forEach(opt => {
      newMessage.state = Object.assign(newMessage.state, opt)
    })
    
    // remove fill_options from the actual payload
    delete newMessage.fill_options
  } else if(newMessage.blocks) { // fill optional block action values
    newMessage.blocks = newMessage.blocks.map(block => {
      if(block.type === 'actions') {
        block.elements = block.elements.map(action => {
          if(action.fill_options) console.log('not implemented yet', action.fill_options)
          return action
        })
      }
      return block
    })
  }
    
  return newMessage
}

// this is a very limited function, which can't deep copy
// complex structures or arrays
// does the job for now
const createObject = (obj, path, count, value) => {
  if(count === path.length) {
    return value
  }
  
  let key = path[count]
  count++
  if(!obj[key]) obj[key] = {}
  obj[key] = createObject(obj[key], path, count, value[key])
  return obj
}

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

