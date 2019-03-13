exports.getUrlWithParams = (url, params) => {
  if(url.indexOf('?') < 0) url =+ '?'
  url += Object.keys(params).map((key) => key+'='+params[key]).join('&')
  return url
}

exports.stringifyValues = (message) => {  
  // stringify dialog state values
  if(message.state && typeof message.state !== 'string') message.state = JSON.stringify(message.state)
  
  // if there are no blocks, we are done here
  if(!message.blocks) return message
  
  message.blocks = message.blocks.map(block => {
    if(block.type == 'actions') {
      block.elements = block.elements.map(action => {
        if(action.value && typeof action.value !== 'string') action.value = JSON.stringify(action.value) 
        return action
      })
    }
    return block
  })
  return message
}

exports.fillOptions = (message, payload) => {
  console.log(payload)
  // fill optional dialog state values
  if(message.state && message.fill_options) {
    // console.log(message.fill_options)
    message.fill_options.forEach(fill => {
      let path = fill.split('.')
      try {
        let obj = createObject({}, path, 0, payload)
        console.log(obj)
      } catch (e) { console.log(e)}
      
    })
    
    
  } else if(message.blocks) { // fill optional block action values
    message.blocks = message.blocks.map(block => {
      if(block.type == 'actions') {
        block.elements = block.elements.map(action => {
          if(action.fill_options) console.log(action.fill_options)
          return action
        })
      }
      return block
    })
  }
  
  return message
}

const createObject = (obj, path, count, value) => {
  console.log(obj)
  console.log(path)
  console.log(count)
  console.log(value)
  if(count === path.length) return value
  
  let key = path[count]
  obj[key] = createObject(obj[key], path, count++, value[key])
  return obj
}

