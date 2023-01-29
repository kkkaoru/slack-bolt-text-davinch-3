module.exports = {
  trimMentions: (text)=>{
    return text.replace(/(<@.*?>\s?)/g, '');
  }
}