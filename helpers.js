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

// currently only supported for dialogs
// also because of the 75 characters block kit value limit
exports.fillOptions = (message, payload) => {
  // console.log('payload', payload)
  // fill optional dialog state values
  if(message.state && message.fill_options) {
    // console.log(message.fill_options)
    let options = message.fill_options.map(fill => {
      let path = fill.split('.')
      try {
        return createObject({}, path, 0, payload)
      } catch (e) { console.log(e)}
    })
    options.forEach(opt => {
      message.state = Object.assign(message.state, opt)
    })
    // delete original fill options to remove it from payload which is sent to slack
    delete message.fill_options
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

// this is a very limited function, which can't deep copy
// complex structures or arrays
// does the job for now
const createObject = (obj, path, count, value) => {
  if(count === path.length) {
    return value
  }
  
  let key = path[count]
  count++
  obj[key] = {}
  obj[key] = createObject(obj[key], path, count, value[key])
  return obj
}

