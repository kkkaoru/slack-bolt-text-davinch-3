// This is not a real database or datastore, but it could be if you want to :)
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

