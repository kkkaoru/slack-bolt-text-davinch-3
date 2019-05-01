exports.getUrlWithParams = (url, params) => {
  if(url.indexOf('?') < 0) url += '?'
  url += Object.keys(params).map((key) => key+'='+params[key]).join('&')
  return url
}





