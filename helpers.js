exports.getUrlWithParams = (url, params) => {
  if(url.indexOf('?') < 0) url =+ '?'
  url += Object.keys(params).map((key) => key+'='+params[key]).join('&')
  return url
}

exports.stringifyValues = (message) => {
  let newMessage = message
  // only stringify block action values
  if(!newMessage.blocks) return newMessage
  
  newMessage.blocks = newMessage.blocks.map(block => {
    if(block.type == 'actions') {
      block.elements = block.elements.map(action => {
        if(action.value && typeof action.value !== 'string') action.value = JSON.stringify(action.value) 
        return action
      })
    }
    return block
  })
  return newMessage
}
