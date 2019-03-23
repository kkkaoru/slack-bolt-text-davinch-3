const approval = require('./blueprint-approval')
const createTask = require('./blueprint-create-task')
const privatePoll = require('./blueprint-private-poll')
const publicPoll = require('./blueprint-public-poll')
const template = require('./blueprint-template')

module.exports = {
  demo: [{"blueprint":"template","type":"ephemeral","value":"slash"}]
}