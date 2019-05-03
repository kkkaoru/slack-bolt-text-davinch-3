// This is not a real datastore, but it can be if you make it one :)
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

