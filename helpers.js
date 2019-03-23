exports.getUrlWithParams = (url, params) => {
  if(url.indexOf('?') < 0) url += '?'
  url += Object.keys(params).map((key) => key+'='+params[key]).join('&')
  return url
}

exports.stringifyValues = (message, payload) => {  
  // stringify dialog state values
  let newMessage = deepCopy(message)
  newMessage = fillValues(newMessage, payload)
  
  if(newMessage.state && typeof newMessage.state !== 'string') {
    try {
      newMessage.state = JSON.stringify(newMessage.state)
    } catch(err) {}
  }
  
  // if there are no blocks, we are done here
  if(!newMessage.blocks) return newMessage
  
  newMessage.blocks = newMessage.blocks.map(block => {
    if(block.type === 'actions') {
      block.elements = block.elements.map(action => {
        if(action.value && typeof action.value !== 'string') {
          try {
            action.value = JSON.stringify(action.value) 
          } catch(err) {}  
        }
        return action
      })
    }
    if(block.type === 'section' && block.accessory && typeof block.accessory.value !== 'string') {
      try {
        block.accessory.value = JSON.stringify(block.accessory.value) 
      } catch(err) {}  
    }
    if(block.type === 'section' && block.accessory && block.accessory.options) {
      try {
        block.accessory.options = block.accessory.options.map(option => {
           if(option.value !== 'string') 
        }) JSON.stringify(block.accessory.value) 
      } catch(err) {}  
    }
    return block
  })
  return newMessage
}

// currently only supported for dialogs
const fillValues = (message, payload) => {
  let newMessage = deepCopy(message)
  
  // fill optional dialog state values
  if(newMessage.state) {
    let values = newMessage.state.map(value => {
      if(value.fill_values) {
        let options = value.fill_values.map(fill => {
          let path = fill.split('.')
          try {
            return createObject({}, path, 0, payload)
          } catch (e) { console.log(e)}
        })
        options.forEach(opt => {
          value = Object.assign(value, opt)
        })
          
        // don't need this anymore  
        delete value.fill_values
      }
      return value
    })
    
    
    newMessage.state = values
  } else if(newMessage.blocks) { // fill optional block action values
    newMessage.blocks = newMessage.blocks.map(block => {
      if(block.type === 'actions') {
        block.elements = block.elements.map(action => {
          if(action.value && typeof action.value !== 'string') {
            console.log(action.value)
            action.value = action.value.map(value => {
              if(value.fill_values) console.log('fill_values are not implemented yet for actions', value.fill_values)
              return value
            })
          }
          
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

