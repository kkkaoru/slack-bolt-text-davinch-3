module.exports = {
  trimMentions: (text)=>{
    return text.replace(/(<@.*?> )/g, '');
  }
}