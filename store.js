// this is not a real store
let messages = {}
let users = {}

exports.saveMessage = (message) => {
  console.log(message)
}

exports.getMessages = () => {
  return messages
}

exports.addUser = (user) => {
  users[user.user] = user
}

exports.getUser = (id) => {
  return users[id]
}

