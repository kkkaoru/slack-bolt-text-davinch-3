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
  // fill optional dialog state values
  if(message.state && message.fill_options) {
    console.log(message.fill_options)
    let opt = message.fill_options.split('.')
    let depth = opt.length
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
